import Image from 'next/image';

const VerticalCard = ({ item , hideDesc }) => {
    return (
        <div className="group  w-full mx-auto  font-sans">
            <div className="relative overflow-hidden">
                <Image
                    src={item?.image}
                    alt={item?.title}
                    width={600} // Adjust as needed
                    height={400} // Adjust as needed
                    layout="responsive"
                    objectFit="cover"
                    className="block group-hover:scale-110 duration-500 w-full"
                />
                <span className="absolute bottom-2 left-2 bg-primary text-white text-xs uppercase px-2 py-1">
                    {item?.category}
                </span>
            </div>
            <div className="py-5">
                <h2 className="text-xl lg:text-2xl font-semibold  mb-2">{item?.title}</h2>
                <p className="text-sm text-gray-600 mb-3">
                    BY <span className='text-purple-500'>{item?.author}</span> - {item?.date}
                </p>
                <p hidden={hideDesc} className={` leading-relaxed text-sm line-clamp-3 `}>{item?.description}</p>
            </div>
        </div>
    );
};

export default VerticalCard;