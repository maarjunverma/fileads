import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-blue-400">FinLeads</h3>
          <p className="text-gray-400 text-sm">
            Empowering your financial future with expert advice and tailored solutions. 
            Trusted by thousands for credit cards, loans, and insurance.
          </p>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Home</li>
            <li className="hover:text-white cursor-pointer transition-colors">Services</li>
            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Credit Cards</li>
            <li className="hover:text-white cursor-pointer transition-colors">Personal Loans</li>
            <li className="hover:text-white cursor-pointer transition-colors">Home Loans</li>
            <li className="hover:text-white cursor-pointer transition-colors">Insurance</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="flex items-center space-x-3 text-gray-400 text-sm">
            <Phone className="w-4 h-4" />
            <span>+91 12345 67890</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400 text-sm">
            <Mail className="w-4 h-4" />
            <span>support@finleads.com</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" />
            <span>123 Financial District, Mumbai, India</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} FinLeads. All rights reserved.
      </div>
    </footer>
  );
}
