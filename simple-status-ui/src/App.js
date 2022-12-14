import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import './App.css';

function App() {
  return (
    <div className="App" style={{backgroundColor: '#181818',  color: 'white', minHeight: '100vh', height: '100vh'}}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossorigin="anonymous"
      />
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
