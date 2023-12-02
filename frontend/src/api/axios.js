import axios from 'axios';

// NODE_ENV ='develop'
// NODE_ENV = 'production'

// if we are in prod baseURL='' 
// if we are in develop the baseURL='http://localhost:5000'

//final commit



const baseURL=process.env.NODE_ENV==='production'? "http://65.2.186.106:5000/" : "http://localhost:5000" ;

export default axios.create(
    {
        baseURL:baseURL,
    }
)
