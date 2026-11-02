'use client'

import Link from 'next/link';
import React from 'react';

interface ISortedProducts{
    id:number
     nameBn: string;
     unit:string
   today: string;
     image:string
     categoryIcon:string
     categoryNameBn:string
    change:{
        dir:string
        pct:number
    }
}
interface SortedProductProps{
    products: ISortedProducts[]
}

const SortedProducts = ({products}: SortedProductProps) => {
    const unitInBangla: Record<string, string> = {
       kg: "কেজি",
       gram: "গ্রাম",
       liter: "লিটার",
       piece: "পিস"

   };
   const toBanglaNumber = (number: number | string) => {
 const banglaDigits = "০১২৩৪৫৬৭৮৯";

 return number
   .toString()
   .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};

    const [sortOrder, setSortOrder] = React.useState<"default" | "lowToHigh" | "highToLow">("default");
    const sortedProduct = [...products].sort((a,b) =>{
            const priceA = Number(a.today)
            const priceB = Number(b.today)
    
            if(sortOrder === "highToLow"){
                return priceA - priceB
            }

            if(sortOrder === "lowToHigh"){
                return priceB - priceA
            }
            return 0;
        })
    return (
     <div>
             <div className="navbar mt-10 bg-white container mx-auto rounded-2xl ">


                <div className="flex grow items-center justify-end px-2">
                    <div className="flex items-stretch">
                        <p className='text-gray-600 text-xl'>সাজান</p>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost rounded-field text-xl text-gray-500">
                                {
                                    sortOrder === "lowToHigh"? "দাম: কম থেকে বেশি": sortOrder === "highToLow"? "দাম: বেশি থেকে কম": "ডিফল্ট"
                                }
                            </div>
                            <ul
                                tabIndex={-1}
                                className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                                <li>
                                    <button onClick={() => setSortOrder("lowToHigh")}>দাম: বেশি থেকে কম </button>
                                </li>
                                <li>
                                    <button onClick={() => setSortOrder("highToLow")}>
                                        দাম: কম থেকে বেশি
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
             {
                sortedProduct.map((product) => (
                  <Link key={product.id} href={`/item/${product.id}`}>
                    <div key={product.id} className="card bg-base-100  shadow-sm p-1.5 mx-2.5">
                        <div className='flex gap-2.5'>
                           
                               <figure className='bg-base-200 my-7 p-1.5 rounded-2xl '>
                                <span className="text-4xl">{product.image}</span>
                               </figure>


                            
                            <div className="card-body">
                                <h2 className="card-title">{product.nameBn}</h2>
                                <p>প্রতি {unitInBangla[product.unit]}</p>

                            </div>
                        </div>


                            {/* lower card */}

                            <div className='flex justify-between'>
                                <div>
                                    <p>আজকের দাম</p>
                                    <p><span className='font-bold text-2xl'>{toBanglaNumber(product.today)}</span> টাকা </p>
                                </div>
                                <div>
                                    <p><span className={`mx-1 font-semibold ${
        product.change.dir === "up"
            ? "text-red-500"
            : product.change.dir === "down"
            ? "text-green-500"
            : "text-gray-500"
    }`}>
        
         {product.change.dir === "up"
        ? "▲"
        : product.change.dir === "down"
        ? "▼"
        : "—"}

    {" "}
    {toBanglaNumber(Math.abs(product.change.pct))}%
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

export default SortedProducts;