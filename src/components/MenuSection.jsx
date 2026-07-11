import { useState } from 'react';
import { motion } from 'framer-motion';
import CategoryFilter from './CategoryFilter';
import MenuItem from './MenuItem';
import { MENU_ITEMS } from '../data/menuData';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="section-padding bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-coffee-500 text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
            Our Menu
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 mb-4">
            Crafted With <span className="text-gradient">Passion</span>
          </h2>
          <p className="text-espresso-600 text-lg max-w-2xl mx-auto">
            From artisan pizzas to hand-crafted coffees, every dish is a journey of flavors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-espresso-400 text-lg">No items found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
