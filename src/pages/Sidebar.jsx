import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Chats from "../components/Chats";

const Sidebar = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <Navbar />
          <Search />
          <Chats />
        </div>
      </div>
    </div>
  )
}

export default Sidebar;