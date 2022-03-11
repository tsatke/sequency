import "./Home.scss";
import Link from "../UI/Link/Link";
import { useSelector } from "react-redux";

const Home = () => {
  const translation = useSelector((s) => s.translation);
  return (
    <div id="home">
      <Link isButton href={"/login"} text={translation.home.goToLogin} />
    </div>
  );
};

export default Home;
