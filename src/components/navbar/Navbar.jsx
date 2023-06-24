import React, { useState, useEffect } from "react";
import "./navbar.css";
import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";

export const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [prev, data]);
    });
  }, [socket]);

  const handleClear = () => {
    setNotifications([]);
    setOpen(false);
  };
  // console.log(notifications);
  return (
    <div className="navbar">
      <span className="logo">Notification App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length - 1}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} className="iconImg" alt="" />
          {/* <div className="counter">{notifications.length}</div> */}
        </div>
        <div className="icon">
          <img src={Settings} className="iconImg" alt="" />
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
          <button className="nButton" onClick={handleClear}>
            Limpar
          </button>
        </div>
      )}
    </div>
  );
};
