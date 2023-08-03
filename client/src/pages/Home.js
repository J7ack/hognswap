import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swiper from '../components/swiper';
import { AuthContext } from '../AuthContext';

function Home() {

  return (
    <div>
      <br></br>
      <Swiper />
      <br></br>
      <br></br>
      <br />
    </div>
  )
}

export default Home
