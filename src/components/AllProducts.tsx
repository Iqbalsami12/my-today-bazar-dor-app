import Link from 'next/link';
import React from 'react';
interface IAllproducts{
    id:number,
    nameBn:string,
    unit:string
    image:string,
    today:number,
    change:{
        pct:number
        dir:string
    }
}

const AllProducts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products',
        {
            cache: "force-cache"
        }
    )
    const products:IAllproducts[] = await res.json()
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
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                products.map(product => (
                   <Link key={product.id} href={`/item/${product.id}`}>
                    <div key={product.id} className="card bg-base-100  shadow-sm p-1.5 mx-2.5">
                        <div className='flex gap-2.5'>

                            <figure className='bg-base-200 '>
                                <span className="text-3xl">{product.image}</span>
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
                                <p><span className={`mx-1 font-semibold ${product.change.dir === "up"
                                        ? "text-green-500"
                                        : product.change.dir === "down"
                                            ? "text-red-500"
                                            : "text-gray-500"
                                    }`} >
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
        </div>
    );
};

export default AllProducts;