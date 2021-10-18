import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";

interface AuthContextData {
  signed: boolean;
  user: any | null;
  Login(user: object): Promise<null | any>;
  Logout(): void;
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
    if(!response.data){
      return null;
    }
    setUser(response.data[0]);
    localStorage.setItem('userData', JSON.stringify(response.data[0]));
  }

  function Logout() {
    setUser(null);
    localStorage.removeItem("userData")
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
