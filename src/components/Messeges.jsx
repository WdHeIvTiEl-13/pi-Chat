import React, { useContext, useEffect, useState } from "react";
import Messege from "./Messege";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messeges = () => {
  const [messeges, setMesseges] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatID), (doc)=>{
      doc.exists() && setMesseges(doc.data().messeges);
    })

    return ()=>{
      unSub()
    }
  },[data.chatID]);

  return (
    <div className="messeges">
      {messeges.map(m=>(
        <Messege messege={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messeges;