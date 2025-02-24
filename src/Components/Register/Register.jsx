import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CreateTodo from "../CreateTodo/CreateTodo";
import "./Register.css";
import { Field, Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../../Redux/Slice/UserSlice";

const Register = () => {
  const [todo, setToDo] = useState([]);
  const [todotext, setToDoText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentuser = useSelector((state) => state.user.currentuser);

  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  };

  const validationschema = Yup.object().shape({
    email: Yup.string().required("Field is empty"),
    username: Yup.string().required("Field is empty"),
    password: Yup.string().required("Field is empty"),
    confirmpassword: Yup.string().required("Field is empty"),
    gender: Yup.string().required("Field is empty"),
  });

  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values) => {
    //console.log(values);
    try {
      dispatch(signUpStart());
      const response = await fetch(`${apiurl}/auth/signup`, {
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
        return dispatch(signUpFailure(data.message));
      }
      if (response.ok) {
        localStorage.setItem("Token", data.token);
        dispatch(signUpSuccess(data));
        navigate("/");
      } else {
        return dispatch(signUpFailure(data.message));
      }
    } catch (error) {
      dispatch(signUpFailure(error));
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
                    <label className="label p-2">
                      <span className="text-base label-text text-white">
                        Username
                      </span>
                    </label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      className="w-full input input-bordered h-10 text-black"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      error={formik.errors.username}
                    />
                  </div>

                  {formik.errors.username ? (
                    <div>{formik.errors.username}</div>
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
                <div>
                  <div className="d-flex justify-content-between mb-3">
                    <label className="label p-2">
                      <span className="text-base label-text text-white">
                        Confirm Password
                      </span>
                    </label>
                    <Field
                      type="password"
                      name="confirmpassword"
                      placeholder="Enter Password"
                      className="w-full input input-bordered h-10  text-black"
                      onChange={formik.handleChange}
                      value={formik.values.confirmpassword}
                      error={formik.errors.confirmpassword}
                    />
                  </div>

                  {formik.errors.confirmpassword ? (
                    <div>{formik.errors.confirmpassword}</div>
                  ) : null}
                </div>

                <fieldset
                  id="radioGroup"
                  label="One of these please"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.radioGroup}
                  error={formik.errors.radioGroup}
                >
                  <input
                    type="radio"
                    name="gender"
                    id="radioOption1"
                    label="Choose this option"
                    value="Male"
                    className="radio radio-primary w-4 h-4 mt-4"
                  />
                  <span className="p-2  text-white">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    id="radioOption2"
                    label="Or choose this one"
                    value="Female"
                    className="radio radio-primary w-4 h-4 mt-4"
                  />
                  <span className="p-2  text-white">Female</span>
                </fieldset>

                {formik.touched.gender && formik.errors.gender ? (
                  <div>{formik.errors.gender}</div>
                ) : null}
                <div className="mt-2 mb-2">
                  <Link to="/login" className="text-amber-200 link-opacity-50-hover link-underline link-underline-opacity-0 fs-6 text fw-bolder">
                    Already have an account?
                  </Link>
                </div>

                <div>
                  <Button type="submit" className="button button-primary">
                    SignUp
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

export default Register;
