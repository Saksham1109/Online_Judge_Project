import React from 'react'
import { Navigate } from 'react-router-dom';
import styles from './styles.module.css';
import {useAuth} from '../context/AuthProvider';

const PrivateRoutes = ({ children }) => {
  console.log("yahan pe1");
  const { token } = useAuth(); 
  console.log("yahan pe");
  console.log(token);
 
  return token ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoutes;