import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavigationBar></NavigationBar>

      <Routes>
        <Route path="/" element={<h1>Product Listings (Component)</h1>}></Route>
        <Route path="/add" element={<h1>Add  Product  (Component)</h1>}></Route>
        <Route path="/update" element={<h1>Update Product  (Component)</h1>}></Route>
        <Route path="/logout" element={<h1>Logout (Component)</h1>}></Route>
        <Route path="/profile" element={<h1>User Profile (Component)</h1>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
