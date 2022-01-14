import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Bootstrap from 'bootstrap';
import axios from 'axios';
import List from './List';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="justify-content-center my-5">
          <List />
        </div>
      </div>
    </div>
  );
}


export default App;
