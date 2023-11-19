import React from 'react'
import { Navigate } from 'react-router-dom';
import styles from './styles.module.css';
import {useAuth} from '../context/AuthProvider';

const PrivateRoutes = ({ children }) => {
  const { token } = useAuth();  
  return token ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoutes;