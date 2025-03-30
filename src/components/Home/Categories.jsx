"use client"
import "../../style/ripple.css";

export default function Categories() {
    const sliders = [
        {
            img: 'https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Winter',
            post : 5
        },
        {
            img: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Spring',
            post : 5
        },
        {
            img: 'https://images.unsplash.com/photo-1570299437522-f66ff98d52e7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Summer',
            post : 5
        },
        {
            img: 'https://images.unsplash.com/photo-1667587870757-b2a4a407aeee?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Autumn',
            post : 5
        },
        {
            img: 'https://images.unsplash.com/photo-1570299437522-f66ff98d52e7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Summer',
            post : 6
        },
    ];

    return (
        <div className='px-10 py-8'>
            <div className='flex pb-5 items-center gap-3'>
                <section className="micro"></section>
                <h2 className='text-xl font-semibold'>Popular Categories</h2>
            </div>
            <div className="flex justify-center gap-1 md:gap-4">
                {sliders.map((slide, idx) => (
                    <div
                    key={idx}
                    className="relative group overflow-hidden h-[400px] rounded-2xl bg-gray-500 duration-500 ease-in-out w-[20%] hover:w-[300px] md:hover:w-[25%]"
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                    {/* Image */}
                    <div className='h-full flex justify-center overflow-hidden'>
                        <img width={640} height={540} className="h-full image rounded-2xl" src={slide.img} alt="accordion navigate ui" />
                    </div>
                
                    {/* Title Text */}
                    <div className="absolute leading-0 -rotate-90 bottom-[60px] -right-[10px] group-hover:-right-[100px] text-white transition-all duration-500">
                        <p>{slide?.post} post</p>
                        <p className="text-sm mt-2 font-semibold md:text-3xl">{slide.title}</p>
                    </div>
                
                    <div className="absolute leading-0 bottom-[20px] group-hover:left-[20px] -left-[200px] text-white transition-all duration-500">
                    <p>{slide?.post} post</p>
                        <p className="text-sm mt-3 font-semibold md:text-3xl">{slide.title}</p>
                    </div>
                </div>
                
                ))}
            </div>
        </div>
    );
}