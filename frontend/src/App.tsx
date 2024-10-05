import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CustomerPage from "./Pages/CustomerPage";
import AdminPage from "./Pages/AdminPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/customerpage" element={<CustomerPage />} />
                <Route path="/adminpage" element={<AdminPage />} />
            </Routes>
        </Router>
    );
}

export default App;