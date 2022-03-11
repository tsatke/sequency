import "./Login.scss";
import { setUserToken, setUser } from "../../reducer/action/user";
import Cookies from "universal-cookie";
import { auth } from "../../connector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import toast, { TYPE } from "../../toast";
import Layout from "../Layout/Layout";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const Login = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const translation = useSelector((state) => state.translation);
  const cookies = new Cookies();

  const successfulLogin = (token, user) => {
    const redirectPath = searchParams.get("redirect");
    dispatch(setUserToken(token));
    dispatch(setUser(user));
    cookies.set("token", token, { path: "/" });
    navigate(redirectPath ? redirectPath : "/dashboard");
  };

  const login = async () => {
    if (mail.length > 0 && password.length > 0) {
      auth(mail, password);
      //   successfulLogin(token, user);
    } else {
      toast(TYPE.ERROR, translation.login.missingInputs);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <Layout>
      <div id="login">
        <div className="form-wrapper">
          <div className="headline">{translation.login.headline}</div>
          <form onSubmit={submit}>
            <div className="element-wrapper">
              <Input
                type="email"
                placeholder={translation.generic.mail}
                value={mail}
                onChange={setMail}
              />
            </div>
            <div className="element-wrapper">
              <Input
                type="password"
                placeholder={translation.generic.password}
                value={password}
                onChange={setPassword}
              />
            </div>
            <div className="element-wrapper">
              <Button text={translation.login.cta} type={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
