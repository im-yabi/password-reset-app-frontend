import axios from "axios";

// ✅ Create axios instance with backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
});

// ✅ Attach token automatically if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
