import React from 'react';

const Banner = () => {
    return (
        <div className='pt-20 text-center'>
            <h1 className='gradient-text text-4xl font-semibold '>Unleash AI Creativity – Write or Discover Blogs!</h1>
            <p className='my-5 max-w-2xl mx-auto text-black/70'>Step into the future of blogging! Whether you want to craft compelling articles with the power of AI or explore insightful blogs written by experts, you're in the right place. Let AI enhance your creativity or fuel your curiosity—start writing or reading today!</p>

            <div className="flex justify-center gap-5 my-8">
                <button className='hover:bg-black/70 duration-300 px-8 py-3 bg-primary text-white font-semibold rounded-md'>
                    Write With Ai
                </button>
                <button className='hover:bg-black/70 duration-300 px-8 py-3 bg-primary text-white font-semibold rounded-md'>
                    Read Blogs
                </button>
            </div>
        </div>
    );
};

export default Banner;