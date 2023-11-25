import React, { useState } from 'react';
import axios from '../../api/axios';
import styles from './styles.module.css';
import { useAuth } from '../../context/AuthProvider';

function AddProblemModal({ closeModal }) {
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    description: '',
    difficulty: 'easy',
    testCases: [{ input: 1, output: 1 }]
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
      await axios.post('/problems/add', formData,{
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
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className={styles.title}>
          <h2>Add a new Problem here</h2>
        </div>
        <div className={styles.body}>
          <form onSubmit={handleSubmit}>
            {/* Add form fields */}
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder='Add The title'
              value={formData.title}
              onChange={handleChange}
              required
            />
            <label>Tag:</label>
            <input
              type="text"
              name="tag"
              placeholder='Add the related tag'
              value={formData.tag}
              onChange={handleChange}
              required
            />
            <label>Description:</label>
            <textarea
              name="description"
              placeholder='Add the Description'
              value={formData.description}
              onChange={handleChange}
              required
            />
            <label>Difficulty:</label>
            <select
              name="difficulty"
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
                  placeholder={`Input ${index + 1}`}
                  value={testCase.input}
                  onChange={(e) =>
                    handleTestCaseChange(index, 'input', e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder={`Output ${index + 1}`}
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
  );
}

export default AddProblemModal;