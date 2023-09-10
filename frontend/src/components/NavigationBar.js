import React from 'react'
import {Link} from 'react-router-dom'
function NavigationBar() {
  return (
    <div className='nav-bar'>
        <li>
            <ul Link to="/">Home</ul>
            <ul Link to="/">Problem List</ul>
            <ul Link to="/">User Profile</ul>

        </li>

    </div>
  )
}

export default NavigationBar