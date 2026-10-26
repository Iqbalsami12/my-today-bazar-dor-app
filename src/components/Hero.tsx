
'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const HeroSection = () => {
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
        <div className='flex flex-col md:flex-row items-center justify-around mt-10 bg-white p-2.5 rounded-2xl'>
            <div className='flex flex-col gap-5'>
                <p className='bg-green-100 text-green-500 rounded-2xl p-1 max-w-60'>{date}</p>
            <h2 className='font-bold text-3xl md:text-5xl'>আজকের বাজারের দাম এক নজরে</h2>
            <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>

           <button className="btn btn-success max-w-30 text-white">সব পণ্য দেখুন</button>
            </div>

            <Image className='w-48 md:w-72 h-auto'
            src='/bazar-hero.png'
            alt='hero image'
            width={300}
            height={300}
            />
        </div>
    );
};

export default HeroSection;