import React from 'react'

function Background({ picSrc }) {

return (
  <div className='changeBackground'>
    <img className="changeImage" src={picSrc} alt="kep" />
  </div>
)
}

export default Background