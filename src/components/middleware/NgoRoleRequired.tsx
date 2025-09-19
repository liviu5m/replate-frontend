import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../lib/AppContext";

interface NgoRoleRequiredProps {
  children: ReactNode;
}

const NgoRoleRequired: React.FC<NgoRoleRequiredProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppContext();

  if (user?.role != "NGO") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default NgoRoleRequired;
