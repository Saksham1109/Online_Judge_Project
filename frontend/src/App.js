import './App.css';
import { AuthProvider } from './context/AuthProvider';
import {  Route, Routes, Navigate,BrowserRouter } from 'react-router-dom';

import IntroScreen from './screens/IntroScreen';
import Signup from './components/Signup';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import PrivateRoutes from './PrivateRoutes';
import CompilerScreen from './screens/CompilerScreen';
import Problem from './components/Problems';
import ViewProfile from './components/ViewProfile';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationBar/>
        <Routes>
          
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/signup' element={<Signup/>}></Route>
          <Route path='/' element={<PrivateRoutes><IntroScreen/></PrivateRoutes>}></Route>
          <Route path='/compilerScreen' element={<PrivateRoutes><CompilerScreen/></PrivateRoutes>}></Route>
          <Route path='/problems' element={<PrivateRoutes><Problem/></PrivateRoutes>}></Route>
          <Route path='/viewProfile' element={<PrivateRoutes><ViewProfile/></PrivateRoutes>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
