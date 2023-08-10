import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { Header } from './features/commons/header/Header';
import { CardList } from './features/cardList/CardList';

function App() {

  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CardList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
