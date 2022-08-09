import "../ListSubComponent/ListSub.css";

const ListSub = (Obj) => {
  const { name, Lmsg, pending } = Obj;
  // const LastSeenConverter=()=>{
  //   const Timer= parseInt(Obj.Obj.LastSeen);
  //   switch(Timer){
  //     case Timer<59:
  //       return(`${Timer} mins ago`);
  //       break;
        
    
  // }
  // LastSeenConverter();
  return (
    <div className="List-Container">
      <div className="List-Container-Logo" style={{backgroundImage:  `url(${Obj.Obj.DisplayProfile})`}}></div>
      <div className="List-Container-Right">
        <div className="Right-Info">
          <div className="List-Container-Right-Name">{Obj.Obj.name}</div>
          <div className="List-Container-Right-LMsg">
          {Obj.Obj.Lmsg}
          </div>
        </div>
        <div className="Right-LastSeen">
          <div className="LastSeen-Time">{Obj.Obj.LastSeen} min ago</div>
          <div className="LastSeen-Counter">{Obj.Obj.pending}</div>
        </div>
      </div>
    </div>
  );
};

export default ListSub;
