import axios from "axios";
// const baseURL =  "http://localhost:4000"
const baseURL = import.meta.env.VITE_BASE_URL;

// Create an axios instance
const api = axios.create({
  baseURL: baseURL,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginVendor = async (email, password) => {
  try {
    const response = await api.post(`vendor/login`, {
      email,
      password,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error logging in vendor:", error);
    return error.response.data;
    // throw error; // Rethrow the error for further handling
  }
};
export const loginUser = async (email, password) => {
  try {
    const response = await api.post(`user/login`, {
      email,
      password,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error logging in user:", error);
    return error.response.data;
    // throw error; // Rethrow the error for further handling
  }
};
export const signupVendor = async (vendorData) => {
  try {
    const response = await api.post(`vendor/signup`, vendorData);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error signing up vendor:", error);
    return error.response.data; // Return error response data
  }
};
export const signupUser = async (vendorData) => {
  try {
    const response = await api.post(`user/signup`, vendorData);
    return response.data;
  } catch (error) {
    console.error("Error signing up User:", error);
    return error.response.data; 
  }
};

export const makeRequest = async (method, endpoint, payload = null) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data: payload,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Export the makeRequest function for use in components
export default {
  get: (endpoint) => makeRequest("get", endpoint),
  post: (endpoint, payload) => makeRequest("post", endpoint, payload),
  put: (endpoint, payload) => makeRequest("put", endpoint, payload),
  delete: (endpoint) => makeRequest("delete", endpoint),
};
