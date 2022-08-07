import "../ChatListComponents/ChatList.css";
import { IoLogOutOutline } from "react-icons/io5";
import { useState } from "react";
import ListSub from "../ChatListComponents/ListSubComponent/ListSub.jsx";

const ChatList = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="ChatList-Container">
      <div className="chatList-Header">
        <div className="chatList-Header-Logo">
          <div className="Header-Logo-Content">
            <div className="Image"></div>
            Whats App Clone
          </div>
          <div className="Header-Logout">
            {" "}
            <IoLogOutOutline /> Logout
          </div>
        </div>
        <input
          className="chatList-Header-SearchBar"
          placeholder="Search friends"
          onChange={(Event) => {
            setSearch(Event.target.value);
          }}
        />
      </div>

      <div className="chatList-Body">
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />
        <ListSub />

      </div>
    </div>
  );
};
export default ChatList;
