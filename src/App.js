import React from "react";
import {Header} from './components';
import {Cart, Home} from "./pages";
import { Route, Routes } from "react-router-dom";
 
const App = () => {  
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Cart' element={<Cart />}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
