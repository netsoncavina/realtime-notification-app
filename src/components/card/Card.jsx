import React, { useState } from "react";
import "./card.css";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";

export const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  // console.log(user, post.username);

  return (
    <div>
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span className="name">{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img
            src={HeartFilled}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};
