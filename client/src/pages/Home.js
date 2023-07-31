import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swiper from '../components/swiper';
import { AuthContext } from '../AuthContext';
import useHasPosted from '../hooks/useHasPosted';

function Home() {
  const { userEmail, token } = useContext(AuthContext); // Include token here
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const hasItems = useHasPosted(userEmail); // Use the hook

  useEffect(() => {
    console.log('user: ', userEmail);

    fetch('/api/protected/hognswap/itemInfo', {
      headers: {
        'Authorization': `Bearer ${token}`  ,  // Using token from context
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then(data => {
      console.log('Received data: ', data);
      
      // Filter out items that belong to the currently authenticated user
      const filteredItems = data.items.filter(item => item.userEmail !== userEmail);

      if (filteredItems && filteredItems.length > 0) {
        setItems(filteredItems);
      }
    })
    .catch(error => console.error('Error: ', error));
}, [userEmail, navigate, token]); // Include token as dependency

  useEffect(() => {
    if (!hasItems) {
      navigate('/profile');
    }
  }, [hasItems, navigate]);

  return (
    <div>
      <br></br>
      {items.length > 0 ? (
        items.map((item, index) => <p key={index}>{item.itemName}</p>)
      ) : (
        <Swiper />
      )}
      <br></br>
      <br></br>
      <br />
    </div>
  )
}

export default Home;
