import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Navbar from './components/navbar';
import AMovie from './pages/aMovie';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<AMovie />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
