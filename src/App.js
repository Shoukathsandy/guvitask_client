import './App.css';
// import Home from "./components/home";
import Layout from "./components/Layout";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/Register";
import Logout from "./components/logout";
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Layout />} >
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
       <ToastContainer autoclose={5000} />
    </div>
  );
}

export default App;
