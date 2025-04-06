import { getBlogCreationDate } from '@/Helper/extractDate';
import { extractDescription } from '@/Helper/extractDesctiption';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";

const VerticalCard = ({ item, hideDesc, quality, edit }) => {


    console.log(hideDesc);



    return (
        <Link href={`/blogs/${item?._id}`}>
            <div className="group  w-full mx-auto  font-sans">
                <div className="relative overflow-hidden">
                    <Image
                        src={item?.thumbnail}
                        alt={item?.title}
                        width={600}
                        height={400}
                        unoptimized
                        quality={quality || 30}
                        style={{ objectFit: "cover" }} // Replace deprecated `objectFit`
                        className="block aspect-video object-cover group-hover:scale-110 duration-500 w-full"
                    />
                    <span className="absolute bottom-2 left-2 bg-primary text-white text-xs uppercase px-2 py-1">
                        {item?.category}
                    </span>

                    {edit && <div className='absolute w-full top-4  px-4 flex justify-between items-center '>
                        <MdDelete className='text-4xl p-2 text-white bg-red-500 rounded-full' />
                        <Link  href={`/blogs/edit/${item?._id}`}>
                        <FaEdit  className='text-4xl p-2 text-white bg-primary rounded-full' /></Link>

                    </div>
                    }
                </div>
                <div className="py-5">
                    <h2 className="text-xl line-clamp-2 font-semibold  mb-2">{item?.title}</h2>
                    <p className="text-sm text-gray-600 mb-3">
                        BY <span className='text-purple-500'>{item?.authorName}</span> - {getBlogCreationDate(item?.id)}
                    </p>
                    {!hideDesc && <p hidden={hideDesc} className={` leading-relaxed text-sm line-clamp-3 `}>{item ? extractDescription(item) : ""}</p>}
                </div>
            </div>
        </Link>
    );
};

export default VerticalCard;