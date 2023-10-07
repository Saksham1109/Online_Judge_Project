import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Navbar,Nav,NavDropdown } from 'react-bootstrap'
function NavigationBar() {
  return (
    <div>
     <Navbar bg="primary" expand="md">  
      <Navbar.Brand as={Link} to ="/">Online Judge</Navbar.Brand>  
      <Navbar.Toggle aria-controls="basic-navbar-nav" />  
      <Navbar.Collapse id="basic-navbar-nav">  
        <Nav className="me-auto">  
          <Nav.Link as={Link} to="/">Home</Nav.Link>  
          {/* <Nav.Link as={Link} to="/viewproblems">Problems</Nav.Link>   */}
          <Nav.Link as={Link} to ="/signin">Register/Sign-In</Nav.Link>  
          <Nav.Link as={Link} to ="/compilerscreen">Compiler Screen</Nav.Link>  
          <NavDropdown title="UserProfile" id="basic-nav-dropdown">  
            <NavDropdown.Item as={Link} to ="/viewProfile">View Profile</NavDropdown.Item>  
            <NavDropdown.Item as={Link} to ="/logout">Logout</NavDropdown.Item>  
          </NavDropdown>  
        </Nav>  
      </Navbar.Collapse>   
  </Navbar>  
    </div>
  )
}

export default NavigationBar