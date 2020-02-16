import React, { useState } from "react";
import Header from "./Header";
import Message from "./Message";
import CreateArea from "./CreateArea";
import Footer from "./Footer"
import api from '../api'

function Chat(props)  {

    const [message, setMessage] = useState(props.login.messages);

    async function addMessage(newMessage) {
      const createMessage = await api.createMessage(newMessage)
        .catch(function (error) { if( error.response.status === 401 ){ props.setLogOff() } })
      if ( createMessage ) { 
        newMessage._id = createMessage.data._id
        setMessage(prevMessage => {
          const msg = [newMessage, ...prevMessage];
          return msg.reverse();
        })
      }     
    } 
     
    return (
      <section className = "chat">
        <Header 
          setLogOff = { props.setLogOff }
          name = { props.login.username }
          setMessage = { setMessage } 
        />
        <CreateArea onAdd={addMessage} 
                    username={props.login.username}
        />
        <div className = "chat-space"> 
          {message.reverse().map((messageItem, index) => {
            return (
                <Message
                key = { index }
                id = { index }
                _id = { messageItem._id }
                user = { props.login.username }
                username = { messageItem.username }
                message = { messageItem.message }
                time = { messageItem.datetime }
                liked = { messageItem.liked }
                setLogOff = { props.setLogOff }
                setMessage = { setMessage } 
                />
            );
            })}
        </div>
        <Footer />
      </section>
      
    )
}
export default Chat;