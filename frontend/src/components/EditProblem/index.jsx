import React, { useState } from 'react';
import axios from '../../api/axios';
import styles from './styles.module.css';
import { useAuth } from '../../context/AuthProvider';
import Modal from 'react-modal';

function EditProblemModal({ closeModal,selectedProblem }) {

  Modal.setAppElement('#root');

  const [formData, setFormData] = useState({
    title: selectedProblem.title,
    tag: selectedProblem.tag,
    description: selectedProblem.description,
    difficulty: selectedProblem.difficulty,
    testCases: [{ input: 'Add new test cases', output: 'Add new test cases' }]
  });

  const {token} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...formData.testCases];
    updatedTestCases[index][field] = value;
    setFormData((prevData) => ({ ...prevData, testCases: updatedTestCases }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      // Send the payload using Axios
      await axios.post('/problems/edit/'+ selectedProblem._id,formData,{
        headers:{"Authorization":"Bearer "+token,email:sessionStorage.getItem("userId")}
      });

      // Close the modal after successful submission
      closeModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting the problem:', error);
    }
  };

  return (
    <Modal
      isOpen={true} // You can control the modal's visibility with a state
      onRequestClose={closeModal}
      contentLabel="Delete Problem Modal"
    >
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className={styles.title}>
          <h2>Edit Problem</h2>
        </div>
        <div className={styles.body}>
          <form onSubmit={handleSubmit}>
            {/* Add form fields */}
            <label>Title:</label>
            <input
              type="text"
              name="title"
              readOnly
              placeholder={selectedProblem.title}
              value={selectedProblem.title}
              required
              onChange={handleChange}
            />
            <label>Tag:</label>
            <input
              type="text"
              name="tag"
              placeholder={selectedProblem.tag}
              value={formData.tag}
              onChange={handleChange}
            />
            <label>Description:</label>
            <textarea
              name="description"
              placeholder={selectedProblem.description}
              value={formData.description}
              onChange={handleChange}
            />
            <label>Difficulty:</label>
            <select
              name="difficulty"
              placeholder={selectedProblem.difficulty}
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <label>Test Cases:</label>
            {formData.testCases.map((testCase, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Add new test cases while editing"
                  value={testCase.input}
                  onChange={(e) =>
                    handleTestCaseChange(index, 'input', e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder='Add new test cases while editing '
                  value={testCase.output}
                  onChange={(e) =>
                    handleTestCaseChange(index, 'output', e.target.value)
                  }
                />
              </div>
            ))}
            <button type="button" onClick={() => setFormData((prevData) => ({
              ...prevData,
              testCases: [...prevData.testCases, { input: '', output: '' }]
            }))}>
              Add Test Case
            </button>
            <button type="submit">Submit Problem</button>
            <button type="reset" onClick={()=>closeModal(false)}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
    </Modal>
  );
}

export default EditProblemModal;