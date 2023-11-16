
import React, { useEffect } from 'react';
import LoginPage from '../components/LoginPage';
import { getPlaylists } from '../utils/authUtils';

const Home = () => {
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('access_token');

    if (!isAuthenticated) {
        <LoginPage></LoginPage>
    } else {
      // User is authenticated, fetch and display playlists
      getPlaylists();
    }
  }, []);

  return (
    <div>
      {/* Display user playlists here */}
    </div>
  );
};

export default Home;