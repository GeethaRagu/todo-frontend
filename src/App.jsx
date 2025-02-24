import React from "react";
import HomeLayout from "./Components/HomeLayout/HomeLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import EditTodo from "./Components/EditTodo/EditTodo.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <div>
        <ToastContainer></ToastContainer>
      </div>
      <div>
        {" "}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />}></Route>
            <Route path="/home" element={<HomeLayout />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/edit/:id" element={<EditTodo />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
