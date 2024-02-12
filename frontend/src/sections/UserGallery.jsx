import React from 'react'
import ImageContainer from '../components/ImageContainer'
const avtartImg = "https://i.pinimg.com/550x/75/06/5d/75065da93d181c15f8266289313231c6.jpg";

const UserGallery = () => {
  return (
    <>
    <h1 className='text-3xl font-oswald pt-3'>Our Collections</h1>
    <div className='border-b-2 border-yellow-600 w-40'></div>
    <div className='py-3 bg-slate-900 flex flex-wrap gap-2 justify-center rounded-md'>
      <ImageContainer imgUrl = {avtartImg }/>
      

    </div>

    </>
  )
}

export default UserGallery