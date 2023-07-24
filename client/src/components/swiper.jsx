import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';

const Swiper = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const images = require.context('../photos/', false, /\.(png|jpe?g|svg)$/)
      const items = images.keys().map((path) => ({
        id: path,
        image: images(path).default,
        title: '',
        description: '',
      }));
      setItems(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const onSwipe = (direction, item) => {
    // Handle swipe action here
    console.log(`Swiped ${direction} on item:`, item);
  };

  const onCardLeftScreen = (item) => {
    // Handle when card leaves the screen
    console.log('Card left the screen:', item);
  };

  return (
    <div className="container">
      <div className="swiper">
        {items.map((item, index) => (
          <TinderCard
            key={item.id}
            className="swipe-card"
            onSwipe={(dir) => onSwipe(dir, item)}
            onCardLeftScreen={() => onCardLeftScreen(item)}
            preventSwipe={['up', 'down']}
          >
            {/* Render item content here */}
            <div
              className="card"
              style={{ zIndex: items.length - index }}
            >
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default Swiper;
