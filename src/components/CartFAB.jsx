import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import useCartStore from '../store/useCartStore';

export default function CartFAB() {
  const items = useCartStore((s) => s.items);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = items.reduce((t, i) => t + i.quantity, 0);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleCart}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-coffee-500 text-white rounded-full shadow-xl shadow-coffee-500/30 flex items-center justify-center sm:hidden"
        >
          <ShoppingBag className="w-5 h-5" />
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-espresso-950 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {count}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
