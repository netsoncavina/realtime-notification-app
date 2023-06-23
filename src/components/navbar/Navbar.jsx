import React from "react";
import "./navbar.css";
import Notification from "../../img/notification.svg";

export const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Notification App</span>
      <div className="icons">
        <div className="icon">
          <img src={Notification} className="iconImg" alt="" />
          <div className="counter">2</div>
        </div>
      </div>
    </div>
  );
};
