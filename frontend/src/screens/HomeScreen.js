import React from 'react'
import { Navigate } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'

export default function HomeScreen() {
  return (
    <div>
        <div><NavigationBar/></div>

        <body>This is the body part</body>

        <div><Footer/></div>

    </div>
  )
}
