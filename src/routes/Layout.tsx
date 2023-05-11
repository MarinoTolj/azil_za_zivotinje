import React from "react";
import { Header } from "../components/Header";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
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
