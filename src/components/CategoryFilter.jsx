import { motion } from 'framer-motion';
import { Sparkles, Pizza, Beef, Soup, Coffee, Sandwich } from 'lucide-react';
import { CATEGORIES } from '../data/menuData';

const iconMap = {
  Sparkles,
  Pizza,
  Beef,
  Soup,
  Coffee,
  Sandwich,
};

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
      {CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon];
        const isActive = activeCategory === cat.id;

        return (
          <motion.button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              isActive
                ? 'bg-coffee-500 text-white shadow-lg shadow-coffee-500/25'
                : 'bg-white/60 text-espresso-700 hover:bg-white hover:shadow-md'
            }`}
          >
            <Icon className="w-4 h-4" />
            {cat.label}
          </motion.button>
        );
      })}
    </div>
  );
}
