'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const HeaderPage = () => {

   const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(
      today.toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

    return (
        <div className='flex justify-around mt-10'>
           <div className='flex gap-2'>
            <Image className='rounded-2xl bg-green-400 p-1.5'
            src='/logo-icon.png'
            alt='logo'
            height={50}
            width={50}
            />

           <div>
             <h2 className='font-bold text-2xl'>বাজার দর</h2>
            <div className="text-sm text-gray-600">{date}</div>
           </div>
            </div> 

            <div className='flex gap-1.5'>
                <button className="btn btn-secondary">Sign In</button>
                <button className="btn btn-info">Sign Up</button>
            </div>

        </div>
    );
};

export default HeaderPage;