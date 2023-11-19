import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';



const Problem = (token) => {
  const PROBLEM_LIST='/problems/list';
  const PROBLEM_FETCH='/problems/findBy/';
  const [searchTerm, setSearchTerm] = useState('');
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const Navigate=useNavigate();
  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const { data: res } = await axios.get(PROBLEM_LIST,
				{
					headers:{'Authorization':'Bearer '+token},
					// withCredentials:true
				});
      setProblems(res.data);
      console.log(res.data);
      renderProblemList();
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  const handleSearch= async() => {
    try {
      var title=searchTerm;
      if(title){
      const {data: res} =  await axios.get(PROBLEM_FETCH+title,
				{
					headers:{'Authorization':'Bearer '+token}
				});
        setProblems(res);
        if(res)
        {
          renderProblemListBasedOnSearch();
        }
      }
    } catch (error) {
      console.error('Error searching problems:', error);
    }
  };

  const renderProblemList = () => {
    console.log(problems);
    return (
      <div className={styles.problem_table}>
          <table>
              <tr>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Status</th>
                  <th>Attempt</th>
              </tr>
              {problems.map((problem) => {
                  return (
                      <tr key={problem._id}>
                          <td>{problem.title}</td>
                          <td>{problem.tag}</td>
                          <td>{problem.status}</td>
                          <td><button onClick={() => {Navigate('/compilerScreen', {state: {problemId: problem._id}})}}>Attempt</button> </td>
                      </tr>
                  )
              })}
          </table>
      </div>
  );
  };
  const renderProblemListBasedOnSearch = () => {
    return (
      <div className={styles.problem_table}>
          <table>
              <tr>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Status</th>
                  <th>View/Attempt</th>
              </tr>
              {problems.map((problem) => {
                  return (
                      <tr key={problem._id}>
                          <td>{problem.title}</td>
                          <td>{problem.tag}</td>
                          <td>{problem.status}</td>
                          <td><button onClick={() => {Navigate('/compilerScreen', {state: {problemId: problem._id}})}}>Attempt</button> </td>
                      </tr>
                  )
              })}
          </table>
      </div>
  );
  };

  const renderProblemDetails = () => {
    if (selectedProblem) {
      return (
        <div className={styles.problemDetails}>
          <h2>{selectedProblem.title}</h2>
          <p>Tags: {selectedProblem.tag.join(', ')}</p>
          <p>{selectedProblem.description}</p>
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
      <div>
      {renderProblemList()}
      {renderProblemDetails()}
      </div>
    </div>
  );
};

export default Problem;
