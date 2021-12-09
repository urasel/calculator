import React from 'react';

import Calculator from './pages/Calculator';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  
  return (
    <div className="App">
      <Calculator/> 
    </div>
  );
}

export default App;