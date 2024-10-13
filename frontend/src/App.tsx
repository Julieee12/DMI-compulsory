import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import CustomerPage from "./Pages/CustomerPage";
import AdminPage from "./Pages/AdminPage";
import CustomerDetailPage from "./Pages/CustomerDetailPage"; // Import the new page
import OrdersPage from "./Pages/OrdersPage";
import {DevTools} from "jotai-devtools"; // Import the new page

function App() {
    return (
        <>        <DevTools />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/customerpage" element={<CustomerPage />} />
                    <Route path="/adminpage" element={<AdminPage />} />
                    <Route path="/customer/:id" element={<CustomerDetailPage />} /> {/* Add this route */}
                    <Route path="/customer/:id/orders" element={<OrdersPage />} /> {/* Add this route */}
                </Routes>
            </Router></>

    );
}

export default App;