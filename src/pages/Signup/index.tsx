import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from '../../contexts/auth';

import { RouteComponentProps } from "react-router-dom";
import './styles.css'
import { Input, useToast, UseToastOptions } from '@chakra-ui/react';

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Signup: React.FC<Props> = ({ history }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [id, setId] = useState(0);
  const { Signup, GetLastId } = useAuth();
  const toast = useToast();

  useEffect(() => {
    debugger;
    (async () => {
      const lastId = await GetLastId();
      setId(lastId + 1);
    })()
  }, []);

  const initialValues: {
    username: string;
    password: string;
    name: string,
    email: string,
    phone: string
  } = {
    username: "",
    password: "",
    name: "",
    email: "",
    phone: ""
  };

  const addUserToast: UseToastOptions = {
    title: "Usuário Incluido com Sucesso, Realize o Login",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  };


  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    name: Yup.string().required("This field is required!"),
    email: Yup.string().required("This field is required!"),
    phone: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  async function handleSignup(formValue: { username: string; password: string, name: string, email: string, phone: string }) {

    const { username, password, name, email, phone } = formValue;
    const roles = ["Client"];
    setMessage("");
    setLoading(true);

    const result = await Signup({
      id: id,
      name: name,
      email: email,
      phone: phone,
      roles: roles,
      user: username,
      password: password
    });

    if (!result) {
      setLoading(false);
      setMessage("Erro ao cadastrar usuário");
    } else {
      toast(addUserToast);
      history.push("/login");
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="Id">Id</label>
              <Input value={id.toString()} disabled={true}/>
              
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field name="phone" type="text" className="form-control" />
              <ErrorMessage
                name="phone"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
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
                <span>Login</span>
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

export default Signup;
