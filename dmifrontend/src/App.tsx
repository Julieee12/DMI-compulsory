
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductsView from "./pages/ProductsView.tsx";


function App() {

  return(
<BrowserRouter>
  <Routes>
    {/*<Route path="/" element={<Home />} />*/}
    <Route path="/products" element={<ProductsView />} />
    {/*<Route path="/about" element={<Orders />} />*/}
  </Routes>
</BrowserRouter>
  )
}

export default App
