import Link from 'next/link';
import React from 'react';

interface INavItems {
    id:string
    slug:string
    nameBn:string
    icon:string
}

const Navlinks = async() => {

const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories',
    {cache: "force-cache"}
)
const data:INavItems[] = await res.json()


    return (
        <div className='flex gap-6 justify-center mt-5'>
            {
                data.map(d => <Link key={d.id} href={`/category/${d.slug}`}>
                    <span>{d.icon}</span>
                    <span>{d.nameBn}</span>
                
                </Link>)
            }
        </div>
    );
};

export default Navlinks;