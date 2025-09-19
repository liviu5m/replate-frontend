import React from "react";
import type { ReactNode } from "react";
import { AppProvider } from "../../lib/AppContext";
import DashboardSidebar from "../elements/DashboardSidebar";

type LayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppProvider>
      <div className="flex text-[#121212] bg-white">
        <DashboardSidebar />
        <div className="w-4/5 bg-[#F9FAFB]">{children}</div>
      </div>
    </AppProvider>
  );
};

export default DashboardLayout;
