
import Speechtool from "./Components/Speechtool";
import Nav from "./Components/Nav";
import Hero from "./Components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto items-center justify-center font-sans">
      <Nav/>
      <Hero/>
      <Speechtool/>
    </div>
  );
}
