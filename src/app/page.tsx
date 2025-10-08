import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Solutions from './components/Solutions';

export default function Home() {
  return (
    <>
      <main className="main-container">
        <h1>Welcome to Our Website</h1>
        <p>We are glad to have you here.</p>
        <Navbar />
        <Hero />
        <Solutions />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
