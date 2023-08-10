import Feature from "./Feature";
import Hero from "./Hero";
import Navbar from "./Navbar";

export default function LandingBody() {
  return (
    <div className="bg-white">
      <header>
        <Navbar />
      </header>
      <Hero />
      <Feature />
    </div>
  );
}
