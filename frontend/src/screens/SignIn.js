import axios from 'axios';
import React,{useState} from 'react';

function SignIn() {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[output,setOutput] = useState('');

        const handleSignIn =async() => 
        {
            console.log(email)
            const payload = {
                email,
                password
            };
            try
            {
                const {data} = await axios.post("http://localhost:5000/signin",payload);
                console.log("post api end");
                console.log(data);   
                setOutput(data.message);
            }
            catch ({response})
            {
                if(response)
            {
                console.log("the error is ");
                console.log(response.data);
                setOutput(response.data.message);
            }
            else
            {
                setOutput("Compilation Issues, please check your code");
            }
            }

        };



  return (
    <div className="container-singin">
                <h1>Sign In</h1>
                <form onSubmit={handleSignIn} >
                    <div className="input-group">
                        <label htmlFor="email">Email: </label>
                        <input onChange={(e) =>{setEmail(e.target.value)}}
                            type="email"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password : </label>
                        <input onChange={(e)=>{setPassword(e.target.value)}}
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>
                    <button className="btn" type="submit" >
                        Sign In !!
                    </button>
                </form>
                <div className='output' >
                    Result : {output}
                </div>
            </div>
  )
}

export default SignIn
