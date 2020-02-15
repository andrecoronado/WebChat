import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [message, setMessage] = useState({
    username: props.username,
    message: "",
    datetime: "",
    liked: false,
    _id:""
  });

  function Now(){
    const d = new Date()
    const y = d.getFullYear().toString()
    const m = (d.getMonth()+1).toString().length===2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString()
    const day = (d.getDate().toString().length===2?d.getDate().toString():"0"+d.getDate().toString())
    const h = (d.getHours().toString().length===2?d.getHours().toString():"0"+d.getHours().toString())
    const min = d.getMinutes().toString().length===2?d.getMinutes().toString():"0"+d.getMinutes().toString()
    const date_format_str = y + "-" + m + "-" + day + " " + h + ":" + min
    return date_format_str
}

  function handleChange(event) {
    const { name, value } = event.target;

    setMessage(prevNote => {
      return {
        ...prevNote,
        [ name ] : value,
        datetime: Now()
      };
    });
  }

  function submitMessage(event) {
    props.onAdd(message);
    setMessage(prevNote => {
      return {
        ...prevNote,
        message: "",
        datetime: ""
      };
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-message">
        <textarea
          name="message"
          onClick={expand}
          onChange={handleChange}
          value={message.message}
          placeholder="Take a message..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitMessage}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;