import React,{useState} from 'react'
import NavigationBar from '../components/NavigationBar'
import axios from 'axios';


function CompilerScreen() {

    const[code,setCode] = useState('');
    const[language,setLanguage] = useState('cpp');
    const[output,setOutput] = useState('');
    const[outputStatus,setOutputStatus]=useState('');

    
    const handleSubmitRun  = async()=> {
        
        const payload = {
            language,
            code
        };
        try{
            const {data}=  await axios.post("http://localhost:5000/run",payload);
            console.log("The data is");
            console.log(data);
            let intervalId;
            let int=0;

            intervalId=setInterval(async()=>{
                const {data : dataRes} = await axios.get("http://localhost:5000/status",{params:{id:data.jobId}});
                const{success, job, error} = dataRes;
                console.log(dataRes);
                if(success)
                {
                    const {status:jobStatus, output:jobOutput} = job;
                    console.log(job);
                    if(jobStatus==="pending") return;
                    setOutput(jobOutput);
                    setOutputStatus("Success");
                    clearInterval(intervalId);
                    int++;
                }
                else
                {
                    console.log(error);
                    clearInterval(intervalId);
                    setOutput(error.stderr);
                    setOutputStatus("Error");
                }
                if(int==10)
                {
                    clearInterval(intervalId);
                }

            },1000);
            

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

export default CompilerScreen