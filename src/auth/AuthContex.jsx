import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContex = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null);
    const navigate = useNavigate()
    
    const login = (username, password)=>{
        if(username ==="admin" && password ==="admin"){
            setUser(username);
            navigate("/trending")
        }else{
            alert('Invalid Credential')
        }
    }

    const logout = ()=>{
        setUser(null);
        navigate('/login')
    }

  return (
    <AuthContex.Provider value={{user, login, logout}}>
        {children}
    </AuthContex.Provider>
  )
}

export const useAuth =()=> useContext(AuthContex)