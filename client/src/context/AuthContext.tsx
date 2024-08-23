import { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "../config/supabase";
import { Session } from "@supabase/supabase-js";
import { useSearchParams } from "react-router-dom";

export type AuthContextType = {
  user: Session | null;
  login: () => void;
  logout: () => void;
  isLoggedin: boolean;
  conversationId: string | null;
};

const getUserStatus = async () => {
  try {
    const {
      data: { session },
    } = await supabaseClient?.auth.getSession();
    if (session) {
      sessionStorage.setItem("access_token", session?.access_token);
      return session;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState<Session | null>(null);

  //get conversation id from url
  const [searchParams] = useSearchParams();
  const conversationId = searchParams?.get("conversation") ?? null;

  useEffect(() => {
    getUserStatus().then((res) => {
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
  };
  const logout = async () => {
    await supabaseClient.auth.signOut();
    location.reload();
  };
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoggedin, conversationId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
