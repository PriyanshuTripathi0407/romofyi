import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';

export const getData = () => {
  return axios.get(`${API_BASE_URL}/register/`);
}

export const PostData = (data)=>{
    return axios.post(`${API_BASE_URL}/register/`,data);
}
export const PutData = (id,data)=>{
    return axios.put(`${API_BASE_URL}/register/${id}`,data);
}
 
export const DeleteData = (id,data)=>{
    return axios.put(`${API_BASE_URL}/register/${id}`,data);
}
 
