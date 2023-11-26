import React, { useState } from 'react';
import Modal from 'react-modal'; // Import the Modal component
import Problem from '../../components/Problems';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import AddProblem from '../../components/AddProblem';

Modal.setAppElement('#root'); // Set the root element for the modal

function MainScreen() {
  const { token } = useAuth();
  const userRole = sessionStorage.getItem('role');
  const [openAddProblemModal, setOpenAddProblemModal] = useState(false);

  const openAddProblemModalHandler = () => {
    setOpenAddProblemModal(true);
  };

  const closeAddProblemModalHandler = () => {
    setOpenAddProblemModal(false);
  };

  if (token) {
    return (
      <div className={styles.mainScreenContainer}>
        {userRole === 'admin' && (
          <div className={styles.addProblemButton}>
            <button onClick={openAddProblemModalHandler}>Add Problems</button>
          </div>
        )}
        <Modal
          isOpen={openAddProblemModal}
          onRequestClose={closeAddProblemModalHandler}
          contentLabel="Add Problem Modal"
        >
          <div>
            <AddProblem closeModal={closeAddProblemModalHandler} />
          </div>
        </Modal>
        <br />
        {Problem(token)}
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.intro}>
          Hi!, If you are not logged in Please <Link to="/login">signIn/register</Link> here!
        </div>
      </div>
    );
  }
}

export default MainScreen;
