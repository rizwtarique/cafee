import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { formatPrice } from '../data/menuData';

export default function Cart() {
  const {
    items,
    isCartOpen,
    closeCart,
    openCheckout,
    removeItem,
    clearItem,
    getTotal,
    getItemCount,
  } = useCartStore();

  const total = getTotal();
  const count = getItemCount();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-cream-50 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-coffee-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-coffee-500 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-espresso-950">Your Cart</h3>
                  <p className="text-xs text-espresso-500">{count} {count === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-coffee-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-espresso-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-coffee-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-coffee-300" />
                  </div>
                  <p className="text-espresso-500 font-medium mb-2">Your cart is empty</p>
                  <p className="text-espresso-400 text-sm">Add some delicious items to get started</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="flex gap-3 bg-white p-3 rounded-xl shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-espresso-900 text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-coffee-600 font-bold text-sm mt-0.5">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 hover:bg-coffee-50 rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3 text-espresso-600" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => useCartStore.getState().addItem(item)}
                            className="p-1 hover:bg-coffee-50 rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3 text-espresso-600" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => clearItem(item.id)}
                          className="p-1 hover:bg-red-50 rounded-full transition-colors group"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-espresso-300 group-hover:text-red-500 transition-colors" />
                        </button>
                        <span className="text-xs font-bold text-espresso-700">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-coffee-100 bg-white/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-espresso-600 font-medium">Total</span>
                  <span className="text-2xl font-display font-bold text-espresso-950">
                    {formatPrice(total)}
                  </span>
                </div>
                <button
                  onClick={openCheckout}
                  className="w-full btn-primary text-center !text-base"
                >
                  Order Now — Pay at Counter
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
