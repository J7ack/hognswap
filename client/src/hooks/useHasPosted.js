import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const useHasPosted = () => {
  const [hasPosted, setHasPosted] = useState(false);
  const { userEmail, token } = useContext(AuthContext);
  console.log('userEmail in useHasPosted: ', userEmail, ' token: ', token);

  console.log('userEmail in useHasPosted: ', userEmail)

  useEffect(() => {
    if(userEmail) {
      fetch(`/api/protected/hognswap/itemInfo/${userEmail}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setHasPosted(data.length > 0))
      .catch(error => console.error('Error: ', error));
    }
  }, [userEmail]);
  

  return hasPosted;
}

export default useHasPosted;
