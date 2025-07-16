import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';


export const getViewData = (email) => {
  return axios.get(`${API_BASE_URL}/viewed-products/`,
    {params: { customer: email }}
  );
}

export const PostViewData = (data) => {
  return axios.post(`${API_BASE_URL}/viewed-products/`, data);
};

export const getWishlistedData = (email) => {
  return axios.get(`${API_BASE_URL}/wishlist/`,
    {params: { customer_email: email }}
  );
}

export const PostWishedlistedData = (data) => {
  return axios.post(`${API_BASE_URL}/wishlist/`, data);
};
