import "./Layout.scss";
import Header from "./Header/Header";
import Secure from "./Secure/Secure";

const Layout = (props) => {
  const header = props.header !== undefined ? props.header : true;

  return (
    <div id="layout" className={`${props.fullsize === true ? "fullsize" : ""}`}>
      <Secure authRequired={props.authRequired}>
        {header && <Header />}
        <div id="content-container">{props.children}</div>
      </Secure>
    </div>
  );
};

export default Layout;
