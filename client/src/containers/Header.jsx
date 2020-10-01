import React from 'react';
import Login from '../components/Login';

const Header = () => {
  return (
    <div className="header-container">
      <img className="logo" src="../photo-depot-logo.png" />
      <h1>Photo Depot</h1>
      <Login />
    </div>
  )
}

export default Header;