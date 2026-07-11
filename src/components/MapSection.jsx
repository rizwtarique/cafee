import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export default function MapSection() {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5!2d${CAFE_INFO.coordinates.lng}!3d${CAFE_INFO.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3d5b0e4b0b1%3A0x1234567890abcdef!2sHeritage%20Street%2C%20Okhla%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1234567890`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${CAFE_INFO.coordinates.lat},${CAFE_INFO.coordinates.lng}`;

  return (
    <section id="location" className="section-padding bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-coffee-500 text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
            Find Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 mb-4">
            Our <span className="text-gradient">Location</span>
          </h2>
          <p className="text-espresso-600 text-lg max-w-2xl mx-auto">
            Nestled in the heart of Heritage Street, Okhla. Easy to find, hard to forget.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-xl bg-white"
        >
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Roasted Bean Collective Location"
              className="w-full h-full"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="glass rounded-xl p-4 sm:p-5 max-w-md">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-coffee-500 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-espresso-900 mb-1">
                    {CAFE_INFO.name}
                  </h4>
                  <p className="text-sm text-espresso-600">{CAFE_INFO.address}</p>
                </div>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-coffee-500 text-white text-sm font-semibold rounded-lg hover:bg-coffee-600 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
