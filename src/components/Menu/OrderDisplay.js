
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderDisplay = () => {
  const [orders, setOrders] = useState([])
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/all`,
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        }
      );
      const data = await response.data;
      setOrders(data);
    };

    fetchOrders();
  }, [orders,token]);


  return (
    <div className={`pb-2 `} >
      <h2 className='text-2xl font-semibold text-yellow-300 mt-5'>Your Orders</h2>
      <ul className=''>
        {orders.length===0?(
            <div>
                <p className='text-yellow-300 text-xl'>No orders yet!</p>
            </div>
        ):(
            orders.map((item) => (
            <div  key={item.id} className='grid  gap-2 justify-between mb-2  border rounded-md p-2 text-white'>
                <div className=' '>
                <li>
                    <p ><span className='text-blue-300'>Name: </span> {item.user.name}</p>
                    <p ><span className='text-blue-300'>Product: </span>{item.item.name}</p>
                    <p ><span className='text-blue-300'>Quantity: </span>{item.quantity}</p>
                    <p><span className='text-blue-300'>Total Price:</span> ₹{item.item.price*item.quantity}</p>
                </li>
                </div>
            </div>
            ))
        )}
      </ul>
    </div>
  );
};

export default OrderDisplay;
