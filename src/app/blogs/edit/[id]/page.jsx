"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

import MainPage from '@/components/Create/MainPage';
import blogService from '@/Service';
import { IoWarningOutline } from 'react-icons/io5';

const Page = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const { data: session, status } = useSession();
    const params = useParams();
    const router = useRouter();

    const { id } = params;

    useEffect(() => {
        // Redirect if unauthenticated
        if (status === 'unauthenticated') {
            router.replace('/login');
        }
    }, [status, router]);

    useEffect(() => {
        // Fetch blog only if session exists
        const fetchBlog = async () => {
            if (!id || !session?.user?.email) return;

            try {
                setLoading(true);
                const res = await blogService.getSingleBlogs(id);
                setData(res?.data);
            } catch (err) {
                console.error("Failed to fetch blog:", err);
            } finally {
                setLoading(false);
            }
        };

        if (status === 'authenticated') {
            fetchBlog();
        }
    }, [id, session?.user?.email, status]);

    if (loading || !data) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <p>Loading...</p>
            </div>
        );
    }

    const isAuthor = session?.user?.email === data?.authorEmail;

    if (!isAuthor) {
        return (
            <div className="flex gap-2 flex-col text-center justify-center items-center h-[300px]">
                <IoWarningOutline className='text-6xl text-red-600' />
                <p className="font-semibold text-red-600">You are not authorized to edit this post.</p>
                <p>If you are the author, please login with the correct email or contact support.</p>
            </div>
        );
    }

    return (
        <div>
            <MainPage blogDataEdit={data} />
        </div>
    );
};

export default Page;
