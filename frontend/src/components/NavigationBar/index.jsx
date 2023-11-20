import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link,Navigate } from 'react-router-dom';


const NavigationBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
    const handleLogout = () => {
      sessionStorage.clear();
      window.location.reload();
  };
  
    return (
    <nav className={styles.navbar}>
      <div className={styles.navbrand}> <Link to="/">Online Compiler</Link></div>
      <ul className={styles.navlist}>
         {/*<li className={styles.navitem}>
          <Link to="/problems">Problems</Link>
          </li> */}
      </ul>
      <div className={styles.dropdown}>
        <button className={styles.dropdownToggle} onClick={toggleDropdown}>
          View Profile
        </button>
        {dropdownOpen && (
          <ul className={styles.dropdownMenu}>
            <li className={styles.dropdownItem}>
              <Link to="/viewProfile">My Profile</Link>
            </li>
            <li className={styles.dropdownItem} onClick={handleLogout}> Logout </li>
          </ul>
        )}
      </div>
    </nav>
    
  );
  };
  
  export default NavigationBar;