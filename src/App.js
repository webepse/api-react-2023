import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomersPage from "./pages/CustomersPage";
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";
import HomePage from "./pages/HomePage";

const App = () => {
  return ( 
    <Router>
      <Navbar />
      <main className="container pt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customerspage" element={<CustomersPageWithPagination />} />
        </Routes>
      </main>
    </Router>
   );
}
 
export default App;
