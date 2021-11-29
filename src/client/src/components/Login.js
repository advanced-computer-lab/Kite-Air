import React from 'react'
import Link from '@mui/material/Link';


const Login = () => {
    return (
        <div style={{marginTop:"10vh"}}>
        
            <Link href="/admin">
                Admin
            </Link>
            <br/>
            <Link href="/pickSeats">
                User
            </Link>
        </div>
    )
}

export default Login
