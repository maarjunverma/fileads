import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { partners } from '../data/partners';

export default function Partners() {
  const [selectedPartner, setSelectedPartner] = useState<typeof partners[0] | null>(null);

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-gray-400 text-sm font-bold uppercase tracking-widest mb-10">
          Our Banking & Financial Partners (Click to view details)
        </p>
        
        <div className="relative">
          {/* Gradient Overlays for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div 
            className="flex space-x-12 items-center"
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {/* Double the array for seamless loop */}
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedPartner(partner)}
                className="flex-shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer outline-none focus:grayscale-0 focus:opacity-100"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-8 md:h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Partner Detail Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPartner(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-auto flex items-center">
                    <img 
                      src={selectedPartner.logo} 
                      alt={selectedPartner.name} 
                      className="h-full w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button 
                    onClick={() => setSelectedPartner(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPartner.name}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedPartner.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Top Services</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedPartner.services.map((service, i) => (
                        <div key={i} className="flex items-center space-x-2 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm font-medium">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => {
                        setSelectedPartner(null);
                        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                    >
                      Apply via FinLeads
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
