import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return ( 
    <Router>
      <Navbar />
      <main className="container pt-5">
        <h1>test</h1>
      </main>

    </Router>
   );
}
 
export default App;
