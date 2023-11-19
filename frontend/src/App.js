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
          {/* <Route
            path="/problems/add"
            element={
              <PrivateRoutes>
                <AddProblem />
              </PrivateRoutes>
            }
          />
          <Route
            path="/problems/list"
            element={
              <PrivateRoutes>
                <ProblemList />
              </PrivateRoutes>
            }
          />
          <Route
            path="/problems/:problemId"
            element={
              <PrivateRoutes>
                <ProblemDetails />
              </PrivateRoutes>
            }
          />
          <Route
            path="/problems/edit/:problemId"
            element={
              <PrivateRoutes>
                <ProblemEdit />
              </PrivateRoutes>
            }
          />
          <Route
            path="/submissions/history"
            element={
              <PrivateRoutes>
                <ProblemSubmissions />
              </PrivateRoutes>
            }
          />
          <Route
            path="/submissions/leaderBoard"
            element={
              <PrivateRoutes>
                <LeaderBoard />
              </PrivateRoutes>
            }
          /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
