import Breadcrumb from '@/components/Breadcrumb';
import React from 'react';
export const instant = false

interface IIndividualitemTypes {
    image: string
    nameBn: string
    unit: string
    categoryNameBn: string
    category: string
    today: number
    yesterday: number
    change: {
        dir: string
        pct: number
    }
    markets: {
        market: string
        division: string
        min: number
        max: number
    }[]
}

const ItemPage = async ({
    params,
}: {
    params: Promise<{ itemId: string }>
}) => {
    const { itemId } = await params
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${itemId}`,
        {
            cache: "force-cache"
        }
    )
    const individualItem: IIndividualitemTypes = await res.json()
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

    const lowestPrice = Math.min(...individualItem.markets.map((market) => market.min))

    const highestPrice = Math.max(...individualItem.markets.map((market) => market.max)
    )
    const averagePrice = (lowestPrice + highestPrice) / 2;



    return (
        <div className='mx-auto w-full max-w-6xl px-3 pb-8 sm:px-5 lg:px-6'>
            <div className='container mx-auto mt-4'>
                <Breadcrumb
                    category={individualItem.category}
                    categoryNameBn={individualItem.categoryNameBn}
                    nameBn={individualItem.nameBn}
                />
            </div>
            <section className='"mt-6 flex flex-col gap-5 rounded-2xl bg-white p-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:p-5'>
                <div className='flex min-w-0 items-start gap-3 sm:gap-'>
                    <span className='flex shrink-0 items-center justify-center rounded-2xl bg-base-200 p-3 text-4xl sm:p-4 sm:text-5xl'>
                        {individualItem.image}
                    </span>
                    <div className="min-w-0 flex-1">
                        <h2 className=' text-xl font-bold sm:text-2xl lg:text-3xl'>{individualItem.nameBn}</h2>

                        <p className='mt-1 text-sm text-gray-500 sm:text-base'>প্রতি  {unitInBangla[individualItem.unit] || individualItem.unit} . {individualItem.categoryNameBn}</p>

                        <p className="mt-2 text-sm leading-6 sm:text-base">
                            গতকালের তুলনায় আজ দাম
                        </p>
                        <span className={`mx-1 font-semibold ${individualItem.change.dir === "up"
                            ? ""
                            : individualItem.change.dir === "down"
                                ? ""
                                : "text-gray-500"
                            }`}>{individualItem.change.dir === "up"
                                ? "বেড়েছে"
                                : individualItem.change.dir === "down"
                                    ? "কমেছে"
                                    : "অপরিবর্তিত"} :
                            {toBanglaNumber(Math.abs(individualItem.today - individualItem.yesterday))}  টাকা

                            {" "}

                        </span>
                        <p>

                        </p>
                    </div>
                </div>

                <div className='flex w-full shrink-0 flex-col items-center justify-center rounded-2xl bg-base-200 p-4 sm:w-auto sm:min-w-32'>
                    <p className='text-gray-500'>আজকের দাম</p>

                    <h2 className='text-2xl font-bold sm:text-3xl'>{toBanglaNumber(individualItem.today)}</h2>
                    <p> টাকা / {unitInBangla[individualItem.unit] || individualItem.unit}</p>
                    <span
                        className={`mx-1 font-semibold ${individualItem.change.dir === "up"
                            ? "text-red-500"
                            : individualItem.change.dir === "down"
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                    >
                        {individualItem.change.dir === "up"
                            ? "▲"
                            : individualItem.change.dir === "down"
                                ? "▼"
                                : "—"}

                        {" "}
                        {toBanglaNumber(Math.abs(individualItem.change.pct))}%
                    </span>

                </div>
            </section>

            <section className='mt-6 rounded-2xl bg-white p-4 sm:mt-8 sm:p-5'>
                <h2 className='my-2 text-lg font-bold sm:my-3 sm:text-xl'>দামের সারসংক্ষেপ</h2>

                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                    <div className='min-w-0 rounded-2xl bg-gray-100 p-4 sm:p-5'>
                        <p className='text-gray-500'>সর্বনিম্ন দাম</p>
                        <h2 className='text-green-600 mt-1'><span className='font-bold text-2xl '>{toBanglaNumber(lowestPrice)}</span> টাকা</h2>
                        <p className='mt-1 text-sm text-gray-500'>সবচেয়ে কম দামের বাজার</p>
                    </div>
                    <div className='bg-gray-100 rounded-2xl p-5 w-96'>
                        <p className='text-gray-500'>সর্বাধিক দাম</p>

                        <h2 className='text-red-600 mt-1'><span className='font-bold text-2xl '>{toBanglaNumber(highestPrice)}</span> টাকা</h2>

                        <p className='text-gray-500'>সবচেয়ে বেশি দামের বাজার</p>
                    </div>
                    <div className='min-w-0 rounded-2xl bg-gray-100 p-4 sm:col-span-2 sm:p-5 lg:col-span-1 '>
                        <p className='text-gray-500'>গড় দাম</p>
                        <h2 className='text-green-600'><span className='font-bold text-2xl '>{toBanglaNumber(averagePrice)}</span> টাকা</h2>
                        <p className='text-gray-500'>প্রতি {unitInBangla[individualItem.unit]}-এর হিসাবে</p>
                    </div>
                </div>
            </section>

            {/* Price Table */}

            <section className="mt-6 sm:mt-8">
                <h2 className="py-4 text-xl font-bold sm:text-2xl">বাজারভিত্তিক আজকের দাম</h2>

                <div className='bg-gray-100 border-gray-400 overflow-x-auto rounded-xl'>
                    <table className='w-full min-w-150 border-collapse text-sm sm:text-base'>
                        <thead className='bg-gray-100'>
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
                                    .sort((a, b) => a.min - b.min)
                                    .map((item, i) => {
                                        const average = (item.min + item.max) / 2;
                                        return (
                                            <tr key={`${item.market} - ${i} `}
                                                className='odd:bg-white even:bg-base-200 border-b border-gray-600 p-5'>
                                                <td className='whitespace-nowrap p-2.5 sm:p-3'>{item.market}</td>
                                                <td className='whitespace-nowrap p-2.5 sm:p-3'>{item.division}</td>
                                                <td className='whitespace-nowrap p-2.5 sm:p-3 text-right'>{toBanglaNumber(item.min)} টাকা </td>
                                                <td className='whitespace-nowrap p-2.5 sm:p-3 text-right'>{toBanglaNumber(item.max)} টাকা</td>
                                                <td className='whitespace-nowrap p-2.5 sm:p-3 text-right'>{toBanglaNumber(average)} টাকা</td>
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