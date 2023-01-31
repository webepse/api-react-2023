import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return ( 
    <Router>
      <Navbar />
      <h1>test</h1>

    </Router>
   );
}
 
export default App;
