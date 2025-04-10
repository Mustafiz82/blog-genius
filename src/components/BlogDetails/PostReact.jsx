import blogService from '@/Service';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const PostReact = ({ id }) => {
    const [reacted, setReacted] = useState(false);
    const [reactCountState, setReactCountState] = useState(0);

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const handleCheckReactStatus = async () => {
            if (!session?.user?.email) return;

            try {
                const res = await blogService.getReactStatus({
                    id,
                    email: session.user.email
                });

                if (res?.data?.userReact) setReacted(true);
                setReactCountState(res?.data?.reactCount || 0);
            } catch (error) {
                console.error("Failed to fetch reaction status:", error);
            }
        };

        handleCheckReactStatus();
    }, [session?.user?.email]);

    const handleReact = async () => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
            return;
        }

        // Optimistic update
        const previousReacted = reacted;
        const previousCount = reactCountState;

        setReacted(!previousReacted);
        setReactCountState(prev => prev + (previousReacted ? -1 : 1));

        try {
            const res = await blogService.patchReact(id, {
                email: session?.user?.email
            });

            // You can validate here if needed (optional)
            if (res?.data?.message === "Reaction added" && !previousReacted) {
                // All good
            } else if (res?.data?.message === "Reaction removed" && previousReacted) {
                // All good
            } else {
                // Something went wrong, revert
                setReacted(previousReacted);
                setReactCountState(previousCount);
            }
        } catch (error) {
            // Rollback on error
            console.error("Failed to toggle reaction:", error);
            setReacted(previousReacted);
            setReactCountState(previousCount);
        }
    };

    return (
        <div className={`flex items-center gap-2 ${reacted ? "text-primary" : "text-gray-700"}`}>
            <FaHeart
                onClick={handleReact}
                title={reacted ? "Remove Reaction" : "React to Post"}
                className={`cursor-pointer transition-transform duration-300 ${
                    reacted ? "text-primary scale-125" : "text-gray-700 scale-100"
                }`}
            />
            <span>{reactCountState}</span>
        </div>
    );
};

export default PostReact;
