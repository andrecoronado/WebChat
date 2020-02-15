import React, { useState }   from "react"
import Login from "./Login"
import Chat from "./Chat"
import api from '../api'

var page = ''
function App() {
    var [login, setLogin] = useState({
        username: "",
        password: "",
        confirmPassword:"",
        register: "",
        msg:"",
        status: false,
        messages: [],
        headerName: "Login | Register"
    });

    function setLogOff(){
        setLogin(prevLogin => {
            return { 
              ...prevLogin, 
              status: false,
              password: "",
              confirmPassword:"",
              messages: [],
              msg:"Please authenticate.",
              headerName: "Login | Register" 
            }})
            api.apiToken('')
            window.sessionStorage.success = false
    }
    
    if( !login.status ) {
        page = <Login 
            login = { login }
            setLogin = { setLogin }
                />  
    }
    else{
        page = <Chat 
            login = { login }
            setLogin = { setLogin } 
            setLogOff = { setLogOff }
            />  
    }

    return ( 
        <div>
            { page } 
        </div>
    );
}

export default App;