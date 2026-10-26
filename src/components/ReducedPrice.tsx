
import React from 'react';

interface IReducedPrice{
    id:number,
    nameBn:string,
    image:string,
    today:number,
    change:{
        pct:string
    }
}

const ReducedPrice = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products',
        {
            cache: "force-cache"
        }
    )
    const products = await res.json()
    const reducedPriceProducts:IReducedPrice[] = products.filter((item: { change: { dir: string; }; }) => item.change.dir === 'down').slice(0, 6)
    return (
        <div className='container mx-auto grid grid-cols-3 gap-5'>
            {
                reducedPriceProducts.map(product => (
                    <div key={product.id} className="card bg-base-100  shadow-sm p-1.5 mx-2.5">
                        <div className='flex gap-2.5'>
                           
                               <figure className='bg-base-200 '>
                                <span className="text-3xl">{product.image}</span>
                               </figure>


                            
                            <div className="card-body">
                                <h2 className="card-title">{product.nameBn}</h2>
                                <p>প্রতি কেজি</p>

                            </div>
                        </div>


                            {/* lower card */}

                            <div className='flex justify-between'>
                                <div>
                                    <p>আজকের দাম</p>
                                    <p><span className='font-bold text-2xl'>{product.today}</span> টাকা </p>
                                </div>
                                <div>
                                    <p><span className='text-red-600'>▲</span> {product.change.pct} %</p>
                                </div>
                            </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ReducedPrice;