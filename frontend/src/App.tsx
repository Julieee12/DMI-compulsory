import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Customer from './Pages/CustomerPage';
// import Admin from './Pages/AdminPage';
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                {/*<Route path="/customerpage" element={<CustomerPage />} />*/}
                {/*<Route path="/adminpage" element={<AdminPage />} />*/}
            </Routes>
        </Router>
    );
}

export default App;