import { blogs } from '@/app/Data/BlogData';
import React from 'react';
import VerticalCard from './VerticalCard';
import CategoryTitle from '../common/CategoryTitle';

const Travel = () => {
    return (
        <div>

           <CategoryTitle title={"travel"} />
            <div className='grid mt-8 grid-cols-3 gap-5'>
                {
                    blogs?.map((item, idx) => <VerticalCard
                        key={idx}
                        item={item}
                    />)
                }
            </div>
        </div>
    );
};

export default Travel;