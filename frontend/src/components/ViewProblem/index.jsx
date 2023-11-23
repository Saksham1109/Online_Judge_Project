// ViewProblem.js
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";


export default function ViewProblem({ problem1 }) {
  console.log("problem",problem1);
  const PROBLEM_FETCH='/problems/';
  const{token}=useAuth();
  const[getProblem,setProblem]=useState();

  // const[loading,setLoading]=useState(false);

  // Convert comma-separated tags string to an array if tags are defined
  useEffect(()=>{

    const fetchData= async()=>{
      // setLoading(true); 
      try {
        if(problem1){    
        const {data: res} = await axios.get(PROBLEM_FETCH+problem1,
                  {
                      headers:{'Authorization':'Bearer '+token}
                  });
          setProblem(res);
          console.log('res',res);
        }
      } catch (error) {
        console.error('Error searching problems:', error);
      }
      // setLoading(false);
    }
    fetchData();
  },[]);
    

    if(getProblem) {
      console.log("GetProblem",getProblem);
  return (
    <div>
      <br></br>
      <div className={styles.section}>
        <h2 className={styles.heading}>Title</h2>
        <p>{getProblem.title}</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Description</h2>
        <p>{getProblem.description}</p>
      </div>

      {getProblem.tag && (
        <div className={styles.section}>
          <h2 className={styles.heading}>Tags</h2>
          <div className={styles.tagsContainer}>
            {getProblem.tag.split(",").map((tag) => tag.trim()).map((e, index) => (
              <span key={index} className={styles.tag}>
                {e}
              </span>
            ))}
          </div>
        </div>
      )}
      

      <div className={styles.section}>
        <h2 className={styles.heading}>Test Cases</h2>
        <ul>
          {getProblem.testCases.map((testCase, index) => (
            <li key={index} className={styles.testCase}>
              <div>
                <span className={styles.testCaseInput}>Input:</span> {testCase.input}
              </div>
              <div>
                <span className={styles.testCaseOutput}>Output:</span> {testCase.output}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
}