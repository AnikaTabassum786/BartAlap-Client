import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
             <div className=' mx-auto  p-10 mt-8 w-full shadow-2xl'>
            <div className='flex flex-col lg:flex-row justify-between items-center gap-6 '>

                <div className='font-medium text-lg text-center lg:text-start'>
                  BartAlap
                  <p className='font-normal text-base text-center lg:text-start'>
                    Allows users to create, <br /> view,  and delete <br /> posts, each post <br /> containing description.
                  </p>
                </div>

                <div className='flex flex-col justify-center gap-1'>
                    <p>BartAlap@gmail.com</p>
                    <p>01712879467</p>
                </div>

                <div className='flex flex-row lg:flex-col gap-2'>

                    <a href="https://www.facebook.com/tabassum.teddy/" target="_blank">
                    <FaFacebook size={20} className='hover:scale-80 duration-300 cursor-pointer' />
                    </a>
                
                    <a href="https://www.linkedin.com/in/anika-tabassum-1b62541b1/" target="_blank">
                    <FaLinkedin size={20} className='hover:scale-80 duration-300 cursor-pointer'/>
                    </a>
                
                    <a href="https://github.com/AnikaTabassum786" target="_blank">
                    <FaGithub size={20} className='hover:scale-80 duration-300 cursor-pointer' />
                    </a>
                </div>
            </div>

            {/* <p className='text-center text-white mt-4' >@ <span>{format(new Date(), "yyyy")}</span> KolaPata. All rights reserved</p> */}
        </div>
        </div>
    );
};

export default Footer;