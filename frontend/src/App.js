
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route exact path='/' element={<HomeScreen/>}></Route>
            <Route exact path='/signin' element={<SignIn/>}></Route>
          </Routes>
      </div>    
    </BrowserRouter>
  );
}

export default App;
