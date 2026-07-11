import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Star, ShoppingBag } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { formatPrice } from '../data/menuData';

export default function MenuItem({ item }) {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const getItemQuantity = useCartStore((s) => s.getItemQuantity);
  const quantity = getItemQuantity(item.id);
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef(null);

  const handleAdd = () => {
    addItem(item);
    setJustAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setJustAdded(false), 800);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/90 backdrop-blur-sm text-espresso-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-coffee-500/90 backdrop-blur-sm">
          <Star className="w-3 h-3 text-white fill-white" />
          <span className="text-xs font-semibold text-white">{item.rating}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-display text-lg font-bold text-espresso-900 mb-1.5 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-espresso-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-coffee-600 font-display">
            {formatPrice(item.price)}
          </span>

          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add-btn"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-coffee-500 text-white text-sm font-semibold rounded-full hover:bg-coffee-600 transition-colors active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Add
              </motion.button>
            ) : (
              <motion.div
                key="counter"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-3 bg-coffee-50 rounded-full px-1"
              >
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-coffee-600 hover:text-coffee-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <motion.span
                  key={quantity}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="font-semibold text-espresso-900 w-5 text-center"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={handleAdd}
                  className="p-2 text-coffee-600 hover:text-coffee-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -50, scale: 1 }}
            exit={{ opacity: 0, y: -70 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-4 right-4 z-10"
          >
            <div className="bg-coffee-500 text-white p-2 rounded-full shadow-lg">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
