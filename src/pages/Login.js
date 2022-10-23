import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import userService from "./../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/auth";
import CustomButton from "../components/CustomButton";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    setIsWaiting(true);
    userService.login(username, password).then((res) => {
      setIsWaiting(false);
      if (res.errorCode === 0) {
        setMessage("");
        // save user info
        dispatch(
          login({
            token: res.data.accessToken,
            userInfo: res.data,
          })
        );
        navigate("/home");
      } else {
        setMessage(t(`message:${res.errorCode}`));
      }
    });
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <div className="container h-100">
      <div className="row justify-content-center h-100 align-items-center">
        <div className="col-sm-8 col-lg-5">
          <div className="card bg-primary">
            <div className="card-header text-white">
              <h4 className="card-title mb-0">
                <i className="bi-grid-3x3-gap-fill" /> {t("login")}
              </h4>
            </div>
            <div className="card-body bg-white rounded-bottom">
              <p className="text-center text-danger">{message}</p>
              <form onSubmit={formSubmitHandler}>
                <Input
                  inputRef={usernameRef}
                  id="txtUsername"
                  label={t("username")}
                  placeholder={t("enterUsername")}
                  autoComplete="off"
                  maxLength="50"
                  type="text"
                />
                <Input
                  inputRef={passwordRef}
                  id="txtPassword"
                  label={t("password")}
                  placeholder={t("enterPassword")}
                  type="password"
                />
                <div className="row">
                  <div className="offset-sm-3 col-auto">
                    <CustomButton type="submit" color="primary" isLoading={isWaiting} disabled={isWaiting}>
                      {t("signIn")}
                    </CustomButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
