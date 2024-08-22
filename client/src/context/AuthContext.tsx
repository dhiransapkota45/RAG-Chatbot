import { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "../config/supabase";
import { Session } from "@supabase/supabase-js";

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

export const useAuthContext = ()=> useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    getUserStatus().then((res)=>{
      if (res) {
        setIsLoggedin(true);
        setUser(res);
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
