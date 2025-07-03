import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';
const savedUser = localStorage.getItem('user');
let email = '';
if (savedUser) {
  const parsedData = JSON.parse(savedUser);
  if (parsedData && parsedData.user) {
    email = parsedData.user.email;
  }
}


export const getOrderData = () => {
  return axios.get(`${API_BASE_URL}/cart-item/`,
    {params: { customer_email: email }}
  );
}

export const PostOrdertData = (data) => {
  return axios.post(`${API_BASE_URL}/cart-item/`, data);
};


export const getUserOrderedData= () =>{
  return axios.get(`${API_BASE_URL}/orders/`,
    {params: { customer_email: email }}
  );
}

export const PostUserOrdertData = (data) => {
  return axios.post(`${API_BASE_URL}/orders/`, data );
};


export const GetUserOrderedItem= () =>{
  return axios.get(`${API_BASE_URL}/order-items/`,
    {params: { customer_email: email }}
  );
}




