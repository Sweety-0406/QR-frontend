import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Navbar';
import MenuPage from './pages/MenuPage';
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div className=' xl:px-[5%] min-h-screen'>
      <Router >
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
