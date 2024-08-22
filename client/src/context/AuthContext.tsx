import { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "../config/supabase";
import { Session } from "@supabase/supabase-js";
import axios from "axios";

export type AuthContextType = {
  user: Session | null;
  login: () => void;
  logout: () => void;
  isLoggedin: boolean;
};

const getUserStatus = async () => {
  try {
    const {
      data: { session },
    } = await supabaseClient?.auth.getSession();
    if (session) {
      return session;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const AuthContext = createContext<AuthContextType | null>(
  null
);

const getAxiosInstance = (token : string | null = null) => {
  const headers : {[key : string] : string } = {
    "Content-Type": "application/json",
  }
  token && (headers["authorization"] = `Bearer ${token}`);
  return axios.create({
    baseURL: import.meta.env.VITE_BACKENDURL,
    withCredentials: true,
    headers
  })
};

export const useAuthContext = ()=> useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState<Session | null>(null);
  let instance;
  useEffect(() => {
    getUserStatus().then((res)=>{
      if (res) {
        setIsLoggedin(true);
        setUser(res);
        instance = getAxiosInstance(res.access_token);
      }
    });
  }, []);

  const login = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${import.meta.env.BACKENDURL}/auth/callback`,
      },
    });
  }
  const logout = async () => {
    await supabaseClient.auth.signOut();
    location.reload();
  }
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoggedin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
