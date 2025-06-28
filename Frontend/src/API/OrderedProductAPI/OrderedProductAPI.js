import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';
const savedUser = localStorage.getItem('user');
const parsedData = JSON.parse(savedUser);
const email= parsedData.user.email

export const getOrderData = () => {
  return axios.get(`${API_BASE_URL}/cart-item/`,
    {params: { customer_email: email }}
  );
}

export const PostOrdertData = (data) => {
  return axios.post(`${API_BASE_URL}/cart-item/`, data);
};
