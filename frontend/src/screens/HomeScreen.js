import React from 'react'
import { Link } from 'react-router-dom'
import ListOfOProblems from '../components/ListOfOProblems'
import NavigationBar from '../components/NavigationBar'

export default function HomeScreen() {
  return (
    <div>
      <NavigationBar></NavigationBar>
        <div className="introduction">
            Hello!, <br/>
            If you have not registered, please please <Link to="/register">Register here</Link>., <br></br>
            if already registered, please <Link to="/signin">sign in</Link>.
            </div>
            <ListOfOProblems/>
    </div>
  )
}
