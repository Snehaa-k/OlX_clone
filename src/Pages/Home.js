import React, { useState } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function Home(props) {
  
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="homeParentDiv">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Banner />
      <Posts searchQuery={searchQuery}/>
      <Footer />
    </div>
  );
}

export default Home;
 
