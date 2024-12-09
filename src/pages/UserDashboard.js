import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCodeDisplay from '../components/QRCodeDisplay';

const UserDashboard = () => {
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
  if(token != null && role === "user"){
    return (
      <div className='container mx-auto h-[90.5vh] '>
        <h1 className='text-4xl font-bold text-white'>User Dashboard</h1>
        <QRCodeDisplay />
      </div>
    );
  }else{
    navigate("/admin");
    return;
  }
};

export default UserDashboard;
