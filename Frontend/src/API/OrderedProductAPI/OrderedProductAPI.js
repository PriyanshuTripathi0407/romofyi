import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';


//not used
export const getOrderData = (email) => {
  return axios.get(`${API_BASE_URL}/cart-item/`,
    {params: { customer_email: email }}
  );
}

export const PostOrdertData = (data) => {
  return axios.post(`${API_BASE_URL}/cart-item/`, data);
};

//not used
export const getUserOrderedData= (email) =>{
  return axios.get(`${API_BASE_URL}/orders/`,
    {params: { customer_email: email }}
  );
}

export const GetUserOrderedItem= (id) =>{
  if (!id) return Promise.reject("Missing user ID");
  return axios.get(`${API_BASE_URL}/user-product/`,
    {params: { customer_id: id }}
  );
}

export const PostUserOrderData = (data) => {
  return axios.post(`${API_BASE_URL}/orders/`, data );
};


export const GetUserOrderatVendorDashboard= (email) =>{
  return axios.get(`${API_BASE_URL}/orders/`,
    {params: { customer_email: email }}
  );
}





