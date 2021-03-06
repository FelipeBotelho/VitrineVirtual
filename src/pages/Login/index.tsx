import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from '../../contexts/auth';

import { RouteComponentProps } from "react-router-dom";
import './styles.css'
import logo from "../../assets/images/logo.jpg";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Login: React.FC<Props> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { Login } = useAuth();
  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Este campo é obrigatorio"),
    password: Yup.string().required("Este campo é obrigatorio"),
  });

  const handleSignup = () =>{
    history.push("/signup");
  }

  async function handleLogin(formValue: { username: string; password: string }){
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    const login = await Login({
      user: username,
      password: password,
    });

    if(!login){
        setLoading(false);
        setMessage("Usuário ou senha Inválidos");
    }else{
      history.push("/");
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src= {logo}
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Entrar</span>
              </button>
            </div>
            <div className="form-group">
              <button type="button" onClick={handleSignup} className="btn btn-primary btn-block">
                  <span>Cadastrar</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
