import BgGradient from "@/components/common/bg-gradient";
import CTASection from "@/components/home/cta-section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorkSection from "@/components/home/how-it-work-section";
import PricingSection from "@/components/home/pricing-section";

const Home = () => {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorkSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Home;
