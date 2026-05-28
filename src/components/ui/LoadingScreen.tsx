import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function LoadingScreen({ show }: { show: boolean }) {
  const { isDarkMode } = useStore();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: isDarkMode
              ? 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0d1b2a 100%)'
              : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          }}
        >
          {/* Animated cross */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1 }}
            className="mb-8"
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-6 h-24 rounded-full"
                  style={{ background: 'linear-gradient(180deg, #e8c97a, #c9a227)' }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-6 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #e8c97a, #c9a227)' }}
                />
              </div>
              {/* Glow effect */}
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(201,162,39,0.3) 0%, transparent 70%)',
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold mb-2 text-center"
            style={{ color: '#e8c97a', fontFamily: 'Cairo, sans-serif' }}
          >
            Egypt Christian Guide
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-300 mb-8"
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            دليل الكنائس والأديرة في مصر
          </motion.p>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #e8c97a, #c9a227)' }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-sm text-gray-400"
          >
            جاري التحميل...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
