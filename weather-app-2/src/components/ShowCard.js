import React from 'react'

function ShowCard({data, image, title}) {
  return (
    <div className='showCard'>
        <p>{title}</p>
        <p>{data}</p>
        <img className="icon" src={image} alt="ikon" />
    </div>
  )
}

export default ShowCard