import React from "react";
import { Header } from "./Header";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import { routes } from "../main";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Header routes={routes} />
      {props.children}
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Layout;
