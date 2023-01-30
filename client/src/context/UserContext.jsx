import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { userSampleData } from '../utils/UserData'
import LoggedInUser from '../utils/LoggedInUser';
import {  } from '../api/Requests';

export const UserContext = React.createContext()

const initUserState = userSampleData

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initUserState)  

  useEffect(() => {
    const decodedUserData = LoggedInUser()
    
    if (decodedUserData) {
      const id = decodedUserData.id

      fetch(`http://localhost:4000/user/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.data);
        })
        .catch((error) => {
          console.log('error', error);
        }, []);
    }

  }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider> 
      );
}

export default UserContextProvider