import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductView from "./components/ProductView/ProductView";

function App() {
  return (

    <BrowserRouter>
        <Routes>
            {/*<Route path="/" element={<Home />} />*/}
            <Route path="/products" element={<ProductView />} />
            {/*<Route path="/orders" element={<Orders />} />*/}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
