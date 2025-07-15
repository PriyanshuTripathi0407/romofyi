import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';


export const getCartData = (email) => {
  return axios.get(`${API_BASE_URL}/cart-item/`,
    {params: { customer_email: email }}
  );
}

export const PostCartData = (data) => {
  return axios.post(`${API_BASE_URL}/cart-item/`, data);
};
