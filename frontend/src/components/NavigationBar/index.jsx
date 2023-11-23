import React, { useEffect, useState,useRef } from 'react';
import styles from './styles.module.css';
import { Link,Navigate } from 'react-router-dom';


const NavigationBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    let menuRef=useRef();
    let userRole=sessionStorage.getItem("role");
    const handleLogout = () => {
      sessionStorage.clear();
      window.location.reload();
    };

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
      <div ref={menuRef} className={styles.dropdown}  >
        <button className={styles.dropdownToggle}  onClick={()=>setDropdownOpen(!dropdownOpen)} >
         Role : {userRole}
        </button>
        {dropdownOpen && (
          <ul className={styles.dropdownMenu} >
            <li className={styles.dropdownItem}>
              <Link to="/viewProfile">Profiles</Link>
            </li>
            <li className={styles.dropdownItem} onClick={handleLogout}> Logout </li>
          </ul>
        )}
      </div>
    </nav>
    
  );
  };
  
  export default NavigationBar;