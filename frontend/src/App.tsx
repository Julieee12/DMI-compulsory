import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Customer from './Pages/CustomerPage';
// import Admin from './Pages/AdminPage';
import HomePage from "./Pages/HomePage";
import ProductView from "./components/ProductView/ProductView";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductView />} />
                {/*<Route path="/customerpage" element={<CustomerPage />} />*/}
                {/*<Route path="/adminpage" element={<AdminPage />} />*/}
            </Routes>
        </Router>
    );
}

export default App;