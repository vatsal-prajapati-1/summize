import BgGradient from "@/components/common/bg-gradient";
import HeroSection from "@/components/home/hero-section";

const Home = () => {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
      </div>
    </div>
  );
};

export default Home;
