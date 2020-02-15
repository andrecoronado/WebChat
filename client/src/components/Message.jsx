import React  from "react";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone'
import api from '../api'

var classN = ''
var liked = ''
function Message(props) {
  async function handleClick() {

    const _id = props._id
    props.liked ? liked = false : liked = true 
    const updateMessage = await api.updateMessage( {"_id": _id , "liked": liked})
        .catch(function (error) { if( error.response.status === 401 ){ props.setLogOff() } })
     if ( updateMessage ){
        const getMessages = await api.getMessages ()        
        props.setMessage(getMessages.data) 
      }
  }

  props.user === props.username ? classN = "message user-msg" : classN = "message"

  return (
    <div className= { classN } >
      <h1>{props.username}</h1>
      <p className= "message-text">{props.message}</p>
      <p className= "message-date">{props.time}
        <button onClick={handleClick} >
            {props.liked ? (<ThumbUpAltTwoToneIcon color="primary" style={{ fontSize: 17 }}/>) : (<ThumbUpAltOutlinedIcon style={{ fontSize: 20 }}/>) } 
        </button>
      </p>
    </div>
  );
}

export default Message;
