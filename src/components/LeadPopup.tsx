import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import GenericLeadForm from './GenericLeadForm';

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasBeenShown) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      const scrollPercent = (scrollPos / scrollHeight) * 100;

      if (scrollPercent >= 20) {
        setIsOpen(true);
        setHasBeenShown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasBeenShown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              aria-label="Close popup"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>

            <div className="p-8 pt-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Claim Your Free Consultation</h3>
                <p className="text-gray-600">
                  Don't miss out on expert financial advice. Fill the form below to get started!
                </p>
              </div>

              <GenericLeadForm onSuccess={() => setTimeout(() => setIsOpen(false), 3000)} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
