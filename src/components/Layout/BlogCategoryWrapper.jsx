'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogCategoryWrapper({ children }) {
    const router = useRouter();

    useEffect(() => {
        const justPublished = sessionStorage.getItem("justPublishedOrUpdatedBlog");
        if (justPublished) {
            sessionStorage.removeItem("justPublishedOrUpdatedBlog"); // clear flag
            router.refresh(); // only refresh this one time
        }
    }, []);

    return <>{children}</>;
}
