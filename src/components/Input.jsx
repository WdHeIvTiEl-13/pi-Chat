import React, { useContext, useState } from "react";
import addAvater from "../img/addAvater.png";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";

const Input = () => {
  const [text,setText] = useState("")
  const [img,setImg] = useState(null)

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const handleSend = async () => {
    let DATE = new Date();
    let day = days[DATE.getDay()];
    let hours = DATE.getHours(); 
    let minutes = DATE.getMinutes();
    let time = hours +":"+ minutes;
    
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on('state_changed', (snapshot) =>{},
        (error) => {
          console.log("img can't be uploaded.");
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            if (text==="") {
              await updateDoc(doc(db, "chats", data.chatID), {
                messeges: arrayUnion({
                  id: uuid(),
                  senderID: currentUser.uid,
                  month : months[DATE.getMonth()],
                  date : DATE.getDate(),
                  day,
                  hours: DATE.getHours(),
                  minutes: DATE.getMinutes(),
                  time,
                  img: downloadURL,
                })
              });
            }else{
              await updateDoc(doc(db, "chats", data.chatID), {
                messeges: arrayUnion({
                  id: uuid(),
                  text,
                  senderID: currentUser.uid,
                  month : months[DATE.getMonth()],
                  date : DATE.getDate(),
                  day,
                  hours: DATE.getHours(),
                  minutes: DATE.getMinutes(),
                  time,
                  img: downloadURL,
                })
              });
            }
            
          });
        }
      );
    }else if (text!==""){
      await updateDoc(doc(db, "chats", data.chatID), {
        messeges: arrayUnion({
          id: uuid(),
          text,
          senderID: currentUser.uid,
          month : months[DATE.getMonth()],
          date : DATE.getDate(),
          day,
          hours: DATE.getHours(),
          minutes: DATE.getMinutes(),
          time,
        }),
      });
    }

    if (text!=="") {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatID+".lastMessege"] : {
          text,
          id: currentUser.uid,
        },
        [data.chatID+".date"]: serverTimestamp(),
        [data.chatID+".seen"]: false,
      })
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatID+".lastMessege"] : {
          text,
          id: currentUser.uid,
        },
        [data.chatID+".date"] : serverTimestamp(),
        [data.chatID+".seen"]: false,
      })
    } else {
    }


    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input type="text" placeholder="Type a messege" onChange={(e)=>setText(e.target.value)} value={text} />
      <div className="send">
        <input style={{display:"none"}} type="file" id="sendImg" onChange={(e)=>setImg(e.target.files[0])} />
        <label htmlFor="sendImg">
          <img src={addAvater} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input;