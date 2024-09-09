import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const navigate = useNavigate()

  useEffect(()=>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () =>{
        unsub();
      };
    };

    currentUser.uid && getChats();
  },[currentUser]);
  
  const handleSelect = (u) => {
    navigate("/chat");
    dispatch({type:"CHAGE_USER", payload:u})
  }
  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessege?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats;