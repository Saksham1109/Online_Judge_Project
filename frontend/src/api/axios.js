import axios from 'axios';

// NODE_ENV ='develop'
// NODE_ENV = 'production'

// if we are in prod baseURL='' 
// if we are in develop the baseURL='http://localhost:5000'



const baseURL=process.env.NODE_ENV==='production'? "https://online-judge-project.vercel.app" : "http://localhost:5000" ;

export default axios.create(
    {
        baseURL:baseURL,
    }
)
