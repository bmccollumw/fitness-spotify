// components/LoginPage.js
import React from 'react';
import { startAuthorization } from '../utils/authUtils';

const LoginPage = () => {
  return (
    <div>
      <h1>Welcome to Your App</h1>
      <p>Log in with Spotify to get started:</p>
      <button onClick={startAuthorization}>Log in with Spotify</button>
    </div>
  );
};

export default LoginPage;