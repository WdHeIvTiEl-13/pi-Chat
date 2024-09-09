import React, { useContext } from "react";
import Messeges from "../components/Messeges";
import Input from "../components/Input";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { data } = useContext(ChatContext);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  }

  return (
    <div className="home">
      <div className="container">
        <div className="chat">
          <div className="chatInfo">
            <button onClick={handleBack}>&lt;</button>
            <img src={data.user?.photoURL} alt="" />
            <span>{data.user?.displayName}</span>
          </div>
          <Messeges />
          <Input />
        </div>
      </div>
    </div>
  )
}

export default Chat;