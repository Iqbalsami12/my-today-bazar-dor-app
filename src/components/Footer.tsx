import React from 'react';

const Footer = () => {
    return (
        <div className='container mx-auto mt-10 flex flex-col gap-2 px-4 sm:flex-row sm:justify-between'>
            
                 <p className=" text-gray-600 sm:text-base">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                <p className=" text-gray-600 ">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            
        </div>
    );
};

export default Footer;