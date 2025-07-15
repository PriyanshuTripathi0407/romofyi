import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';

export const getSearchedData = (email) => {
  return axios.get(`${API_BASE_URL}/searched-products/`,
    {params: { customer_email: email }}
  );
}

export const PostSearchedData = (data) => {
  return axios.post(`${API_BASE_URL}/searched-products/`, data);
};
