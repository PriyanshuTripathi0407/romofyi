import React, { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';
const savedUser = localStorage.getItem('user');

export const GetVendorProductData = () => {
  const [vendorId, setVendorId] = useState();

  if (savedUser) {
    const parsedData = JSON.parse(savedUser);
    // Check if parsedData and parsedData.user exist
    if (parsedData && parsedData.user) {
      const vendor = parsedData.user.id;
      setVendorId(vendor)
    }
  }


    return axios.get(`${API_BASE_URL}/vendor-product/`,
      { params: { vendor: vendorId } }
    );

}


export const getData = (id) => {
  return axios.get(`${API_BASE_URL}/product/`);
}

export const PostData = (data) => {
  return axios.post(`${API_BASE_URL}/product/`, data);
}
export const PutData = (id, data) => {
  return axios.put(`${API_BASE_URL}/product/${id}`, data);
}

export const DeleteData = (id, data) => {
  return axios.delete(`${API_BASE_URL}/product/${id}`, data);
}



