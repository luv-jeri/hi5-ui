import "../ChatListComponents/ChatList.css";
import { IoLogOutOutline,IoSearch,IoRadioButtonOnOutline ,IoFilter,IoReader} from "react-icons/io5";
import { useState } from "react";
import ListSub from "../ChatListComponents/ListSubComponent/ListSub.jsx";
import { useEffect } from "react";
import { AppShell } from "@mantine/core";

const ChatList = () => {
  const Arr = [
    {
      name: "Amber Heard",
      Lmsg: "I'll pay you later !",
      pending: "3515",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/2/21/Johnny_Depp_2020.jpg",
    },
    {
      name: "Johny Depp",
      Lmsg: "See you on next campaign!",
      pending: "27",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Johnny_Depp_Deauville_2019.jpg/640px-Johnny_Depp_Deauville_2019.jpg",
    },
    {
      name: "Amber Heard",
      Lmsg: "I'll pay you later !",
      pending: "3",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/2/21/Johnny_Depp_2020.jpg",
    },
    {
      name: "Johny Depp",
      Lmsg: "See you on next campaign!",
      pending: "27",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Johnny_Depp_Deauville_2019.jpg/640px-Johnny_Depp_Deauville_2019.jpg",
    },{
      name: "Amber Heard",
      Lmsg: "I'll pay you later !",
      pending: "3",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/2/21/Johnny_Depp_2020.jpg",
    },
    {
      name: "Johny Depp",
      Lmsg: "See you on next campaign!",
      pending: "27",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Johnny_Depp_Deauville_2019.jpg/640px-Johnny_Depp_Deauville_2019.jpg",
    },{
      name: "Amber Heard",
      Lmsg: "I'll pay you later !",
      pending: "3",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/2/21/Johnny_Depp_2020.jpg",
    },
    {
      name: "Johny Depp",
      Lmsg: "See you on next campaign!",
      pending: "27",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Johnny_Depp_Deauville_2019.jpg/640px-Johnny_Depp_Deauville_2019.jpg",
    },{
      name: "Amber Heard",
      Lmsg: "I'll pay you later !",
      pending: "3",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/2/21/Johnny_Depp_2020.jpg",
    },
    {
      name: "Johny Depp",
      Lmsg: "See you on next campaign!",
      pending: "27",
      LastSeen: "125",
      DisplayProfile: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Johnny_Depp_Deauville_2019.jpg/640px-Johnny_Depp_Deauville_2019.jpg",
    },
  ];
  const [search, setSearch] = useState("");

  return (
    <div className="ChatList-Container" >
      <div className="chatList-Header">
        <div className="chatList-Header-Logo">
          <div className="Header-Logo-Content">
            <div className="Image"></div>
            Whats App Clone
          </div>
          <div className="Header-Logout">
            {" "}
           <div style={{fontSize:'20px'}}> <IoLogOutOutline /></div> &nbsp; Logout
          </div>
        </div>
        <div className="Header-Options-Container">
          <div className="Header-Item-Container"><IoReader /></div>
          <div className="Header-Item-Container"><IoRadioButtonOnOutline /></div>
          <div className="Header-Item-Container"><IoFilter /></div>
        </div>
        <div
          className="chatList-Header-SearchBar"
          placeholder="Search friends"
          onChange={(Event) => {
            setSearch(Event.target.value);
          }}
        > <div className="Search-Icon"><IoSearch /></div><input
        className="chatList-Header-SearchBar-Input"
        placeholder="Search friends"
        onChange={(Event) => {
          setSearch(Event.target.value);
        }}
      /></div>
      
      </div>

      <div className="chatList-Body">
        {Arr.map((El) => {
          return (
            <>
              <ListSub Obj={El} />
            </>
          );
        })}
      </div>
    </div>
  );
};
export default ChatList;
