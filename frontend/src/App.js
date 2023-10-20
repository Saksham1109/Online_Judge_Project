
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import CompilerScreen from './screens/CompilerScreen';
import Register from './screens/Register';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route exact path='/' element={<HomeScreen/>}></Route>
            <Route exact path='/signin' element={<SignIn/>}></Route>
            <Route exact path='/compilerScreen' element={<CompilerScreen/>}></Route>
            <Route exact path='/register' element={<Register/>}></Route>
          </Routes>
      </div>    
    </BrowserRouter>
  );
}

export default App;
