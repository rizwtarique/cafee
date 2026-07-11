import { motion } from 'framer-motion';
import { Clock, Phone, Mail, MapPin, Instagram, Facebook, Twitter, ExternalLink } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export default function InfoSection() {
  const infoCards = [
    {
      icon: Clock,
      title: 'Opening Hours',
      content: CAFE_INFO.hours,
      subtext: 'Open all 7 days',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: CAFE_INFO.phone,
      href: `tel:${CAFE_INFO.phone}`,
    },
    {
      icon: Mail,
      title: 'Email',
      content: CAFE_INFO.email,
      href: `mailto:${CAFE_INFO.email}`,
    },
    {
      icon: MapPin,
      title: 'Address',
      content: CAFE_INFO.address,
    },
  ];

  const socials = [
    { icon: Instagram, label: 'Instagram', href: CAFE_INFO.social.instagram, color: 'from-pink-500 to-purple-500' },
    { icon: Facebook, label: 'Facebook', href: CAFE_INFO.social.facebook, color: 'from-blue-500 to-blue-600' },
    { icon: Twitter, label: 'Twitter', href: CAFE_INFO.social.twitter, color: 'from-sky-400 to-sky-500' },
  ];

  return (
    <section id="info" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-coffee-500 text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
            Visit Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 mb-4">
            Come Say <span className="text-gradient">Hello</span>
          </h2>
          <p className="text-espresso-600 text-lg max-w-2xl mx-auto">
            We would love to host you at our space. Drop by for a cup of coffee and a conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {infoCards.map((card, i) => {
            const Icon = card.icon;
            const Wrapper = card.href ? 'a' : 'div';
            const wrapperProps = card.href ? { href: card.href } : {};

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="block h-full bg-cream-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-coffee-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-coffee-500 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-coffee-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-espresso-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-espresso-600 leading-relaxed">{card.content}</p>
                  {card.subtext && (
                    <p className="text-xs text-coffee-500 mt-2">{card.subtext}</p>
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="font-display text-2xl font-bold text-espresso-950 mb-6">Follow Our Journey</h3>
          <div className="flex justify-center gap-4">
            {socials.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-2 px-5 py-3 bg-gradient-to-r ${color} text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
