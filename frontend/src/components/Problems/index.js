import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const Problem = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/problems/list`); 
      setProblems(response.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/problems?title=${searchTerm}`);
      setProblems(response.data);
    } catch (error) {
      console.error('Error searching problems:', error);
    }
  };

  const handleViewProblem = (problem) => {
    setSelectedProblem(problem);
  };

  const handleAttemptProblem = (problemId) => {
    // You can implement the routing logic to the compiler screen here
    // e.g., using react-router-dom
    // history.push(`/compiler/${problemId}`);
  };

  const renderProblemList = () => {
    return problems.map((problem) => (
      <div key={problem.id} className={styles.problemCard}>
        <h2>{problem.title}</h2>
        <p>Tags: {problem.tags.join(', ')}</p>
        <button onClick={() => handleViewProblem(problem)}>View</button>
        <button onClick={() => handleAttemptProblem(problem.id)}>Attempt</button>
      </div>
    ));
  };

  const renderProblemDetails = () => {
    if (selectedProblem) {
      return (
        <div className={styles.problemDetails}>
          <h2>{selectedProblem.title}</h2>
          <p>Tags: {selectedProblem.tags.join(', ')}</p>
          <p>{selectedProblem.description}</p>
          {/* Render test cases and other problem details here */}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.problemContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {renderProblemList()}
      {renderProblemDetails()}
    </div>
  );
};

export default Problem;
