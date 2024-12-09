import React,{useEffect, useState} from 'react';
import AddMenuItem from '../components/Menu/AddMenuItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderDisplay from '../components/Menu/OrderDisplay';


const AdminDashboard =  () => {
  const navigate = useNavigate()
  const [role, setRole] = useState("")
  
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async()=>{
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/get-user`, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          }
        );
        setRole(response.data.role)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [navigate, token]);

  if(token != null && role === "admin"){
    return (
      <div className= {`container mx-auto h-full`}>
        <h1 className='text-4xl font-semibold text-white'>Admin Dashboard</h1> 
        <AddMenuItem />
        <OrderDisplay />
      </div>
    );
  }else{
    navigate("/user")
    return;
  }
};

export default AdminDashboard;
