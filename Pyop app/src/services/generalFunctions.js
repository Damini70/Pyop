import axios from "axios";
// const baseURL =  "http://localhost:4000"
const baseURL="https://pyop-backend-1.onrender.com"

// Create an axios instance
const api = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor to include headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your method of getting the token
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
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error signing up User:", error);
    return error.response.data; // Return error response data
  }
};
// Create a function for making requests
export const makeRequest = async (method, endpoint, payload = null) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data: payload,
    });

    return response.data; // Return only the data
  } catch (error) {
    // throw error; // Rethrow the error to handle it in the component
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
