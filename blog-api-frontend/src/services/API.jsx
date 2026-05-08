import axios from "axios";

const API = axios.create({
    baseURL: "https://blog-app-project-i9a0.onrender.com/api"
});

// Ajouter token automatiquement
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization =` Bearer ${token}`;
  }
  return req;
});

export default API;