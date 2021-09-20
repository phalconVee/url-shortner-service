import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

const api = {
  get: (endpoint) => axios.get(baseUrl + endpoint),
  shorten: (endpoint, data) => axios.post(baseUrl + endpoint, data),
};

export default api;
