import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        if(response.data.role){
          navigate(`/${response.data.role}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [navigate, token]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response  = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`,{ email, password } )
      const data = await response.data;
      localStorage.setItem('token', data.token);
      toast.success("Successfully logged in.")
      navigate(data.role === 'admin' ? '/admin' : '/user');
    } catch (error) {  
      toast.error("Please enter a valid credentials.")
    }

  };

  return (
    <div className=' mx-auto max-w-md h-[90.5vh]  pt-40 sm:pt-44 sm:py-[20%]'>
      <div className='flex flex-col border p-2 rounded-xl shadow-md shadow-slate-300'>
        <h2 className='flex justify-center mb-2 text-sky-400 text-4xl font-serif font-bold'>Login</h2>
        <hr/>
        <form className='flex flex-col my-3' onSubmit={handleLogin}>
          <input className='mb-1 p-1 rounded-md border-[3px] border-sky-300  ' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input className='mb-1 p-1 rounded-md border-[3px] border-sky-300  ' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <div>
            <button className='flex mt-1 justify-start border border-sky-300 p-2 px-4 text-lg font-semibold rounded-md bg-sky-300 hover:bg-sky-600 ' type="submit">Login</button>
          </div>
        </form>
        <hr />
        <div className='text-lg mt-1 mb-2 text-center text-white'>
          <p>Don't have an account? <span onClick={()=>navigate('/register')} className='text-sky-300 hover:text-sky-400 hover:cursor-pointer font-bold '>Register</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
