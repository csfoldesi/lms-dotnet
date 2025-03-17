import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("clerk-jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


/*client.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/

/*createAuthRefreshInterceptor(
  client,
  async () => {
    try {
      await client.get("/auth/refresh-token");
      return Promise.resolve;
    } catch {
      return Promise.reject;
    }
  },
  {
    statusCodes: [401],
    pauseInstanceWhileRefreshing: true,
  }
);
*/
