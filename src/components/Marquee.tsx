import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface IHeadline{
 categoryIcon: string;
  nameBn: string;
   today: string;
    id: number 
    unit:string
    change:{
        dir:string
        pct:number
    }
}

const Marquee = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products',
        {
            cache:"force-cache"
        }
    )
    const headlines:IHeadline[] = await res.json()
    const unitInBangla: Record<string, string> = {
        kg: "কেজি",
        gram: "গ্রাম",
        liter: "লিটার",
        piece: "পিস",
    };
     const toBanglaNumber = (number: number | string) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return number
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};
    
    return (
        <div className='bg-base-100 mt-5'>
            <MarqueeText direction='right' duration={15} >
                {headlines.map(head => (
                    <span key={head.id} className='mx-3.5'>
                        <span>{head.categoryIcon}</span>
                        <span>{head.nameBn}</span>
                        
                        <span className='mx-1'>{toBanglaNumber(head.today)} টাকা / {unitInBangla[head.unit] || head.unit}</span>
                        
                        <span
    className={`mx-1 font-semibold ${
        head.change.dir === "up"
            ? "text-green-500"
            : head.change.dir === "down"
            ? "text-red-500"
            : "text-gray-500"
    }`}
>
    {head.change.dir === "up"
        ? "▲"
        : head.change.dir === "down"
        ? "▼"
        : "—"}

    {" "}
    {toBanglaNumber(Math.abs(head.change.pct))}%
</span>
                    </span>
                ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;