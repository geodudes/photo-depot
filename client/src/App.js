import React from 'react';
import Header from './containers/Header.jsx';
import SearchBar from './containers/SearchBar.jsx';
import SideBar from './containers/SideBar.jsx';
import MainGallery from './containers/MainGallery.jsx';
import Footer from './containers/Footer.jsx';

function App() {
  return (
    <div id='App'>
      <Header />
      <SearchBar />
      <SideBar />
      <MainGallery />
      <Footer />
    </div>
  );
}

export default App;