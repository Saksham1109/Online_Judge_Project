// ViewProfile.js

import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import styles from './styles.module.css';
import { useAuth } from "../../context/AuthProvider";
import ReactSwitch from 'react-switch';
const ViewProfile = ({ userId }) => {
  const [userData, setUserData] = useState([]);
  const[userRole,setRole]=useState('user');
  const [isAdmin, setIsAdmin] = useState(false);
  const {token}=useAuth();
  const loggedInUserEmail={email:sessionStorage.getItem("userId")};

  useEffect(() => {
    const fetchAllUserDetails=async()=>{
        try{
            const {data: res} = await axios.get('/user/getAllUsers',
                {
                    headers:{'Authorization':'Bearer '+token}
                });
                console.log('res',res);
            setUserData(res.user);

        }catch(error){
            console.log('Error fetching all users',error);
        }
       
    };
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/user/getUser`,loggedInUserEmail,
        {
            headers:{'Authorization':'Bearer '+token}
        });
        setUserData(response.data);
        setIsAdmin(response.data.role === 'admin');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
    fetchAllUserDetails();
  }, [userId]);

  const handleToggleChange = async () => {
    try {
      const newRole = isAdmin ? 'user' : 'admin';
      await axios.post('/user/updateRole', {
        email: userData.email,
        toRole: newRole,
      });
      setIsAdmin(!isAdmin);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2>User Profile</h2>
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
              <ReactSwitch
                checked={user.role==='admin'?true:false}
                onChange={handleToggleChange}
                ></ReactSwitch>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProfile;
