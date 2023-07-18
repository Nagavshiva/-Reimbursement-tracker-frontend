import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReimbursementForm from "./components/ReimbursementForm";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Navbar /> 
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/re" element={<ReimbursementForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
