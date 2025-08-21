import React from 'react';
import CountUp from 'react-countup';

const Count = () => {
    return (
        <div>
            

            <div className='my-6'>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-2 '>
            <div className='flex flex-col gap-1  bg-white shadow-md rounded-md p-4 w-[250px] '>
            
            <CountUp className='font-bold text-black mt-2'
                    start={80}
                    end={100} 
                    suffix="+"
                    duration={5}
                />
                <p className='text-lg font-medium text-black'>Total Users</p>
            </div>

            <div className='flex flex-col gap-1 bg-white shadow-md rounded-md p-4 w-[250px]'>
            
            <CountUp className='font-bold text-black mt-2'
                    start={3}
                    end={10} 
                    suffix="+"
                    duration={2}
                />
                <p className='text-lg font-medium text-black'>Post Per Day</p>
            </div>

            <div className='flex flex-col gap-1 bg-white shadow-md rounded-md p-4 w-[250px]'>
           
            <CountUp className='font-bold text-black mt-2'
                    start={20}
                    end={30} 
                    suffix="+"
                    duration={7}
                />
                <p className='text-lg font-medium text-black'>Comments Per Day</p>
            </div>


            <div className='flex flex-col gap-1 bg-white shadow-md rounded-md p-4 w-[250px]'>
            
            <CountUp className='font-bold text-black mt-2'
                    start={30}
                    end={35} 
                    suffix="+"
                    duration={5}
                />
                <p className='text-lg font-medium text-black'>Vote Per Day</p>
            </div>
            </div>

        </div>
        </div>
    );
};

export default Count;