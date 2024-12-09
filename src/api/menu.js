import axios from "axios";

const API_URL = "http://localhost:3000/api/menu";

export const fetchMenuItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addMenuItem = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
