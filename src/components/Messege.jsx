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
        {(((new Date().getDate()-messege.date)) >> 7) ? <span>{messege.date +" "+messege.month}</span>: null}
        {(messege.date === new Date().getDate()) ? <span>{messege.time}</span>: null}
        {((new Date().getDate()-messege.date) === 1) ? <span><p style={{fontSize:"8px",margin:"0"}}>Yesterday</p>{messege.time}</span>: null}
        {(((new Date().getDate()-messege.date) >> 1) && ((new Date().getDate()-messege.date) << 7)) ? <span>{messege.day}</span>:null}
      </div>
      <div className="msgContent">
        {messege.img && <img src={messege.img} alt="" />}
        {messege.text && <p>{messege.text}</p>}
      </div>
    </div>
  )
}

export default Messege;