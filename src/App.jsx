import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './page/Home';
import Card from './page/Card';
import NotFound from './page/NotFound';
import PizzaItem from './components/CardBlock/PizzaItem';

import './scss/app.scss';

const App = () => {
  return (
    <div className="wrapper-container">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="card" element={<Card />} />
              <Route path="item/:id" element={<PizzaItem />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
