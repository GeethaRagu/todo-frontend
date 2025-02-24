import React, { useState } from "react";
import todoimage from "../../Assets/images/todolayout1.jpg";
import "./CreateTodo.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { savetodo } from "../../Redux/Slice/ToDoSlice";

const CreateTodo = () => {
  const currentuser1 = useSelector((state) => state.user.currentuser);
  //console.log(currentuser1);
  const loggeduserId = currentuser1?.loggeduser ? currentuser1?.loggeduser[0]._id : currentuser1?.newUser._id;;
  //console.log(loggeduserId);

  const dispatch = useDispatch();
  const initialValues = {
    text: "",
  };

  const validationschema = Yup.object().shape({
    text: Yup.string().required("Field is empty"),
  });

  const apiurl = import.meta.env.VITE_API_URLKEY;

  const handleSubmit = async (values) => {
    // console.log("id",loggeduserId);
    if (loggeduserId) {
      // console.log(values);
      const bodydata = {
        userid: loggeduserId,
        todos: values.text,
      };
      // console.log(bodydata);
      try {
        const response = await fetch(`${apiurl}/todo/createtodo`, {
          method: "POST",
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify(bodydata),
        });
        const data = await response.json();
        const todoarray = data.rest.todos;
        //console.log("data", todoarray);
        dispatch(savetodo(todoarray));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Kindly login to add Todo");
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <img src={todoimage} alt="Todo" />
      {/* <input
        type="text"
        placeholder="What's on your mind..."
        value={todotext}
        onChange={(e) => setToDoText(e.target.value)}
      ></input>

      <br />
      <Button variant="info" onClick={AddTodo}>
        Add to do
      </Button> */}

      <Formik>
        <Form onSubmit={formik.handleSubmit}>
          <Field
            type="text"
            name="text"
            id="text"
            placeholder="What's on your mind..."
            onChange={formik.handleChange}
            value={formik.values.text}
          ></Field>

          <br />
          <Button variant="info" type="submit">
            Add to do
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateTodo;
