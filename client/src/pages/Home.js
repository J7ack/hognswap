import React from 'react';
import ItemForm from '../components/addItem';
import Swiper from '../components/swiper';

function Home() {
  return (
    <div>
      <h2>Home Screen</h2>
      <br></br>
      <Swiper />
      <br></br>
      <br></br>
      <br />
      <ItemForm />
    </div>
  )
}

export default Home
