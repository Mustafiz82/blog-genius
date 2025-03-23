'use client';

import { useState, useEffect } from 'react';


export default function Step({ steps, setCurrentStep, currentStep }) {
    const [hasInteracted, setHasInteracted] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            setHasInteracted(false)
        }, 600);
    }, [])






    return (
        <div className=''>
            <div className="flex items-center mx-auto justify-between max-w-[70vw] pt-10 space-x-4">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`step  w-10 flex  justify-center items-center h-10 bg-primary rounded-full text-white  }}`

                        }
                        style={{ opacity: currentStep < index ? 0.3 : 1 }}
                    >
                        <span className='z-[99]'>  {index + 1}</span>
                        {
                            (index === currentStep - 1 || currentStep > index) ? (
                                <div
                                    className="step-line"></div>
                            ) : (
                                (index === currentStep + 1 || currentStep + 1 < index) && (
                                    <div
                                        style={{
                                            visibility: hasInteracted ? "hidden" : "visible",
                                        }}
                                        className="step-line-reverse"
                                    ></div>
                                )
                            )
                        }

                        <div className='absolute text-nowrap text-black -bottom-[30px]'>
                            {step?.label}
                        </div>
                    </div>
                ))}


            </div>

        </div>
    );
}
