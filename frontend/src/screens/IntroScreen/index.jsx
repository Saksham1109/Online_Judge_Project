import React, { useState } from 'react'
import Problem from '../../components/Problems';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import AddProblem from '..//../components/AddProblem';




function MainScreen() {
  const {token} =useAuth();
  const userRole=sessionStorage.getItem("role");
  const [openAddProblemModal,setOpenAddProblemModal]=useState(false);
  if(token)
{
  return(
    <div className={styles.mainScreenContainer}>
      { userRole==="admin" &&
        <div className={styles.addProblemButton}>
        <button onClick={()=>setOpenAddProblemModal(true)}>Add Problems</button>
        </div>}
        {openAddProblemModal && <div>
          <AddProblem closeModal={setOpenAddProblemModal} />
        </div>}
        <br></br>
    <div>
      <br></br>
    {Problem(token)}
    </div>
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