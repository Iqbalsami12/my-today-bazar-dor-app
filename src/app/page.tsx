import HeroSection from "@/components/Hero";
import ReducedPrice from "@/components/ReducedPrice";

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection></HeroSection>

     <section className="mt-10">
       <h2 className="font-bold text-3xl"><span className="text-red-500">▼</span> আজ দাম বেড়েছে</h2>
      <ReducedPrice></ReducedPrice>
     </section>
    </div>
  );
}
