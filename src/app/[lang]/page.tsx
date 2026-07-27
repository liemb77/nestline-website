import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Founder from "@/components/Founder";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import WhyNestline from "@/components/WhyNestline";
import BookingProcess from "@/components/BookingProcess";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Founder />
        <Marquee />
        <Problem />
        <Services />
        <WhyNestline />
        <BookingProcess />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
