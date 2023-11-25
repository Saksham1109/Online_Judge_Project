import React, { useState } from 'react';
import axios from '../../api/axios';
import styles from './styles.module.css';
import { useAuth } from '../../context/AuthProvider';

function DeleteProblemModal({closeModal,selectedProblem}) {
  const {token} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("selected Problem",selectedProblem);
      const data = await axios.delete('/problems/delete/'+selectedProblem.title,{
        headers:{"Authorization":"Bearer "+token,email:sessionStorage.getItem("userId")}
      });

      if(data)
      {
        closeModal(false);
      window.location.reload();
      }

      // Close the modal after successful submission
      closeModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting the problem:', error);
    }
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className={styles.title}>
          <h2>Delete Problem </h2>
        </div>
        <div className={styles.body}>
          <form onSubmit={handleSubmit}>
            {/* Add form fields */}
            <label>Title:</label>
            <input
              type="text"
              name="title"
              readOnly
              placeholder="Problem Title"
              value={selectedProblem.title}
            />
            <button type="submit">Delete</button>
            <button type="reset" onClick={()=>closeModal(false)}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteProblemModal;