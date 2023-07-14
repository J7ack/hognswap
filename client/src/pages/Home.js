import React from 'react';
import RegistrationForm from '../components/registration';
import ItemCard from '../components/itemCard';
import ItemForm from '../components/addItem';

function Home() {
  return (
    <div>
      <h2>Home Screen</h2>
      <br></br>
      <RegistrationForm />
      <br />
      <br />
      <br />
      <ItemForm />
    </div>
  )
}

export default Home
