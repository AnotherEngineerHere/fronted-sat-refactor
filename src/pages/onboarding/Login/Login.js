import React, { useState } from "react";
import { useHistory } from "react-router";
import { isExpired, decodeToken } from "react-jwt";
import { Form, Input, Button, message } from "antd";
import Titulo from "./Components/Titulo/Titulo";
import Navbar from "../../../commons/NavBar/Navbar";
import { usePostLoginMutation } from "../../../redux/api/mainAUTH";
import { changeUser } from "../../../redux/slices/user";
import { changeToken } from "../../../redux/slices/token";
import { useDispatch } from "react-redux";
import "./Login.css";

//import Label from "./Components/Label/Label";
//import Input from "./Components/Input/Input";

const Login = () => {
  document.title = "Login";
  const dispatch = useDispatch();

  const history = useHistory();

  const [loginUser] = usePostLoginMutation();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  //const [passwordError, setPasswordError] = useState(false);
  //const [isLogin, setIsLogin] = useState(false);
  //const [hasError, setHasError] = useState(false);

  /**
  function handleChange(name, value) {
    if (name === "usuario") {
      setUser(value);
    } else {
      if (value.length < 6) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
        setPassword(value);
      }
    }
  }
   */

  const toHome = async () => {
    const userToLogin = { username: user, password: password };

    await loginUser(userToLogin).then((response) => {
      const token = response.error.data;
      localStorage.setItem("token", token);
      dispatch(changeUser(decodeToken(response.error.data)));
      dispatch(changeToken(response.error.data));
      return history.push("/home");
    });
  };

  return (
    <div className="Navbar">
      <Navbar></Navbar>
      <div className="login-container">
        <div className="login-content">
          <Titulo text="INICIAR SESIÓN" />
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            //onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Usuario"
              name="username"
              rules={[
                { required: true, message: "Porfavor escriba su usuario" },
              ]}
            >
              <Input
                value={user}
                onChange={(event) => setUser(event.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: "Porfavor escriba su contraseña" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={toHome}>
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;