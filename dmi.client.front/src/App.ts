import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Products />} />
        <Route path="/services" element={<Admin />} />
        <Route path="/contact" element={<Something />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
