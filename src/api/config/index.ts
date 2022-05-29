import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'API-KEY': 'edbb6621-0047-4274-8a4c-f1d2a1bf4727',
  },
});