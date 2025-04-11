"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { getBlogCreationDate } from '@/Helper/extractDate';
import { extractDescription } from '@/Helper/extractDesctiption';
import blogService from '@/Service';
import { memo } from 'react';
import { revalidateBlogs, revalidateBlogsCategories } from '@/app/actions';

const VerticalCard = ({ item, hideDesc = false, quality = 30, edit = false, authorEmail }) => {
  
    const handleDeleteBlog = async (e) => {
        e.stopPropagation();

        if (authorEmail !== item?.authorEmail) return;

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8e67e6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await blogService.deleteBlogs(item?._id);

                    if (res?.data?.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your blog has been deleted.",
                            icon: "success",
                            confirmButtonColor: "#8e67e6"
                        });
                        // Optional: trigger a callback to refresh the blog list
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: res?.data?.error || "Failed to delete the blog.",
                            icon: "error",
                            confirmButtonColor: "#8e67e6"
                        });
                    }
                } catch (error) {
                    console.error("Delete blog error:", error);
                    Swal.fire({
                        title: "Error!",
                        text: error?.response?.data?.error || "Something went wrong while deleting the blog.",
                        icon: "error",
                        confirmButtonColor: "#8e67e6"
                    });
                }
            }
        });
    };

    return (
        <div className="relative">
            <Link href={`/blogs/${item?._id}`}>
                <div className="group w-full mx-auto font-sans">
                    <div className="relative overflow-hidden">
                        <Image
                            src={item?.thumbnail}
                            alt={item?.title}
                            width={600}
                            height={400}
                            unoptimized
                            quality={quality}
                            style={{ objectFit: "cover" }}
                            className="block aspect-video object-cover group-hover:scale-110 duration-500 w-full"
                        />
                        <span className="absolute bottom-2 left-2 bg-primary text-white text-xs uppercase px-2 py-1">
                            {item?.category}
                        </span>
                    </div>
                    <div className="py-5">
                        <h2 className="text-xl line-clamp-2 font-semibold mb-2">{item?.title}</h2>
                        <p className="text-sm text-gray-600 mb-3">
                            BY <span className='text-purple-500'>{item?.authorName}</span> - {getBlogCreationDate(item?.id)}
                        </p>
                        {!hideDesc && (
                            <p className="leading-relaxed text-sm line-clamp-3">
                                {item ? extractDescription(item) : ""}
                            </p>
                        )}
                    </div>
                </div>
            </Link>

            {edit && authorEmail === item?.authorEmail && (
                <div className='absolute w-full top-4 px-4 flex justify-between items-center'>
                    <MdDelete onClick={handleDeleteBlog} className='text-4xl cursor-pointer p-2 text-white bg-red-500 rounded-full' />
                    <Link href={`/blogs/edit/${item?._id}`}>
                        <FaEdit className='text-4xl p-2 text-white bg-primary rounded-full' />
                    </Link>
                </div>
            )}


        </div>
    );
};

// ✅ Memoize the component to prevent unnecessary re-renders
export default memo(VerticalCard);
