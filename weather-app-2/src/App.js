import { useEffect, useState } from 'react';
import './App.css';
import Background from './components/Background';
import SearchBar from './components/SearchBar';
import ShowCard from './components/ShowCard';

function App() {

  //Statek létrehozása
  const [search, setSearch] = useState("")
  const [cities, setCities] = useState([])
  const [weatherData, setWeatherData] = useState(null)
  const [picture, setPicture] = useState(null)
  const [buttonClick, setButtonClick] = useState(0)

  //UseEffectek létrehozása
  useEffect(() => {console.log(cities)}, [cities])
  
  //SearchBar inputra indít fetchet, 3 karaktertől
  useEffect(() => {
    if(search.length > 2) {
      fetch(`http://api.weatherapi.com/v1/search.json?key=77d3a58988bd4a36941142503220512&q=${search}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setCities(data)
      })
    }
  }, [search])

  useEffect(() => {
    console.log(weatherData)
  }, [weatherData])

  //A gomb nyomására változó state-et figyeli, tehát, ha megnyomjuk a gombot, változik a state és lefut a fetch, miután a buttonClick már nem 0
  useEffect(() => {
    if(buttonClick !== 0){
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=77d3a58988bd4a36941142503220512&q=${search}&aqi=no`
      )
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setWeatherData(data)
        })
    }
  }, [buttonClick])

  //Ez felelős a Pexelsről a háttér fetcheléséért, a weatherData változását figyeli, mert a current conditiont használja paraméterént a keresésnél
  useEffect(() => {
    if(weatherData !== null) {
      fetch(`https://api.pexels.com/v1/search?query=${weatherData.current.condition.text}`, {
        headers: {
          Authorization: "563492ad6f91700001000001dcbb332c03b949f39ec2a371515c074d"
        }
      })
        .then(resp => {
          return resp.json()
        })
        .then(data => {
          console.log(data)
          setPicture(data)
        })
    }
  }, [weatherData])

  //A SearchBar egyből betöltődik, a ShowCard csak akkor, ha a weatherData már nem null, a background pedig akkor, ha a weatherData és a picture sem null
  return (
    <div className="App">
      <SearchBar setSearch={setSearch} cities={cities} search={search} setButtonClick={setButtonClick}/>
      {weatherData && <>
        <ShowCard className="temperature" data={weatherData.current.temp_c + "°C"} title={"Temperature"} image={"images/temperature.svg"}/>
        <ShowCard className="rain" data={weatherData.current.condition.text} title={"Condition"} image={"images/rain.svg"}/>
        <ShowCard className="wind" data={weatherData.current.wind_kph + " km/h"} title={"Wind"} image={"images/wind.svg"}/>
        <ShowCard className="humidity" data={weatherData.current.humidity + "%"} title={"Humidity"} image={"images/humidity.svg"}/>
      </>}
      {weatherData && picture && <Background picSrc={picture.photos[0].src.original}/>}
    </div>
  );
}

export default App;
