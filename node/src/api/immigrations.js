import axios from 'axios';

const baseUrl = `TBD`;

const api = axios.create({
  baseURL: baseUrl,
  responseType: 'json',
  timeout: 10000,
});


const updateTravelHistory = () => api.post(
  '/updateTravelHistory',
  {
      //tbd
  },
  { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } },
  { contentType: 'application/json' },
);

const retrieveTravelHistory = () => api.get(
  '/retrieveTravelHistory',
  { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } },
  { contentType: 'application/json' },
);

export default {
    updateTravelHistory,
    retrieveTravelHistory
};
