import { useLocation,Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MainScreen from "../../screens/MainScreen";


const RequireAuth=()=>{

    const { auth } = useAuth();
    const {location} = useLocation();


    return (
        auth?.user 
        ? <MainScreen/>
        : <Navigate to = "/login" state={{from : location}} replace/>
    );
}

export default RequireAuth;
