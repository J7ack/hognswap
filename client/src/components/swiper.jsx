import React, { useState, useEffect, useRef, useContext } from 'react';  // Include useContext
import TinderCard from 'react-tinder-card';
import { AuthContext } from '../AuthContext';  // Import the AuthContext

const Swiper = () => {
  const [items, setItems] = useState([]);
  const { token } = useContext(AuthContext);  // Use token from context instead of local storage
  const cardRefs = useRef({});

  useEffect(() => {
    fetchItems();
  }, [token]);

  const fetchItems = async () => {
    console.log('Token from state: ', token);
    if (!token) {
      console.error('Token is not set in state');
      return;
    }

    try {
      const res = await fetch('/api/protected/hognswap/itemInfo',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
          },
          credentials: 'include',
        }
      );

      if (res.status !== 200) {
        console.error(`Error fetching items: received status ${res.status}`);
        return;
      }

      const data = await res.json();

      const newItems = data.items.map((item) => ({
        id: item._id,
        image: `data:image/png;base64,${item.pictures[0]}`,
        title: item.itemName,
        description: item.category,
      }));

      setItems([...newItems].reverse());
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const onSwipe = (direction, item) => {
    console.log(`Swiped ${direction} on item:`, item);

    if (direction === 'right') {
      fetch('/api/protected/hognswap/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        },
        credentials: 'include',
        body: JSON.stringify({ itemId: item.id }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response from server: ', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    setItems(prevItems => prevItems.filter(prevItem => prevItem.id !== item.id));
  };

  const onCardLeftScreen = (item) => {
    console.log('Card left the screen:', item);
    delete cardRefs.current[item.id];
  };

  const onSwipeButtonClick = (direction) => {
    const firstItem = items[0];
    if (firstItem) {
      cardRefs.current[firstItem.id].swipe(direction);
    }
  };

  return (
    <div className="swiper-container">
      <div className="swiper">
        {items.map((item, index) => (
          <TinderCard
            ref={(card) => (cardRefs.current[item.id] = card)}
            key={item.id}
            className="swipe-card"
            onSwipe={(dir) => onSwipe(dir, item)}
            onCardLeftScreen={() => onCardLeftScreen(item)}
            preventSwipe={['up', 'down']}
          >
            <div className="card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons-container">
        <button onClick={() => items[0] && onSwipeButtonClick('left')} className="swipe-button">Swipe Left</button>
        <button onClick={() => items[0] && onSwipeButtonClick('right')} className="swipe-button">Swipe Right</button>
      </div>
    </div>
  );
};

export default Swiper;
