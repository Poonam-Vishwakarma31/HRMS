import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * → Attach access token
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * → Global auth failure handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      /**
       * Token expired / invalid / revoked
       * Hard reset auth state
       */
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      /**
       * Do NOT call React context here
       */
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
