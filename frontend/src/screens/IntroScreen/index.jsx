import React, { useState } from 'react'
import Problem from '../../components/Problems';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import AddProblem from '..//../components/AddProblem';
import DeleteProblem from '../../components/DeleteProblem';
import EditProblem from '../../components/EditProblem';




function MainScreen() {
  const {token} =useAuth();
  const userRole=sessionStorage.getItem("role");
  const [openAddProblemModal,setOpenAddProblemModal]=useState(false);
  const [openEditProblemModal,setEditAddProblemModal]=useState(false);
  const [openDeleteProblemModal,setOpenDeleteProblemModal]=useState(false);
  if(token)
{
  return(
    <div className={styles.mainScreenContainer}>
      <br></br>
      { userRole==="admin" &&
        <div className={styles.addProblemButton}>
        <button onClick={()=>setOpenAddProblemModal(true)}>Add Problems</button>
        </div>}
        {openAddProblemModal && <div>
          <AddProblem closeModal={setOpenAddProblemModal} />
        </div>}
        <br></br>
        
        { userRole==="admin" &&
        <div className={styles.addProblemButton}>
        <button onClick={()=>setEditAddProblemModal(true)}>Edit Problem</button>
        </div>}
        {openEditProblemModal && <div>
          <EditProblem closeModal={setEditAddProblemModal} />
        </div>}
        <br></br>

        { userRole==="admin" &&
        <div className={styles.addProblemButton}>
        <button onClick={()=>setOpenDeleteProblemModal(true)}>Delete Problem</button>
        </div>}
        {openDeleteProblemModal && <div>
          <DeleteProblem closeModal={setOpenDeleteProblemModal} />
        </div>}
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