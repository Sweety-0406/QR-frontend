import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logoutHandler = async ()=>{
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`)
      localStorage.removeItem("token"); 
      toast.success("Successfully logged out.")
      navigate('/')
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }
  return (
    <nav className="bg-transparent text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">
          QR Menu
        </div>


        {token == null ? (
          <div className="flex space-x-4">
            <button
              onClick={()=>navigate('/')}
              className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Login
            </button>
            <button
              onClick={()=>navigate('/register')}
              className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
        ):(
          <button
            onClick={logoutHandler}
            className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        )
        }
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
