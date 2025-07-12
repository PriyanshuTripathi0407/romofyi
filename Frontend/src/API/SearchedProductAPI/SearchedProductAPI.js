import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';
let savedUser = localStorage.getItem('user');
console.log(savedUser)
let email = '';
if (savedUser) {
  let parsedData = JSON.parse(savedUser);
  // Check if parsedData and parsedData.user exist
  if (parsedData && parsedData.user) {
    email = parsedData.user.email;
    console.log("User email ",email)
  }
}

export const getSearchedData = () => {
  return axios.get(`${API_BASE_URL}/searched-products/`,
    {params: { customer_email: email }}
  );
}

export const PostSearchedData = (data) => {
  return axios.post(`${API_BASE_URL}/searched-products/`, data);
};
