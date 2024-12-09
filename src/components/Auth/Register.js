
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response  = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`,{ email, password, name, role } )
      toast.success("Successully registered.")
      navigate('/')
    } catch (error) {
      toast.error("Something went wrong.")
    }

  };

  return (
    <div className=' mx-auto max-w-md  pt-40 h-[90.5vh]'>
      <div className='flex flex-col border p-2 rounded-xl shadow-md shadow-slate-300'>
        <h2 className='flex justify-center mb-2 text-sky-400 text-4xl font-serif font-bold'>Register</h2>
        <hr/>
        <form className='flex flex-col my-3' onSubmit={handleRegister}>
          <input className='mb-1 p-1 rounded-md border-[3px] border-sky-300  ' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          <input className='mb-1 p-1 rounded-md border-[3px] border-sky-300  ' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input className='mb-1 p-1 rounded-md border-[3px] border-sky-300  ' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <select  className='mb-1 p-1 rounded-md border-[3px] border-sky-300  ' value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div>
            <button className='flex mt-1 justify-start border border-sky-300 p-2 px-4 text-lg font-semibold rounded-md bg-sky-300 hover:bg-sky-600 ' type="submit">Register</button>
          </div>
        </form>
        <hr />
        <div className='text-lg mt-1 mb-2 text-center text-white'>
          <p>Already have an account? <span onClick={()=>navigate('/')} className='text-sky-300 hover:text-sky-400 hover:cursor-pointer font-bold '>Login</span></p>
        </div>
      </div>
    </div>

  );
};

export default Register;
