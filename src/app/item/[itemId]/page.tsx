import React from 'react';
export const instant = false

interface IIndividualitemTypes{
    image:string
    nameBn:string
    unit:string
    categoryNameBn:string
    today:number
    yesterday:number
    change:{
        dir:string
        pct:number
    }
    markets: {
        market:string
        division:string
        min: number
        max: number
    }[]
}

const ItemPage = async ({ params }: { params: { itemId: string } }) => {
    const { itemId } = await params
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${itemId}`,
        {
            cache: "force-cache"
        }
    )
    const individualItem:IIndividualitemTypes = await res.json()
    const unitInBangla: Record<string, string> = {
        kg: "কেজি",
        gram: "গ্রাম",
        liter: "লিটার",
        piece: "টি",
    };

    const lowestPrice = Math.min(...individualItem.markets.map((market) => market.min))
    
    const highestPrice = Math.max(...individualItem.markets.map((market) => market.max)
)
    const averagePrice = (lowestPrice + highestPrice) / 2;



    return (
        <div>
            <section className='mt-10 bg-white p-5 flex justify-between'>
               <div className='flex gap-2.5'>
                 <span className='bg-base-200 text-5xl pt-5 mb-14 rounded-2xl'>
                    {individualItem.image}
                </span>
                <div>
                    <h2 className='font-bold text-3xl'>{individualItem.nameBn}</h2>
                    <p className='text-gray-500'>প্রতি  {unitInBangla[individualItem.unit] || individualItem.unit} . {individualItem.categoryNameBn}</p>
                    গতকালের তুলনায় আজ দাম <span className={`mx-1 font-semibold ${individualItem.change.dir === "up"
                            ? ""
                            : individualItem.change.dir === "down"
                                ? ""
                                : "text-gray-500"
                        }`}>{individualItem.change.dir === "up"
                            ? "কমেছে"
                            : individualItem.change.dir === "down"
                                ? "বেড়েছে"
                                : "অপরিবর্তিত"} : 
                            {Math.abs(individualItem.today - individualItem.yesterday)}  টাকা

                        {" "}

                    </span> 
                    <p>

                    </p>
                </div>
               </div>

               <div className='bg-base-200 rounded-2xl p-4 flex flex-col items-center justify-center'>
                <p className='text-gray-500'>আজকের দাম</p>
                <h2 className='font-bold text-3xl'>{individualItem.today}</h2>
                <p> টাকা / {unitInBangla[individualItem.unit] || individualItem.unit}</p>
                <span
    className={`mx-1 font-semibold ${
        individualItem.change.dir === "up"
            ? "text-green-500"
            : individualItem.change.dir === "down"
            ? "text-red-500"
            : "text-gray-500"
    }`}
>
    {individualItem.change.dir === "up"
        ? "▲"
        : individualItem.change.dir === "down"
        ? "▼"
        : "—"}

    {" "}
    {Math.abs(individualItem.change.pct)}%
</span>

               </div>
            </section>

          <section className='mt-10 p-5 bg-white rounded-2xl'>
            <h2 className='font-bold text-xl my-3.5'>দামের সারসংক্ষেপ</h2>
            <div className='flex  justify-around'>
                <div className='bg-gray-100 rounded-2xl p-5 w-96'>
                    <p className='text-gray-500'>সর্বনিম্ন দাম</p>
                    <h2 className='text-green-600'><span className='font-bold text-2xl '>{lowestPrice}</span> টাকা</h2>
                    <p className='text-gray-500'>সবচেয়ে কম দামের বাজার</p>
                </div>
                <div className='bg-gray-100 rounded-2xl p-5 w-96'>
                    <p className='text-gray-500'>সর্বাধিক দাম</p>
                    <h2 className='text-red-600'><span className='font-bold text-2xl '>{highestPrice}</span> টাকা</h2>
                    <p className='text-gray-500'>সবচেয়ে বেশি দামের বাজার</p>
                </div>
                <div className='bg-gray-100 rounded-2xl p-5 w-96 '>
                    <p className='text-gray-500'>গড় দাম</p>
                    <h2 className='text-green-600'><span className='font-bold text-2xl '>{averagePrice}</span> টাকা</h2>
                    <p className='text-gray-500'>প্রতি {individualItem.unit}-এর হিসাবে</p>
                </div>
            </div>
            </section>  

            {/* Price Table */}

            <section>
                <h2 className='font-bold text-2xl py-5'>বাজারভিত্তিক আজকের দাম</h2>

               <div className='bg-gray-100 border-gray-400 rounded-2xl'>
                    <table className='w-full'>
                        <thead className='p-3'>
                            <tr>
                                <th className='text-gray-600 text-left p-3'>বাজার</th>
                                <th className='text-gray-600 text-left '>বিভাগ</th>
                                <th className='text-gray-600 text-right'>সর্বনিম্ন</th>
                                <th className='text-gray-600 text-right'>সর্বাধিক</th>
                                <th className='text-gray-600 text-right p-3'>গড়</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                             individualItem.markets.slice()
                             .sort((a,b) => a.min - b.min )
                             .map((item, i) => {
                                const average = (item.min + item.max) / 2;
                                return(
                                    <tr key={`${item.market} - ${i} `}
                                    className='odd:bg-white even:bg-base-200 border-b border-gray-600 p-5'>
                                        <td className='p-2.5'>{item.market}</td>
                                        <td className='py-2.5'>{item.division}</td>
                                        <td className='py-2.5 text-right'>{item.min} টাকা </td>
                                        <td className='py-2.5 text-right'>{item.max} টাকা</td>
                                        <td className='p-2.5 text-right'>{average} টাকা</td>
                                    </tr>
                                )
                             })  
                            }
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
};

export default ItemPage;