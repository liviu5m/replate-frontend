"use client";

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "./Types";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../api/user";
import Loader from "../components/elements/Loader";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const { isPending } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getAuthenticatedUser(token || ""),
    select: (data) => {
      if (!data) {
        localStorage.removeItem("token");
        setToken(null);
      }
      if (!user && data) setUser(data);
      return data;
    },
    enabled: token != null,
  });

  return isPending && token ? (
    <Loader />
  ) : (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
