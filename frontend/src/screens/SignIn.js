import axios from 'axios';
import React,{useState} from 'react'


const[email,setEmail] = useState('');
const[password,setPassword] = useState('');

 const handleSignIn = async() => 
 {
    const payload = {
        email,
        password
    }
    try
    {
        const {data} = await axios.post("http://localhost:5000/signin",payload);

    }
    catch (error)
    {

    }

 };


function SignIn() {
  return (
    <div className="container">
                <h2>Sign In</h2>
                <form onSubmit={handleSignIn}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) =>{setEmail(e.target.value)}}
                            type="email"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}}
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>
                    <button className="btn" type="submit">
                        Sign In !!
                    </button>
                </form>
            </div>
  )
}

export default SignIn
