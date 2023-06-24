import React, { useState, useEffect } from "react";
import "./navbar.css";
import Notification from "../../img/notification.svg";

export const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [prev, data]);
    });
  }, [socket]);
  console.log(notifications);
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
