import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000';

export const PostRegistrationEmail = (data) => {
  return axios.post(`${API_BASE_URL}/send-mail/`, data);
};
