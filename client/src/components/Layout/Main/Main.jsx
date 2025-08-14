import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Main;
