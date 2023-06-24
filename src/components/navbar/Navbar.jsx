import React, { useState, useEffect } from "react";
import "./navbar.css";
import Notification from "../../img/notification.svg";

export const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [prev, data]);
    });
  }, [socket]);

  // console.log(notifications);
  return (
    <div className="navbar">
      <span className="logo">Notification App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          <div className="counter">2</div>
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.length === 0 && <span>Sem notificações</span>}
          {notifications[0]?.map((notification) =>
            notification.senderName !== undefined ? (
              <span className="notification">
                {notification.senderName}{" "}
                {notification.type === 1
                  ? "Curtiu seu post"
                  : notification.type === 2
                  ? "Comentou seu post"
                  : "Compartilhou seu post"}
              </span>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};
