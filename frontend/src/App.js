
import './App.css';
import {  Route, Routes, Navigate } from 'react-router-dom';

import MainScreen from './screens/MainScreen';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {

  const user = localStorage.getItem("token");
  console.log("the user is ");

  return (
      <Routes>
        {user && <Route exact path='/' element={<MainScreen/>}></Route>}
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route exact path="/" element={<Navigate replace to="/login" />}></Route>
      </Routes>
  );
}

export default App;
 