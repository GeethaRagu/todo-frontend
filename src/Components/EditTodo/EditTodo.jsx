import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateTodo from "../CreateTodo/CreateTodo";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const EditTodo = ({ todoid }) => {
  const [editText, setEditText] = useState({
    todoText: "",
  });
  const initialValues = {
    todoText: "",
  };
  const validationschema = Yup.object().shape({
    todoText: Yup.string().required("Field is empty"),
  });
  useEffect(() => {
    fetchdata();
  }, []);

  const apiurl = import.meta.env.VITE_API_URLKEY;
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      const response = await fetch(`${apiurl}/todo/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      const todocontent = data.mytodo;
     // console.log("data", todocontent);
      setEditText(todocontent);
    } catch (error) {}
  };

  useEffect(() => {
    formik.setValues(editText);
  }, [editText]);

  const handleSubmit = async (values) => {
   // console.log(values);
    try {
      const response = await fetch(`${apiurl}/todo/edittodo/${id}`, {
        method: "PUT",
        withCredentials: true,
          credentials: "include",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Token"),
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      //console.log(data);
      navigate('/');

    } catch (error) {
      console.log(error);
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

          <Col className="todo_container">
            <Formik>
              <Form onSubmit={formik.handleSubmit}>
                <Field
                  type="text"
                  name="todoText"
                  id="todoText"
                  value={formik.values.todoText}
                  onChange={formik.handleChange}
                />
                <br />
                <Button variant="info" type="submit">
                  Update
                </Button>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditTodo;
