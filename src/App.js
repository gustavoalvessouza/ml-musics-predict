import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Musics from './pages/Musics';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/musics" Component={Musics} />
          <Route path="/signup" Component={SignUp} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
