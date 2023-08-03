import { useState, useEffect } from 'react';

function useHasPosted(userEmail, token) {
  const [hasPosted, setHasPosted] = useState(false);

  useEffect(() => {
    console.log('useHasPosted - userEmail: ', userEmail, ' token: ', token);

    fetch(`/api/protected/hognswap/userItems/${userEmail}`, {
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
      console.log('Received data in useHasPosted: ', data);
      if (data.length > 0) {
        setHasPosted(true);
      }
    })
    .catch(error => console.error('Error in useHasPosted: ', error));
}, [userEmail, token]); // Include token as dependency

  return hasPosted;
}

export default useHasPosted;
