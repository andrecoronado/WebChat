import React from "react";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import { Container, Row, Col, OverlayTrigger, Tooltip }  from 'react-bootstrap';
import apis  from '../api'


function Header(props) {

  function handleClick() {
     apis.logout()
     props.setLogOff()
  }

  async function handleClickRefresh() {
    const getMessages = await apis.getMessages ()        
    props.setMessage(getMessages.data) 
 }

  return (
    <header>
      <Container fluid={true}>
        <Row >
          <Col xs={6} >
            <h1>
              <img  src="WebChat-Logo.png" alt="WebChat"/>  | Chatroom
                
            </h1>
          </Col>
          
            <Col xs={6} className="menu" >
              <p>Hello, {props.name}.</p>
               <OverlayTrigger
                  key={'bottom'}
                  placement={'bottom'}
                  overlay={<Tooltip id={`tooltip-bottom`}>Refresh</Tooltip>}
                >
                <div className="icon-menu" onClick={handleClickRefresh}>
                  <RefreshRoundedIcon  color="primary"/>
                </div>
              </OverlayTrigger> 

               <OverlayTrigger
                  key={'bottom'}
                  placement={'bottom'}
                  overlay={<Tooltip id={`tooltip-bottom`}>Logoff</Tooltip>}
                >
                <div className="icon-menu" onClick={handleClick}>
                  <PowerSettingsNewIcon  color="secondary"/>
                </div>
              </OverlayTrigger>    
            
            </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;