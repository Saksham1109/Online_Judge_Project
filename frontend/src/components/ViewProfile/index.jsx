// ViewProfile.js

import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import styles from './styles.module.css';
import { useAuth } from "../../context/AuthProvider";
import ReactSwitch from 'react-switch';
const ViewProfile = ({ userId }) => {
  const [userData, setUserData] = useState();
  const[userRole,setRole]=useState('user');
  const [isAdmin, setIsAdmin] = useState(false);
  const {token}=useAuth();
  const loggedInUserEmail={email:sessionStorage.getItem("userId")};

  const fetchAllUserDetails = async () => {
    try {
      console.log("get all users here");
      const response = await axios.get('/user/getAllUsers', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      console.log("response is",response.data)
      const data = response.data.map((item) => ({
        _id: item._id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        role: item.role
      }));

      setUserData(data);
    } catch (error) {
      console.log('Error fetching all users', error);
    }
  };


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("payload", loggedInUserEmail);
        const response = await axios.post(`/user/getUser`, loggedInUserEmail, {
          headers: { 'Authorization': 'Bearer ' + token }
        });

        const userDetail = {
          _id: response.data._id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          role: response.data.role
        };

        setUserData([userDetail]);
        setIsAdmin(userDetail.role === 'admin');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
    fetchAllUserDetails();
  },[]);

  const handleToggleChange = async (email,role) => {
    try {
      console.log("email  -------------",email);
      console.log("role -----------------",role);
      const newRole = role==="admin" ? 'user' : 'admin';
      const response = await axios.post('/user/updateRole', {
        email: email,
        toRole: newRole
      },{
        headers: { 'Authorization': 'Bearer ' + token }});
      console.log("response for update role",response);

      fetchAllUserDetails();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
    
  };

  return ( userData && isAdmin &&
    <div className={styles.profileContainer}>
      <br></br><br></br><br></br><br></br><br></br>
      <h2 className={styles.header}> All Profiles</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Update Role</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.email}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
              {user.email!==loggedInUserEmail.email &&  
              <ReactSwitch
                checked={user.role === 'admin'}
                onChange={() => handleToggleChange(user.email,user.role)}
                ></ReactSwitch>
              }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProfile;
