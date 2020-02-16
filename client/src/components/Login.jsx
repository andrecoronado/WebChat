import React from "react"
import apis  from '../api'
import Footer from "./Footer"
import { Container, Row, Col }  from 'react-bootstrap'

function Login(props)  {
  var headerName = "Login | Register"

  function  handleChange(event) {
    let { name, value } = event.target
    props.setLogin(prevLogin => {return {...prevLogin, [name]: value, status: false }})
  }
  
  const handleBlur = async () => {
      const getUser = await apis.getUserByName(props.login.username)
      getUser.data.success ? headerName = "Login" : headerName = "Register"
      props.setLogin(prevLogin => {
        return { 
          ...prevLogin, 
          register: getUser.data.success,
          msg:"",
          headerName: headerName
        }})
  }

  async function submitForm(event) {
    event.preventDefault()
    if(props.login.register === true && props.login.username !== ""){
        const loginUser = await apis.loginUser({"username": props.login.username, "password": props.login.password})
        if( loginUser.data.success ){
          apis.apiToken(loginUser.data.token)
          window.sessionStorage.success = true
          const getMessages = await apis.getMessages ()
          props.setLogin(prevLogin => {
            return { 
              ...prevLogin,
              password: "",
              confirmPassword:"", 
              msg: "Login done!",
              status: true,
              messages: getMessages.data
            }})
        }
        else{
          props.setLogin(prevLogin => {return { ...prevLogin,  msg: "Please, confirm your information."}})
        }
    }
    else{
      if(props.login.password === props.login.confirmPassword){
          const registerUser = await apis.createUser({"username": props.login.username,  "password": props.login.password})
          if( registerUser.data.success ){
            apis.apiToken(registerUser.data.token)
            window.sessionStorage.success = true
            const getMessages = await apis.getMessages ()
            props.setLogin(prevLogin => {
              return { 
                ...prevLogin, 
                password: "",
                confirmPassword:"", 
                msg: "Register done!",
                status: true,
                register: true,
                messages: getMessages.data
              }})
          }
        }  
      else{
        props.setLogin(prevLogin => {return { ...prevLogin,  msg: "Please, confirm your passwords."}})
      }   
    }
  }

  return (
      <section className = "login">     
        <Container fluid={true}>   
          <Row >
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="page-user">
                  <img  src="WebChat-Logo.png" alt="WebChat"/>
                  <h3>{ props.login.headerName }</h3>
                  <form className="form">
                    <input type="text" placeholder="username" onChange={handleChange} onBlur={handleBlur}  name="username" value={props.login.username} />
                    {props.login.register !== "" && (<input type="password" placeholder="Password" onChange={handleChange}  name="password" value={props.login.password}/>)}
                    {props.login.register === false && (<input  type="password" placeholder="Confirm Password" onChange={handleChange}  name="confirmPassword"/>)}
                    {props.login.register !== "" && (<button  onClick={submitForm}>{props.login.register ? "Login" : "Register"}</button>)}
                    {props.login.register === "" && (<button onClick={submitForm}>Check</button>)}
                    <h4> {props.login.msg}</h4>
                  </form>
              </div>
            </Col>
          </Row>
        </Container>
      <Footer />
    </section>)
}
export default Login;