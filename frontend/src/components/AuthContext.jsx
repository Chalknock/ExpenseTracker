import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken"));

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);

  const login = (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    delete api.defaults.headers.common["Authorization"];
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) return null;

    try {
      const response = await api.post("/token/refresh/", { refresh: refreshToken });
      const { access } = response.data;
      setAccessToken(access);
      localStorage.setItem("accessToken", access);
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      return access;
    } catch (error) {
      logout();
      throw error;
    }
  };

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If 401 and we haven't retried yet
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          refreshToken
        ) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            }
          } catch (err) {
            // refresh failed, logout handled in refreshAccessToken
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
