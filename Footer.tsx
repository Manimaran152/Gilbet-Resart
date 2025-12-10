import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-tamil-earth text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-serif font-bold text-tamil-gold mb-6">Gillbet Resart</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Bringing the ancient flavors of the Pandyas and Cholas to your plate. Experience the true essence of Tamil hospitality.
            </p>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="hover:text-tamil-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-tamil-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-tamil-gold transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-6 text-tamil-cream">Contact Us</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="w-5 h-5 text-tamil-gold" />
                <span>124 Temple Street, Chennai, TN</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-5 h-5 text-tamil-gold" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-5 h-5 text-tamil-gold" />
                <span>reservations@gillbetresart.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-6 text-tamil-cream">Opening Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between md:justify-start gap-8 border-b border-white/10 pb-2">
                <span>Mon - Fri</span>
                <span>11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between md:justify-start gap-8 border-b border-white/10 pb-2">
                <span>Sat - Sun</span>
                <span>10:00 AM - 12:00 AM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Gillbet Resart. All Rights Reserved. Designed with Tamil Love.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
