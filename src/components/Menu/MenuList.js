import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MenuList = () => {
  const [quantities, setQuantities] = useState({}); 
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/menu`);
      const data = await response.data;
      setMenuItems(data);


      const initialQuantities = {};
      data.forEach(item => {
        initialQuantities[item.id] = 1; 
      });
    };

    fetchMenuItems();
  }, [menuItems]);

  const orderPlaceHandler = async (itemId, qnt, item) => {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate('/');
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/order`,
        { itemId, quantity: parseInt(qnt) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      toast.success("Order placed successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
     finally{
      setQuantities({
        ...quantities,
        [itemId]: "1"
      })
    }
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities({
      ...quantities,
      [itemId]: value
    }); 
  };

  return (
    <div className='lg:mx-[20%]   pb-2'>
      <h2 className='text-4xl text-white font-semibold mt-3 mb-5'>Menu List</h2>
      <ul className=''>
        {menuItems.length > 0 && menuItems.map((item) => (
          <div
            key={item.id} 
            className='grid gap-2 justify-between mb-2 border rounded-md p-2 text-white'
          >
            <div>
              <li>
                <h3 className='text-2xl text-yellow-300'>{item.name}</h3>
                <p>{item.description}</p>
                <p><span className='text-sky-300'>Price:</span> ₹{item.price}</p>
                <label htmlFor="" className='text-sky-300'>Quantity: </label>
                <input
                  className='w-12 text-black rounded-sm mb-1 bg-sky-100'
                  type="number"
                  min={1}
                  value={quantities[item.id] || 1} 
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  placeholder="Quantity"
                  required
                />
              </li>
              <button
                onClick={() => orderPlaceHandler(item.id, quantities[item.id] || 1, item)}
                className="text-white bg-green-500 hover:bg-green-700 px-3 py-1 rounded"
              >
                Order now
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
