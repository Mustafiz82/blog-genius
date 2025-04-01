"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../style/carousel.css"
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

export default function App() {
    const carouselImages = [
        "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1719749990914-a3ba54e6343f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1467195468637-72eb862bb14e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1532155297578-a43684be8db8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    // const [activeIndex, setActiveIndex] = useState(0);
    // const [prevIndex, setPrevIndex] = useState(0);
    // const [isSlidingLeft, setIsSlidingLeft] = useState(false);

    const [isSliding, setIsSliding] = useState(false)
    const [slidingDirection, setSlidingDirection] = useState(null)
    const [slideIndex, setSlideIndex] = useState(0)
    const swiperRef = useRef(null);
    const [carouselIndex, setCarouselIndex] = useState(0)


    // console.log(carouselIndex, "carsolei");



    // console.log(isSlidingLeft);


    const carouselData = [
        {
            image: "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=2071&auto=format&fit=crop",
            title: "Discover the Hidden Gems of the World",
            author: "John Doe",
            date: "March 5, 2025",
            tags: ["travel", "adventure"]
        },
        {
            image: "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=2070&auto=format&fit=crop",
            title: "The Art of Solo Traveling",
            author: "Sarah Johnson",
            date: "April 10, 2025",
            tags: ["solotravel", "explore"]
        },
        {
            image: "https://images.unsplash.com/photo-1719749990914-a3ba54e6343f?q=80&w=2072&auto=format&fit=crop",
            title: "Why Traveling is the Best Education",
            author: "Emily Carter",
            date: "May 20, 2025",
            tags: ["learning", "culture"]
        },
        {
            image: "https://images.unsplash.com/photo-1467195468637-72eb862bb14e?q=80&w=2071&auto=format&fit=crop",
            title: "Capturing Memories: Travel Photography Tips",
            author: "David Smith",
            date: "June 15, 2025",
            tags: ["photography", "wanderlust"]
        },
        {
            image: "https://images.unsplash.com/photo-1532155297578-a43684be8db8?q=80&w=2071&auto=format&fit=crop",
            title: "The Benefits of Traveling with a Second Language",
            author: "Mustafiz Rahman",
            date: "January 2, 2025",
            tags: ["language", "communication"]
        }
    ];


    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                speed={1000} // Adjust slide speed
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                onSlideChange={(swiper) => {
                    setIsSliding(true)
                    setSlideIndex(swiper.realIndex - 1)
                    // setCarouselIndex(swiper.realIndex)
                    setSlidingDirection("right")
                    console.log("triggered");
                    setTimeout(() => {
                        setIsSliding(false)
                    }, 1000);
                }}
                onNavigationNext={(swiper) => {
                    setIsSliding(true)
                    setSlideIndex(swiper.realIndex - 1)
                    setSlidingDirection("left")

                    setTimeout(() => {
                        setIsSliding(false)
                    }, 1000);

                }}
                onNavigationPrev={(swiper) => {
                    setIsSliding(true)
                    setSlideIndex(swiper.realIndex + 1)
                    setSlidingDirection("right")

                    setTimeout(() => {
                        setIsSliding(false)
                    }, 1000);

                }}

                className="mySwiper relative mb-10"
            >
                {carouselData.map((slide, idx) => (
                    <SwiperSlide key={idx} className="flex relative  justify-center items-center">
                        <div className="w-full   h-auto overflow-hidden ">
                            <img
                                src={slide?.image}

                                className={`min-w-full h-68  sm:h-96 md:h-[640px] object-cover transition-all duration-1000 ${isSliding && (idx === slideIndex) ? (slidingDirection == "left" ? "scale-175 duration-1000 object-right" : "scale-175 object-left") : "scale-100 "
                                    } `}
                                alt={`Slider - ${idx + 1}`}


                            />

                        </div>

                        <div className="absolute text-white flex flex-col justify-center items-center w-full h-full top-0 left-0 bg-black/30">
                            <div className="flex gap-2">
                                {
                                    slide.tags.map((item, idx) => <p key={idx}>
                                        <span className='text-purple-500'>#</span> {item}
                                    </p>)
                                }
                            </div>
                            <h2 className="text-lg lg:text-3xl border-bottom mt-2 max-w-[700px] capitalize leading-[45px] text-center font-semibold">
                                {slide?.title}
                            </h2>

                            <p className="text-sm text-white mb-3">
                                By Jhon Doe - May 20, 2025
                            </p>
                        </div>

                    </SwiperSlide>
                ))}
                {/* <div className="bg-blue-600 overflow-hidden flex flex-col-reverse h-full  gap-5 z-[999] w-[100px] h-[350px] absolute top-[50%] right-[1%] translate-y-[-50%]">

                    {
                        carouselImages?.map((item , idx) => <div className={(idx == carouselIndex) && "order-3"}>
                            <Image
                             src={item}
                             width={500}
                             height={500}
                            //  quality={}
                            objectFit="cover"
                            className="w-[100px] h-[100px] rounded-full"
                            />

                        </div> )
                    }

                </div> */}

                <div
                    onClick={() => swiperRef.current?.slidePrev()}
                    className='absolute w-10 h-10 flex justify-center items-center bg-white rounded-full z-[999] bottom-[5%] right-[90px] '>
                    <IoIosArrowBack className='text-2xl -ml-1' />
                </div>
                <div
                    onClick={() => swiperRef.current?.slideNext()}
                    className='absolute w-10 h-10 flex justify-center items-center bg-white rounded-full z-[999]  right-[40px]  bottom-[5%] '>
                    <IoIosArrowBack className='text-2xl rotate-180 -mr-1' />
                </div>

            </Swiper>
        </>
    );
}
