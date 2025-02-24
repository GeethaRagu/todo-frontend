import React, { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./Todolists.css";
import { useDispatch, useSelector } from "react-redux";
import { savetodo } from "../../Redux/Slice/ToDoSlice";
import { useNavigate } from "react-router-dom";
import { extractTime } from "../../../Utils/extractTime";
import axios from "axios";
import { signOutSuccess } from "../../Redux/Slice/UserSlice";

const Todolists = () => {
  const currentuser = useSelector((state) => state.user.currentuser);
 // console.log(currentuser);
 const loggeduserId = currentuser?.loggeduser ? currentuser?.loggeduser[0]._id : currentuser?.newUser._id;;
  //const usertodo = currentuser.loggeduser[0].todos;
  //console.log("usertodo", usertodo);

  const todo = useSelector((state) => state.todo);
  //console.log("todoarray", todo);
  const dispatch = useDispatch();
  const lasttodoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      lasttodoRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [todo]);

  useEffect(() => {
    fetchData();
  }, [todo]);

  const apiurl = import.meta.env.VITE_API_URLKEY;

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiurl}/todo/gettodo/${loggeduserId}`, {
        method: "GET",
      });
      const data = await response.json();
      //console.log("data", data);
      const usertodos = data.usertodos;
      dispatch(savetodo(usertodos));
      //setTodo(data.usertodos);
      //console.log("todos", todo);
    } catch (error) {
      console.log(error);
    }
  };

  const edittodo = (id) => {
    //console.log(id);

    navigate(`/edit/${id}`);
  };
  const deletetodo = async (id) => {
   // console.log(id);
    try {
      const response = await fetch(`${apiurl}/todo/deletetodo/${id}`, {
        method: "DELETE",
        withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
      });
      const data = await response.json();
      // await axios.delete(`${apiurl}/todo/deletetodo/${id}`).then((res) => {
      //   console.log("data", res.data);
      dispatch(deletetodo(id));
      // });
    } catch (error) {
      console.log(error);
    }
    //navigate(`/delete/${id}`);
  };

  const signOut=()=>{
      dispatch(signOutSuccess());
      localStorage.removeItem("Token");
  }
  return (
    <div className="overflow-auto card_container">
      {todo.map((element, index) => {
        return (
          <div key={index} ref={lasttodoRef}>
            <Card className="text-center">
              <Card.Body>
                <Card.Text>{element.todoText}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => {
                      edittodo(element._id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deletetodo(element._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                {extractTime(element.createdAt)}
              </Card.Footer>
            </Card>
          </div>
        );
      })}
      <div className="d-flex justify-content-between">
        {/* <Button>Save ToDo</Button> */}
        <Button onClick={()=>signOut()}>Logout</Button>
      </div>
    </div>
  );
};

export default Todolists;
