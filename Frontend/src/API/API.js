import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';

export const getData = () => {
  return axios.get(`${API_BASE_URL}/romouser/`);
}

export const PostData = (data) => {
  return axios.post(`${API_BASE_URL}/romouser/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const PutData = (id, data) => {
  return axios.put(`${API_BASE_URL}/romouser/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const DeleteData = (id,data)=>{
    return axios.put(`${API_BASE_URL}/romouser/${id}`,data);
}
 
