import React from 'react';

const SparkAnimating = () => {
    return (
        <div>
            <div
                class="sparkle-container">
                <div class="smoke-effect"></div>
                <svg class="sparkle sparkle-main" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="purpleGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" class="gradient-stop-1" />
                            <stop offset="50%" class="gradient-stop-2" />
                            <stop offset="100%" class="gradient-stop-3" />
                        </linearGradient>
                    </defs>
                    <path d="M32 0c0 16.9-9.1 32-32 32c22.9 0 32 15.1 32 32c0-16.9 9.1-32 32-32c-22.9 0-32-15.1-32-32" fill="url(#purpleGradient1)" />
                    <path class="sparkle-stroke" d="M32 0c0 16.9-9.1 32-32 32c22.9 0 32 15.1 32 32c0-16.9 9.1-32 32-32c-22.9 0-32-15.1-32-32" fill="none" stroke="#4B0082" stroke-width="0.05" />
                </svg>

                <svg class="sparkle sparkle-medium" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <use href="#purpleGradient1" />
                    <path d="M32 16c0 8.4-4.6 16-16 16c11.4 0 16 7.6 16 16c0-8.4 4.6-16 16-16c-11.4 0-16-7.6-16-16" fill="url(#purpleGradient1)" />
                    <path class="sparkle-stroke" d="M32 16c0 8.4-4.6 16-16 16c11.4 0 16 7.6 16 16c0-8.4 4.6-16 16-16c-11.4 0-16-7.6-16-16" fill="none" stroke="#4B0082" stroke-width="0.05" />
                </svg>

                <svg class="sparkle sparkle-small" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <use href="#purpleGradient1" />
                    <path d="M20.8 46.4c0 4.2-2.3 8-8 8c5.7 0 8 3.8 8 8c0-4.2 2.3-8 8-8c-5.7 0-8-3.8-8-8" fill="url(#purpleGradient1)" />
                    <path class="sparkle-stroke" d="M20.8 46.4c0 4.2-2.3 8-8 8c5.7 0 8 3.8 8 8c0-4.2 2.3-8 8-8c-5.7 0-8-3.8-8-8" fill="none" stroke="#4B0082" stroke-width="0.05" />
                </svg>
            </div>
        </div>
    );
};

export default SparkAnimating;