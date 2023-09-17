import React from 'react'
import {Link} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav' 
import Navbar from 'react-bootstrap/Navbar'
function NavigationBar() {
  return (
    <div >
      <Navbar className='nav-bar'> 
        <Navbar.Brand as={Link} to="/" style={{color:"black"}}>Online-Judge</Navbar.Brand> 
          <Nav.Link className='signInClass' as={Link} to="/signin" style={{color:"black"}}>SignIN</Nav.Link>
          <Nav.Link className='logoutClass' as={Link} to="/logout" style={{color:"black"}}>Log-out</Nav.Link>

        </Navbar>
    </div>
  )
}

export default NavigationBar