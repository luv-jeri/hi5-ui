import "../ListSubComponent/ListSub.css";

const LisSub =()=>{
    return(        <div className="List-Container">
    <div className="List-Container-Logo"></div>
    <div className="List-Container-Right">
        <div className="Right-Info">
        <div className="List-Container-Right-Name">Johny Depp</div>
        <div className="List-Container-Right-LMsg">You saved the lots of money & buy it..</div>
        </div>
        <div className="Right-LastSeen">
            <div className="LastSeen-Time">
                51 min ago
            </div>
            <div className="LastSeen-Counter">
                5
            </div>

        </div>

    </div>
</div>);
}

export default LisSub;