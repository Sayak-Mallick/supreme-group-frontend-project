import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Solutions from './components/Solutions';

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <Solutions />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
