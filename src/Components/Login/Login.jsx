import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CreateTodo from "../CreateTodo/CreateTodo";
import "./Login.css";
import { Field, Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../Redux/Slice/UserSlice";
const Login = () => {
  const [todo, setToDo] = useState([]);
  const [todotext, setToDoText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentuser = useSelector((state) => state.user.currentuser);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationschema = Yup.object().shape({
    email: Yup.string().required("Field is empty"),
    password: Yup.string().required("Field is empty"),
  });

  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values) => {
    //console.log(values);
    try {
      dispatch(signInStart());
      const response = await fetch(`${apiurl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        localStorage.setItem("Token", data.token);
        //console.log(data);
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        return dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <Container>
        <Row className="row-cols-1 row-cols-md-2">
          <Col>
            <CreateTodo />
          </Col>

          <Col className="login_container">
            <Formik>
              <Form onSubmit={formik.handleSubmit}>
                <div>
                  <div className="d-flex justify-content-between mb-3">
                    <label className="label p-2">
                      <span className="text-base label-text text-white">
                        Email
                      </span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full input input-bordered h-10  text-black"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={formik.errors.email}
                    />
                  </div>
                  {formik.errors.email ? (
                    <div className="float-right">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div>
                  <div className="d-flex justify-content-between mb-3">
                    {" "}
                    <label className="label p-2">
                      <span className="text-base label-text text-white">
                        Password
                      </span>
                    </label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      className="w-full input input-bordered h-10  text-black"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      error={formik.errors.password}
                    />
                  </div>

                  {formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="mt-2 mb-2">
                  <Link to="/register" className="text-amber-200 link-opacity-50-hover link-underline link-underline-opacity-0 fs-6 text fw-bolder">
                    Don't have an account? Register here
                  </Link>
                </div>

                <div>
                  <Button type="submit" className="button button-primary">
                    SignIn
                  </Button>
                </div>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
