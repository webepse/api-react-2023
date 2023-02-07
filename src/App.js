import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomersPage from "./pages/CustomersPage";
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";
import HomePage from "./pages/HomePage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import authAPI from "./services/authAPI";

authAPI.setup()

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated())

  return ( 
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
      <main className="container pt-5">
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setIsAuthenticated} />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customerspage" element={<CustomersPageWithPagination />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </Router>
   );
}
 
export default App;
