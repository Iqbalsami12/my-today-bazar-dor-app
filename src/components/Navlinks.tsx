'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface INavItems {
    id:string
    slug:string
    nameBn:string
    icon:string
}

const Navlinks = () => {

const [category, setCategory] = useState<INavItems[]>([])
const pathName = usePathname()
useEffect(()=>{
     fetch('https://openapi.programming-hero.com/api/bazardor/categories',
)
.then((res) => res.json())
.then((category) => setCategory(category))
},[])


    return (
        <div className='flex flex-wrap  gap-6 justify-center mt-5 sm:gap-4 px-2'>
             {category.map((d) => {
        const isActive = pathName === `/category/${d.slug}`;
            return(
                 <Link
            key={d.id}
            href={`/category/${d.slug}`}
            className={`rounded-md px-3 py-2 transition-colors ${
              isActive
                ? 'bg-green-600 text-white'
                : ''
            }`}
          >
            <span>{d.icon}</span>{' '}
            <span>{d.nameBn}</span>
          </Link>)
             })} 
        </div>
    );
};

export default Navlinks;