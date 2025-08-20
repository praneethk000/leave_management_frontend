// // lib/api.js
// import axios from "axios";

// // Base Axios instance (replace with your backend URL)
// const api = axios.create({
//   baseURL: "http://localhost:8080/", // Spring Boot base path
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // API wrapper functions
// export const getData = async (endpoint) => {
//   try {
//     const response = await api.get(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error("GET error:", error);
//     throw error;
//   }
// };

// export const postData = async (endpoint, data) => {
//   try {
//     const response = await api.post(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error("POST error:", error);
//     throw error;
//   }
// };

// export const putData = async (endpoint, data) => {
//   try {
//     const response = await api.put(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error("PUT error:", error);
//     throw error;
//   }
// };

// export const deleteData = async (endpoint) => {
//   try {
//     const response = await api.delete(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error("DELETE error:", error);
//     throw error;
//   }
// };

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/web/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic helpers
export const getData = (endpoint, params = {}) =>
  api.get(endpoint, { params }).then(res => res.data);

export const postData = (endpoint, data) =>
  api.post(endpoint, data).then(res => res.data);

export const putData = (endpoint, data, params = {}) =>
  api.put(endpoint, data, { params }).then(res => res.data);

export const deleteData = (endpoint, params = {}) =>
  api.delete(endpoint, { params }).then(res => res.data);

export default api;
