import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './page/Home';
import Card from './page/Card';
import NotFound from './page/NotFound';

import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper-container">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="card" element={<Card />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
