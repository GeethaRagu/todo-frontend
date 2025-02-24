import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
const NavBar = () => {
  const currentuser = useSelector((state) => state.user.currentuser);
  return (
    <div>
      {!currentuser?.loggeduser ?  (
        <>
          <div className="nav_container">
            <ul className="d-flex flex-row justify-content-around">
              <li className="">
                <button type="button" className="btn btn-info p-2">
                  <a className="fs-2" href="/login">
                    Login
                  </a>
                </button>
              </li>
              <li className="">
                <button type="button" className="btn btn-info p-2">
                  <a className="fs-2" href="/register">
                    Register
                  </a>
                </button>
              </li>
            </ul>
          </div>
        </>
      ): (
        <></>
      )}
    </div>
  );
};

export default NavBar;
