
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavigationBar></NavigationBar>

      <Routes>
        <Route path="/" element={<HomeScreen/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/logout" element={<h1>Logout (Component)</h1>}></Route>
        <Route path="/profile" element={<h1>User Profile (Component)</h1>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
