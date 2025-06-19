import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';

export const getData = () => {
  return axios.get(`${API_BASE_URL}/contact/`);
}

export const postData = (data)=>{
    return axios.post(`${API_BASE_URL}/contact/`,data);
}
