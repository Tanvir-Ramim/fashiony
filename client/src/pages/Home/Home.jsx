import Banner from "../../components/Banner/Banner";
import CheckoutMore from "../../components/checkoutMore/CheckoutMore";
import Combo from "../../components/Combo/Combo";
import FeatureProduct from "../../components/FeatureProduct/FeatureProduct";
import Sale from "../../components/Sale/Sale";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeatureProduct />
      <Sale />
      <Combo />
      <CheckoutMore />
    </div>
  );
};

export default Home;
