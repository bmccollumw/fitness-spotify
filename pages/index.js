
import React, { useEffect } from 'react';
import LoginPage from '../components/LoginPage';
import Global from '../components/Global';
import { getPlaylists } from '../utils/authUtils';

const Home = () => {
  useEffect(() => {
    // Check if the user is authenticated 
    const isAuthenticated = localStorage.getItem('access_token');

    if (!isAuthenticated) {
      return <LoginPage></LoginPage>
    };
  })
  return (
    <Global></Global>
  );
};

export default Home