import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';
let savedUser = localStorage.getItem('user');
let email = '';
let id= '';
if (savedUser) {
  let parsedData = JSON.parse(savedUser);
  if (parsedData && parsedData.user) {
    email = parsedData.user.email;
    id= parsedData.user.id;
    console.log("User id ",id)
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

export const GetUserOrderedItem= () =>{
  return axios.get(`${API_BASE_URL}/user-product/`,
    {params: { customer_id: id }}
  );
}

export const PostUserOrderData = (data) => {
  return axios.post(`${API_BASE_URL}/orders/`, data );
};


export const GetUserOrderatVendorDashboard= () =>{
  return axios.get(`${API_BASE_URL}/orders/`,
    {params: { customer_email: email }}
  );
}





