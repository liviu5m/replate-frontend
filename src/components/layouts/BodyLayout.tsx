import React from "react";
import type { ReactNode } from "react";
import Header from "../elements/Header";
import { AppProvider } from "../../lib/AppContext";
import Footer from "../elements/Footer";

type LayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppProvider>
      <div className="flex justify-center items-center flex-col text-[#121212] bg-white">
        <Header />
        <div className="h-24"></div>
        {children}
        <Footer />
      </div>
    </AppProvider>
  );
};

export default BodyLayout;
