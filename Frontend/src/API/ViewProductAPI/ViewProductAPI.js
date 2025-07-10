import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';
const savedUser = localStorage.getItem('user');
let email='';

if (savedUser) {
  const parsedData = JSON.parse(savedUser);
  // Check if parsedData and parsedData.user exist
  if (parsedData && parsedData.user) {
    email = parsedData.user.email;
    console.log("This is Email in API", email)
  }
}

export const getViewData = () => {
  return axios.get(`${API_BASE_URL}/viewed-products/`,
    {params: { customer: email }}
  );
}

export const PostViewData = (data) => {
  return axios.post(`${API_BASE_URL}/viewed-products/`, data);
};

export const getWishlistedData = () => {
  return axios.get(`${API_BASE_URL}/wishlist/`,
    {params: { customer_email: email }}
  );
}

export const PostWishedlistedData = (data) => {
  return axios.post(`${API_BASE_URL}/wishlist/`, data);
};
