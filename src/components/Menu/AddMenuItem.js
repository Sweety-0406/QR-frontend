import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddMenuItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    const newItem = { name, description, price: parseFloat(price) };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/menu/add-menu-item`, 
          newItem,
          {
              headers: {
                  Authorization: `Bearer ${token}`, 
              }
          }
      );
      toast.success('Menu item added successfully!');
      
    } catch (error) {
      toast.error("Something went wrong.")
    } finally{
      setName('')
      setDescription('')
      setPrice('')
    }

  };

  return (
    <div className=''>
      <div>
        <h2 className='text-2xl font-semibold text-yellow-300'>Add Menu Item</h2>
      </div>
      <div className='max-w-md '>
        <form className='flex flex-col gap-2' onSubmit={handleAddMenuItem}>
          <input
            className='border-2 rounded-md p-2 bg-sky-100 border-blue-400'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            className='border-2 rounded-md p-2 bg-sky-100 border-blue-400'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <input
            className='border-2 rounded-md p-2 bg-sky-100 border-blue-400'
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          />
          <div className='flex justify-start '>
            <button className="text-white bg-green-500 hover:bg-green-700 px-3 py-1 rounded" type="submit">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItem;
