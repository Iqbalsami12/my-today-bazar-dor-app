import AllProducts from "@/components/AllProducts";
import HeroSection from "@/components/Hero";
import IncreasedPrice from "@/components/IncreasedPrice";
import ReducedPrice from "@/components/ReducedPrice";

export default function Home() {
  
  return (
    <div className="container mx-auto">
      <HeroSection></HeroSection>

     <section className="mt-10">
       <h2 className="font-bold text-3xl"><span className="text-red-500">▲</span> আজ দাম বেড়েছে</h2>
      <ReducedPrice></ReducedPrice>
     </section>
     <section className="mt-10">
      <h2 className="font-bold text-3xl">
        <span className="text-green-500">▼</span> আজ দাম কমেছে
      </h2>
      <IncreasedPrice></IncreasedPrice>

     </section>

     <section className="mt-10">
      <p className="font-bold text-3xl">সব পণ্য</p>
      <p className="text-gray-500">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
      <AllProducts></AllProducts>
     </section>
    </div>
  );
}
