
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

// Moved definition up and added explicit typing for children
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
    {icon}
  </a>
);

// Moved definition up and used React.FC to correctly type children prop
const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <li>
    <Link to={to} className="hover:text-blue-500 hover:pl-2 transition-all duration-300">
      {children}
    </Link>
  </li>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-8 border-orange-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">OX</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">OXCITIZEN</span>
            </div>
            <p className="mb-6 leading-relaxed">
              Your comprehensive digital gateway to all citizen services in India. Making government simple, accessible, and transparent for every Indian.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Linkedin size={20} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Useful Links</h4>
            <ul className="space-y-4">
              <FooterLink to="/services">All Services</FooterLink>
              <FooterLink to="/schemes">Government Schemes</FooterLink>
              <FooterLink to="/jobs">Job Opportunities</FooterLink>
              <FooterLink to="/emergency">Emergency Hub</FooterLink>
              <FooterLink to="/tools">Citizen Tools</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 mt-1 shrink-0" size={18} />
                <span>123 Government Plaza, New Delhi, India - 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-blue-500 shrink-0" size={18} />
                <span>1800-123-4567 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-500 shrink-0" size={18} />
                <span>support@oxcitizen.gov.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Stay Updated</h4>
            <p className="mb-4 text-sm">Subscribe to our newsletter for latest schemes and job updates.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-gray-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-1 top-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold text-sm transition-colors">
                Go
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 OXCITIZEN. An initiative for Digital India. 🇮🇳</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
