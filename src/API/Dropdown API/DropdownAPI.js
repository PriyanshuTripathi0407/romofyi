import React from 'react'
import axios from 'axios'

const API_BASE_URL= 'http://127.0.0.1:8000';

export const getCountryData= ()=>{
  return axios.get(`${API_BASE_URL}/countries/`); 
}

export const getStateData= (country_id)=>{
  return axios.get(`${API_BASE_URL}/states/`,{params: {country_id },}); 
}

export const getCityData= (state_id)=>{
  return axios.get(`${API_BASE_URL}/cities/`,{params: {state_id },}); 
}