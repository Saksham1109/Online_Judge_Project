import {React,useState} from 'react';
import axios from '../../api/axios';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import {useAuth} from '../../context/AuthProvider';
import ViewProblem from '../../components/ViewProblem';

function CompilerScreen() {
    const location = useLocation();

    const{token}=useAuth();
    const[code,setCode] = useState('');
    const[language,setLanguage] = useState('cpp');
    const[output,setOutput] = useState('');
    const[outputStatus,setOutputStatus]=useState(''); 
    const problemId=location.state.problemId; 
    const email=sessionStorage.getItem("userId");
    const handleSubmitRun  = async()=> {
        
        const payload = {
            language,
            code,
            problemId,
            email
        };
        try{
            const {data}=  await axios.post("/compiler/submit",payload,
            {
                headers:{'Authorization':'Bearer '+token}

            });
            console.log("The data is");
            console.log(data); 
            setOutput(data.message);
            if(data.status)
            {
                setOutputStatus("Accepted");
            }
            else{
                setOutputStatus("Validation Failed");
            }
                      

        }
        catch({response})
        {
            if(response)
            {
                console.log("the error is ");
                console.log(response.data);
                setOutput(response.data.stderr);
                setOutputStatus("Error");
            }
            else
            {
                setOutput("Compilation Issues, please check your code");
                setOutputStatus("Error");
            }
        }
        
    }
  return (
    <div className='compilerScreen'>
        <h1>Online Code Compiler</h1>
       <div className='question-box'>
       <div className='question-area'>
            <ViewProblem problem1={location.state.problemId}></ViewProblem>
        </div>
        <div className='text-area' >
        <label>Choose Language (default C++):</label>
               <select value={language} onChange={(e)=> { setLanguage(e.target.value)}} >
                <option value='cpp'>C++</option>
                <option value='py'>Python</option>
                <option value='java'>Java</option>
            </select>
            <br></br>
            <br></br>
        <textarea rows="20" cols="75" value={code} onChange={(e)=>{
            setCode(e.target.value);
        }} ></textarea>
        <br></br>
        <button onClick={handleSubmitRun}>Submit</button>
        <br></br>
        Output:: {outputStatus}
        <div className='output'>
            {output}
        </div>
        </div>
       </div>
        </div>
  )
}

export default CompilerScreen;