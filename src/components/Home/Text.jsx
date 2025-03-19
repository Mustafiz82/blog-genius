"use client"
import React, { useEffect, useState } from 'react';

const Text = () => {

    const array = ["1 ", "2 ", "3 ", "4", "5"]
    const [arrayState, setArrayState] = useState(array)


    useEffect(() => {
        setTimeout(() => {
            const newArray = arrayState.shift()
            setArrayState(prevArray => [...prevArray.slice(0) , ...prevArray]); // Returns a new array without modifying the original state
            console.log(newArray);
        }, 3000);
    } , [])
    return (
        <div className='flex justify-center text-xl w-full gap-5'>


            {
                arrayState?.map(item => <div key={item}>
                    {item}
                </div>)
            }
        </div>
    );
};

export default Text;