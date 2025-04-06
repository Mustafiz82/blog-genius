"use client"
import MainPage from '@/components/Create/MainPage';
import blogService from '@/Service';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const { data: session, status } = useSession()
    const params = useParams()
    const router = useRouter()
    const { id } = params
    console.log(id);

    useEffect(() => {
        const handleFetchMyBlogs = async () => {
            setLoading(true)
            try {
                const res = await blogService.getSingleBlogs(id)
                setData(res?.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        handleFetchMyBlogs()
        // if (session?.user?.email === ) {
        // }
    }, [])


    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    console.log(data);

    
    if (loading || !data) {
        return null; // or a loading spinner
    }


    return (
        <div>
           {data && <MainPage blogDataEdit = {data} />}
        </div>
    );
};

export default page;