import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CustomerPage from "./Pages/CustomerPage";
import AdminPage from "./Pages/AdminPage";
import CustomerDetailPage from "./Pages/CustomerDetailPage"; // Import the new page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/customerpage" element={<CustomerPage />} />
                <Route path="/adminpage" element={<AdminPage />} />
                <Route path="/customer/:id" element={<CustomerDetailPage />} /> {/* Add this route */}
            </Routes>
        </Router>
    );
}

export default App;