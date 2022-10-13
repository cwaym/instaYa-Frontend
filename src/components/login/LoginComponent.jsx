import { useEffect, useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../../index.css";
const cookies = new Cookies();

import * as API from "../../services/users-services";

import login from "../../assets/login.png";

import "./Login.css";

function LoginComponent() {
  const [validate, setValidate] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [dataLogin, setDataLogin] = useState("");

  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const data = {
    email: form.email,
    password: form.password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.login(data)
        .then((response) => {
          cookies.set("TOKEN", response.accessToken, {
            path: "/",
          });
          localStorage.setItem("dataLogin", JSON.stringify(response));
          setValidate(true);
          window.location.href = "/HomePage";
        })
        .catch((error) => {
          console.log(error);
          let message =
            typeof error.response !== "undefined"
              ? error.response.data.message
              : error.message;
          if (message.length > 1) {
            let msg = JSON.stringify(message);
            alert(msg);
          } else {
            alert(message);
          }
        });
    } catch (error) {
      error = new Error();
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-login">
        <div className="login-container">
          <div className="left-side">
            <div className="login-image">
              <img src={login} />
            </div>
          </div>
          <div className="right-side">
            <h1 className="form-titulo text-center mt-3">Iniciar Sesión</h1>
            <Form
              id="reg-in-order"
              className="form-login"
              style={{ width: 350 + "px" }}
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
			  	className="input-field"
                type="email"
                placeholder="Enter email"
                id="email"
                name="email"
                value={form.email}
                onChange={onUpdateField}
              />

              <input
			 	className="input-field"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={form.password}
                onChange={onUpdateField}
              />
              <Button
                type="submit"
                className="btn-login"
                onClick={(e) => handleSubmit(e)}
              >
                Iniciar Sesion
              </Button>
              <a
                className="btn-register"
                type="submit"
                href="/signup"
              >
                Registrarme
              </a>
				{validate ? (
				<p className="text-success">You Are Logged in Successfully</p>
				) : (
				<p className="text-danger">You Are Not Logged in</p>
				)}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
