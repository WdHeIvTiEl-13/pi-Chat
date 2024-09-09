import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/Auth";

const Messege = ({messege}) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"});
  }, [messege]);

  return (
    <div ref={ref} className={`messege ${messege.senderID === currentUser.uid && "owner"}`}>
      <div className="msgInfo">
        <img src={messege.senderID === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>just now</span>
      </div>
      <div className="msgContent">
        {messege.text && <p>{messege.text}</p>}
        {messege.img && <img src={messege.img} alt="" />}
      </div>
    </div>
  )
}

export default Messege;