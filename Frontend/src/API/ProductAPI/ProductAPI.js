import React, { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';
let savedUser = localStorage.getItem('user');
let vendorId= '';
if (savedUser) {
  const parsedData = JSON.parse(savedUser);  
  if (parsedData && parsedData.user) {
    vendorId = parsedData.user.id;
    console.log("This is vendor in API", vendorId)
  }
}


export const GetVendorProductData = () => {
    return axios.get(`${API_BASE_URL}/vendor-product/`,
      { params: { vendor: vendorId } }
    );

}

export const GetVendorOrderedProductData = () => {
     return axios.get(`${API_BASE_URL}/order-item/`,
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



