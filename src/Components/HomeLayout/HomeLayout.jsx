import React, { useState } from "react";
import CreateTodo from "../CreateTodo/CreateTodo";
import Todolists from "../Todolists/Todolists";
import { Col, Container, Row } from "react-bootstrap";
import "./HomeLayout.css";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";

const HomeLayout = () => {

  const currentuser = useSelector((state) => state.user.currentuser);
 // console.log(currentuser);
  return (
    <Container>
      <Row className="row-cols-1 row-cols-md-2">
        <Col>
          <CreateTodo />
        </Col>
      
        {(currentuser?.loggeduser ? currentuser?.loggeduser : currentuser?.newUser) ? (
          <Col className="todo_container">
            <Todolists />
          </Col>
        ) : (
          <Col className="todo_container">
            <NavBar />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomeLayout;
