import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/Auth";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="logo">piChat</div>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Log out</button>
      </div>
    </div>
  )
}

export default Navbar;