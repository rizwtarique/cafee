import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Loader2, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { submitOrder } from '../services/api';
import { formatPrice } from '../data/menuData';

export default function Checkout() {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    getTotal,
    setOrderSuccess,
  } = useCartStore();

  const [loading, setLoading] = useState(false);
  const total = getTotal();

  const handleOrder = async () => {
    setLoading(true);
    try {
      const result = await submitOrder({
        items_array: items.map((item) => ({
          dish_id: item.id,
          name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        total_amount: total,
      });
      setOrderSuccess(result.data);
    } catch {
      setOrderSuccess({
        order_id: `ORD-${Date.now()}-ERR`,
        items_array: items.map((i) => ({ dish_id: i.id, quantity: i.quantity })),
        total_amount: total,
        status: 'pending_payment',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCheckout}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg bg-cream-50 rounded-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-coffee-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={closeCheckout}
                  className="p-1 hover:bg-coffee-50 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-espresso-600" />
                </button>
                <h3 className="font-display text-xl font-bold text-espresso-950">Checkout</h3>
              </div>
              <button
                onClick={closeCheckout}
                className="p-2 hover:bg-coffee-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-espresso-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-coffee-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-espresso-900">{item.name}</p>
                        <p className="text-xs text-espresso-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-espresso-800">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-coffee-500" />
                  <span className="text-sm font-semibold text-espresso-800">Payment Method</span>
                </div>
                <div className="p-3 bg-coffee-50 rounded-lg">
                  <p className="text-sm font-medium text-espresso-800">Pay at Counter</p>
                  <p className="text-xs text-espresso-500">Pay when you collect your order</p>
                </div>
              </div>

              <div className="bg-coffee-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-espresso-600 font-medium">Grand Total</span>
                  <span className="text-2xl font-display font-bold text-espresso-950">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-coffee-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOrder}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Confirm Order'
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
