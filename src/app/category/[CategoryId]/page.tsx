import Link from 'next/link';
import React from 'react';

export const instant = false

interface ICategoryTypes{
    id:number
     nameBn: string;
   today: string;
     image:string
     categoryIcon:string
     categoryNameBn:string
    change:{
        dir:string
        pct:number
    }
}
const CategoryPage = async ({ params }: {params:{CategoryId:string}}) => {

    const { CategoryId } = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${CategoryId}`,
        {
            cache: "force-cache"
        }
    )

    const categoryProduct:ICategoryTypes[] = await res.json()

    const visibleProducts = categoryProduct.slice(0, 4)
    return (

        <div>

            <section className='bg-white p-6 mt-10 container mx-auto rounded-2xl'>
                <div className='flex gap-3'>
                    <span className='text-4xl'>
                        {categoryProduct[0].categoryIcon}
                    </span>

                    <span>
                        <h1 className='font-bold text-2xl'>{categoryProduct[0].categoryNameBn}</h1>
                        <p className='text-gray-400'>৪টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                    </span>
                </div>
            </section>
            {/* sorting dropdown */}

            <div className="navbar mt-10 bg-white container mx-auto rounded-2xl">

                <div className="flex grow items-center justify-end px-2">
                    <div className="flex items-stretch">
                        <p className='text-gray-600 text-xl'>সাজান</p>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost rounded-field text-xl text-gray-500">ডিফল্ট</div>
                            <ul
                                tabIndex={-1}
                                className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
             {
                visibleProducts.map(visible => (
                  <Link key={visible.id} href={`/item/${visible.id}`}>
                    <div key={visible.id} className="card bg-base-100  shadow-sm p-1.5 mx-2.5">
                        <div className='flex gap-2.5'>
                           
                               <figure className='bg-base-200 my-7 p-1.5 rounded-2xl '>
                                <span className="text-4xl">{visible.image}</span>
                               </figure>


                            
                            <div className="card-body">
                                <h2 className="card-title">{visible.nameBn}</h2>
                                <p>প্রতি কেজি</p>

                            </div>
                        </div>


                            {/* lower card */}

                            <div className='flex justify-between'>
                                <div>
                                    <p>আজকের দাম</p>
                                    <p><span className='font-bold text-2xl'>{visible.today}</span> টাকা </p>
                                </div>
                                <div>
                                    <p><span className={`mx-1 font-semibold ${
        visible.change.dir === "up"
            ? "text-green-500"
            : visible.change.dir === "down"
            ? "text-red-500"
            : "text-gray-500"
    }`}>
        
         {visible.change.dir === "up"
        ? "▲"
        : visible.change.dir === "down"
        ? "▼"
        : "—"}

    {" "}
    {Math.abs(visible.change.pct)}%
        </span> </p>
                                </div>
                            </div>
                    </div>
                  </Link>
                ))
            }
        </section>

        </div>
    );
};

export default CategoryPage;