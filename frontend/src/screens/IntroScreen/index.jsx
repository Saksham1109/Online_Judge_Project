import React from 'react'
import Problem from '../../components/Problems';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';




function MainScreen() {
  const {token} =useAuth();
  if(token)
{
  return(
    <div>
    {Problem(token)}
    </div>
    
  )
}
else{

  return (
    <div>
      <div className={styles.intro}>
      Hi!, If you are not logged in Please <Link to='/login'>signIn/register</Link> here!
      </div>
    </div>
  )
}
}

export default MainScreen;