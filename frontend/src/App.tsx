import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CustomerPage from "./Pages/CustomerPage";
import AdminPage from "./Pages/AdminPage";
import MenuLeft from "./components/MenuLeft";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/customerpage" element={<CustomerPage />} />
                <Route path="/adminpage" element={<AdminPage />} />
            </Routes>
            <MenuLeft />
        </Router>

    );
}

export default App;