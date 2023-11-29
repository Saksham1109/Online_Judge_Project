import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import DeleteProblem from '../../components/DeleteProblem';
import EditProblem from '../../components/EditProblem';

const Problem = (token) => {
  const PROBLEM_LIST = '/problems/list';
  const [searchTerm, setSearchTerm] = useState('');
  const [allProblems, setAllProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const userRole = sessionStorage.getItem('role');

  const [openEditProblemModal, setOpenEditProblemModal] = useState(false);
  const [openDeleteProblemModal, setOpenDeleteProblemModal] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    fetchAllProblems();
  }, []);

  const openEditProblemModalHandler = () => {
    if(openEditProblemModal)
    {
      closEditProblemModalHandler();
    }
    else{
      setOpenEditProblemModal(true);
    }
  };

  const closEditProblemModalHandler = () => {
    setOpenEditProblemModal(false);
  };

  const openDeleteProblemModalHandler = () => {
    if(openDeleteProblemModal)
    {
      closeDelteProblemModalHandler();
    }
    else{
      setOpenDeleteProblemModal(true);
    }
  };

  const closeDelteProblemModalHandler = () => {
    setOpenDeleteProblemModal(false);
  };

  const fetchAllProblems = async () => {
    const payload = { email:sessionStorage.getItem("userId")};
    try {
      const { data: res } = await axios.post(PROBLEM_LIST, payload,
        {
        headers: { 'Authorization': 'Bearer ' + token },
      });
      setAllProblems(res.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  useEffect(() => {
    // Handle filtering based on the search term
    const filtered = allProblems.filter((problem) =>
      problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProblems(filtered);
  }, [allProblems, searchTerm]);

  const renderProblems = () => {
    console.log(filteredProblems);
    return (
      <div className={styles.problem_table}>
        <table>
          <tr>
            <th>Title</th>
            <th>Tag</th>
            <th>Status</th>
            <th>Attempt / Edit / Delete </th>
          </tr>
          {filteredProblems.map((problem) => (
            <tr key={problem._id}>
              <td>{problem.title}</td>
              <td>{problem.tag}</td>
              <td>{problem.submissionStatus.status}</td>
              <td>
                <button
                  className={styles.button_Attempt}
                  onClick={() => {
                    Navigate('/compilerScreen', {
                      state: { problemId: problem._id },
                    });
                  }}
                >
                  Attempt
                </button>
                {userRole === 'admin' && (
                  <>
                    <button
                      className={styles.button_Edit}
                      onClick={() => {
                        setSelectedProblem(problem);
                        openEditProblemModalHandler(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.button_Delete}
                      onClick={() => {
                        setSelectedProblem(problem);
                        setOpenDeleteProblemModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  };

  return (
    <div className={styles.problemContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by Problem title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <br />
        {renderProblems()}
        {openEditProblemModal && (
          <div>
            <EditProblem closeModal={openEditProblemModalHandler} />
          </div>
        )}
        {openDeleteProblemModal && (
          <div className={styles.delete_popup}>
            <DeleteProblem
              closeModal={openDeleteProblemModalHandler}
              selectedProblem={selectedProblem}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem;
