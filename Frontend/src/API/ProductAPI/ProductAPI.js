import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';


export const GetVendorProductData = (vendorId) => {
    return axios.get(`${API_BASE_URL}/vendor-product/`,
      { params: { vendor: vendorId } }
    );

}

export const GetVendorOrderedProductData = (vendorId) => {
     return axios.get(`${API_BASE_URL}/order-items/`,
      { params: { vendor: vendorId } }
    );

}

export const PostOrderedProductStatus = (data) => {
     return axios.patch(`${API_BASE_URL}/order-items/`, data );
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



