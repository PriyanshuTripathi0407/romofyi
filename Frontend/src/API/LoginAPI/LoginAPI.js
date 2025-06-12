import axios from "axios"
const API_BASE_URL = 'http://127.0.0.1:8000';

export const postData = (userdata) => {
  return axios.post(`${API_BASE_URL}/login/`,userdata);
}

