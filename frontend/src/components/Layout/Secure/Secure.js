import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { setUserToken, setUser } from "../../../reducer/action/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { auth } from "../../../connector";

const Secure = (props) => {
  const authRequired = props.authRequired || false;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [isEvaluated, setIsEvaluated] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token", { path: "/" });

    const getRedirectPath = () => {
      const path = pathname;
      const queryParams = Object.fromEntries([...searchParams]);
      const queryPath = Object.keys(queryParams).reduce(
        (acc, key) => (acc += `${key}=${queryParams[key]}`),
        "?"
      );
      const redirectPath = path + (queryPath !== "?" ? queryPath : "");
      return path === "/" ? "/login" : "/login?redirect=" + redirectPath;
    };

    const evaluate = (user, newToken) => {
      dispatch(setUser(user));
      dispatch(setUserToken(newToken || token));
      setIsEvaluated(true);
    };

    const invalidatedUser = (withRedirect = false) => {
      cookies.remove("token", { path: "/" });
      dispatch(setUser(null));
      dispatch(setUserToken(null));
      if (withRedirect) {
        setIsEvaluated(false);
        navigate(getRedirectPath());
      } else {
        setIsEvaluated(true);
      }
    };

    const resolveToken = async () => {
      const { user, newToken } = await auth.resolveToken(token);
      if (user) {
        if (authRequired === "admin") {
          if (user.isAdmin === true) {
            evaluate(user, newToken);
          } else {
            invalidatedUser(true);
          }
        } else {
          evaluate(user, newToken);
        }
      } else {
        invalidatedUser(!!authRequired);
      }
    };

    if (!isEvaluated) {
      if (!user && token) {
        resolveToken();
      } else if (authRequired && !user) {
        invalidatedUser(true);
      } else {
        setIsEvaluated(true);
      }
    }
  }, [
    isEvaluated,
    authRequired,
    dispatch,
    navigate,
    user,
    pathname,
    searchParams,
  ]);

  return isEvaluated ? <>{props.children}</> : <></>;
};

export default Secure;
