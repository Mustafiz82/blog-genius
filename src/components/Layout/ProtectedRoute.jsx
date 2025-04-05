"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FaChildReaching } from 'react-icons/fa6';

const ProtectedRoute = ({children}) => {
    const { data: session, status } = useSession();
    console.log(session);

    const router = useRouter()

    if(!session){
        return router.push("/login")
    }
    else{
        return children
    }
    

    
};

export default ProtectedRoute;