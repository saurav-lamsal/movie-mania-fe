import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContex'

const Login = () => {
    const {login} = useAuth() // using the Context Api
    const [username, setUsername] = useState();
    const [password, setPassword]= useState();

    const handleSubmit=(e)=>{   
        e.preventDefault(); //keeps the form data when login fail 
        login(username, password) 
    }
  return (
<div className='flex items-center justify-center bg-gray-900 text-white'>
    <form onSubmit={handleSubmit} className='bg-gray-800 p-6 rounded-lg shadow-lg w-80'>
        <h2>Login...!!</h2>
        <input type='text' placeholder='Username...' onChange={(e)=> setUsername(e.target.value)} />
        <input type='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)}/>
        <button>
            Login
        </button>
    </form>
</div>
  )
}

export default Login