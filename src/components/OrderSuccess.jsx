import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Copy, PartyPopper, X } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { formatPrice } from '../data/menuData';
import { useState } from 'react';

export default function OrderSuccess() {
  const { orderSuccess, clearOrderSuccess } = useCartStore();
  const [copied, setCopied] = useState(false);

  const copyOrderId = () => {
    if (orderSuccess?.order_id) {
      navigator.clipboard.writeText(orderSuccess.order_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {orderSuccess && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-cream-50 rounded-2xl z-50 overflow-hidden shadow-2xl"
          >
            <button
              onClick={clearOrderSuccess}
              className="absolute top-4 right-4 p-2 hover:bg-coffee-50 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-espresso-600" />
            </button>

            <div className="relative p-8 text-center">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-coffee-500/10 to-transparent" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                className="relative z-10 mb-6"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <PartyPopper className="w-5 h-5 text-coffee-500" />
                  <span className="text-coffee-500 font-semibold text-sm uppercase tracking-wider">
                    Order Placed!
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-espresso-950 mb-2">
                  Thank You!
                </h3>
                <p className="text-espresso-500 text-sm mb-6">
                  Your order has been received. Please pay at the counter when you collect.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-10 bg-white rounded-xl p-4 mb-6"
              >
                <p className="text-xs text-espresso-500 mb-1">Order ID</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-lg font-bold text-espresso-900">
                    {orderSuccess.order_id}
                  </span>
                  <button
                    onClick={copyOrderId}
                    className="p-1.5 hover:bg-coffee-50 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-espresso-400" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-espresso-700 font-semibold mt-3">
                  Total: {formatPrice(orderSuccess.total_amount)}
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearOrderSuccess}
                className="relative z-10 w-full btn-primary"
              >
                Done
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
