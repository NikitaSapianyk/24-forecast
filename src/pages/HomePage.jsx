import Header from "../components/Header";
import Hero from "../components/Hero";
import WeatherSection from "../components/WeatherSection";
import News from "../components/News";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <WeatherSection />
      <News />
      <Gallery />
      <Footer />
    </>
  );
}
