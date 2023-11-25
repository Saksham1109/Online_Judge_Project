import React, { useEffect, useState,useRef } from 'react';
import styles from './styles.module.css';
import { Link,Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import axios from '..//../api/axios';

const NavigationBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [FullName,setFullName]=useState("FullName");
    let menuRef=useRef();
    let userRole=sessionStorage.getItem("role");
    const {token} =useAuth();
    const handleLogout = () => {
      sessionStorage.clear();
      window.location.reload();
    };

    const payload={email:sessionStorage.getItem("userId")};
    useEffect(()=>{
      console.log("token",token);
      console.log("payload",payload);
      const fetchUserDetails = async () => {
        try {
          const response = await axios.post(`/user/getUser`,payload,
          {
            headers:{'Authorization':'Bearer '+token}
            });
          console.log(response.data);
          setFullName(response.data.firstName+" "+response.data.lastName+" | ");
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    })

    useEffect(()=>{
      let handler = (e)=>{
        if(typeof menuRef.current !== "undefined")
        {
          
          if(!menuRef.current.contains(e.target)){
            setDropdownOpen(false);
            console.log(menuRef.current);
          } 
        }
                
      }
      document.addEventListener("mousedown",handler);

      return()=>{
        document.removeEventListener("mousedown",handler);
      }
    });
 
    
    return ( userRole &&
    <nav className={styles.navbar} ref={menuRef}>
      <div className={styles.navbrand}> <Link to="/">Online Compiler</Link></div>
      <div className={styles.UserName}> {FullName}</div>
      <div ref={menuRef} className={styles.dropdown}  >
        <button className={styles.dropdownToggle}  onClick={()=>setDropdownOpen(!dropdownOpen)} >
         Role : {userRole}
        </button>
        {dropdownOpen && (
          <ul className={styles.dropdownMenu} >
           {userRole==='admin' &&  <li className={styles.dropdownItem}>
              <Link to="/viewProfile">Profiles</Link>
            </li>

           }
            <li className={styles.dropdownItem} onClick={handleLogout}> Logout </li>
          </ul>
        )}
      </div>
    </nav>
    
  );
  };
  
  export default NavigationBar;