import Footer from "@/components/Footer";
import Chatbot from "@/modules/chatbot/components/Chat";
import { HeroSection } from "@landing/components/HeroSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-[80%] mx-auto">
      <main>
        <HeroSection />
        <Chatbot />
      </main>

      <Footer />
    </div>
  );
}