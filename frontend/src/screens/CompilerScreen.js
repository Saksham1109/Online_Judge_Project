import React,{useState} from 'react'
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';


function CompilerScreen() {

    const[code,setCode] = useState('');
    const[language,setLanguage] = useState('cpp');
    const[output,setOutput] = useState('');

    
    const handleSubmitRun  = async()=> {
        
        const payload = {
            language,
            code
        };
        try{
            const {data}=  await axios.post("http://localhost:5000/run",payload);
            console.log(data);
            console.log("The error is ");

            setOutput(data.jobId);
    
        }
        catch({response})
        {
            if(response)
            {
                console.log("The Error is ")
                console.log(response);
                setOutput(response.output.message)
            }
            else
            {
                setOutput("Compilation Issues, please check your code");
            }
        }
        
    }

    const handleSubmit= () =>
    {
        console.log('submit');
    }




  return (
    <div className='compilerScreen'>
        <NavigationBar></NavigationBar>
        <h1>Online Code Compiler</h1>
       <div className='question-box'>
       <div className='question-area'>
            This is going to be the querstion area

        </div>
        <div className='text-area' >
        <label>Choose Language ( default C++):</label>
               <select value={language} onChange={(e)=> { setLanguage(e.target.value)}} >
                <option value='cpp'>C++</option>
                <option value='py'>Python</option>
            </select>
            <br></br>
            <br></br>
        <textarea rows="20" cols="75" value={code} onChange={(e)=>{
            setCode(e.target.value);
        }} ></textarea>
        <br></br>
        <button onClick={handleSubmitRun}>Run</button>
        <button onClick={handleSubmit}>Submit</button>
        <div className='output'>
            {output}
        </div>
        </div>

       </div>
        
        
        </div>
  )
}

export default CompilerScreen