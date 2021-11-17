import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";

interface AuthContextData {
  signed: boolean;
  user: any | null;
  Login(user: object): Promise<boolean>;
  Logout(): void;
  GetLastId(): Promise<any>;
  Signup(userData: object): Promise<any>;
}

const API_URL = "http://localhost:3004";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('userData');
    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  async function Login(userData: any) {
    const response: any = await axios.get(`${API_URL}/profile?user=${userData.user}&password=${userData.password}`);
    if (!response.data || response.data.length == 0) {
      return false;
    }
    setUser(response.data[0]);
    localStorage.setItem('userData', JSON.stringify(response.data[0]));
    return true;
  }

  function Logout() {
    setUser(null);
    
    localStorage.removeItem("userData")
  }

  async function GetLastId() {
    const data: any = await axios.get(`${API_URL}/profile?_sort=id&_order=desc&_end=1`);
    if (data.data && data.data.length > 0) {
      return data.data[0].id;
    }
    return 0;
  }

  async function Signup(userData: any) {
    try {
      await axios.post(`${API_URL}/profile`, userData);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout, GetLastId, Signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
