import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Menu from './components/Menu';
import InteractiveChef from './components/InteractiveChef';
import Footer from './components/Footer';
import { Menu as MenuIcon, X } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans">
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className={`text-2xl font-serif font-bold tracking-tighter ${isScrolled ? 'text-tamil-earth' : 'text-white'}`}>
            Gillbet Resart
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className={`font-medium text-sm uppercase tracking-widest hover:text-tamil-saffron transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Home</a>
            <a href="#menu" className={`font-medium text-sm uppercase tracking-widest hover:text-tamil-saffron transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Menu</a>
            <a href="#vision" className={`font-medium text-sm uppercase tracking-widest hover:text-tamil-saffron transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>AI Chef</a>
            <button className="bg-tamil-saffron text-white px-6 py-2 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-orange-600 transition-colors shadow-lg">
              Book Table
            </button>
          </div>

          {/* Mobile Nav Button */}
          <button 
            className="md:hidden text-tamil-saffron"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <MenuIcon className={`w-8 h-8 ${isScrolled ? 'text-tamil-earth' : 'text-white'}`} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col space-y-6 animate-fade-in border-t border-gray-100">
            <a href="#" className="text-gray-800 font-bold text-lg hover:text-tamil-saffron transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#menu" className="text-gray-800 font-bold text-lg hover:text-tamil-saffron transition-colors" onClick={() => setMobileMenuOpen(false)}>Menu</a>
            <a href="#vision" className="text-gray-800 font-bold text-lg hover:text-tamil-saffron transition-colors" onClick={() => setMobileMenuOpen(false)}>AI Chef Vision</a>
            <button className="bg-tamil-earth text-white py-3 rounded-lg font-bold w-full shadow-md">
              Reserve a Table
            </button>
          </div>
        )}
      </nav>

      <Hero />
      <InteractiveChef />
      <Menu />
      
      {/* Cultural Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative group">
              <div className="absolute top-4 -left-4 w-full h-full border-2 border-tamil-saffron z-0 transition-transform duration-500 group-hover:top-3 group-hover:-left-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1606491956689-2ea28c674675?q=80&w=800&auto=format&fit=crop" 
                alt="Traditional Tamil Banana Leaf Feast" 
                className="relative z-10 w-full rounded shadow-xl transform transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <span className="text-tamil-saffron uppercase tracking-widest font-bold text-sm mb-2 block">Our Tradition</span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-tamil-earth mb-6">A Legacy of Taste</h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              At <span className="font-bold text-tamil-earth">Gillbet Resart</span>, we believe that food is not just sustenance, but a story passed down through generations. Our recipes hail from the royal kitchens of the Chettinad region and the humble, flavorful streets of Madurai.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              We embrace the philosophy of <strong>"Virundhombal"</strong> — the ancient Tamil virtue of hospitality. Here, every guest is treated like a deity, and every meal served on a banana leaf is a divine offering connecting you to the soil of Tamil Nadu.
            </p>
            <div className="flex gap-4">
              <div className="bg-tamil-cream p-5 rounded-lg text-center w-1/3 border border-tamil-saffron/20 hover:border-tamil-saffron/50 transition-colors">
                <span className="block text-3xl font-bold text-tamil-saffron">50+</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Authentic Dishes</span>
              </div>
              <div className="bg-tamil-cream p-5 rounded-lg text-center w-1/3 border border-tamil-saffron/20 hover:border-tamil-saffron/50 transition-colors">
                <span className="block text-3xl font-bold text-tamil-saffron">1998</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Established</span>
              </div>
              <div className="bg-tamil-cream p-5 rounded-lg text-center w-1/3 border border-tamil-saffron/20 hover:border-tamil-saffron/50 transition-colors">
                <span className="block text-3xl font-bold text-tamil-saffron">4.9</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">User Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;