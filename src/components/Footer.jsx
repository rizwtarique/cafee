import { motion } from 'framer-motion';
import { Coffee, Instagram, Facebook, Twitter, Heart, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-espresso-950 text-white overflow-hidden">
      <div className="absolute inset-0 noise-overlay opacity-30" />

      <div className="relative z-10">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-coffee-500 rounded-xl">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-xl font-bold">TRBC</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {CAFE_INFO.name} — where artisanal coffee meets culinary excellence. 
                Every visit is a new discovery.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: CAFE_INFO.social.instagram },
                  { icon: Facebook, href: CAFE_INFO.social.facebook },
                  { icon: Twitter, href: CAFE_INFO.social.twitter },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 hover:bg-coffee-500 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Our Menu', 'About Us', 'Gallery', 'Careers', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 text-sm hover:text-coffee-400 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-coffee-400 mt-0.5 shrink-0" />
                  <span className="text-white/50 text-sm">{CAFE_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-coffee-400 shrink-0" />
                  <a href={`tel:${CAFE_INFO.phone}`} className="text-white/50 text-sm hover:text-coffee-400 transition-colors">
                    {CAFE_INFO.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-coffee-400 shrink-0" />
                  <a href={`mailto:${CAFE_INFO.email}`} className="text-white/50 text-sm hover:text-coffee-400 transition-colors">
                    {CAFE_INFO.email}
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-display text-lg font-semibold mb-4">Hours</h4>
              <div className="space-y-2 text-sm text-white/50">
                <p>{CAFE_INFO.hours}</p>
                <p className="text-coffee-400 text-xs mt-4">Dine-in | Takeaway | Delivery</p>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} {CAFE_INFO.name}. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/30 text-xs hover:text-coffee-400 transition-colors group"
            >
              Back to top
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
