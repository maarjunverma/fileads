import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

const partners = [
  { 
    name: 'HDFC Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1200px-HDFC_Bank_Logo.svg.png',
    description: 'HDFC Bank is one of India\'s leading private sector banks offering a wide range of financial products.',
    services: ['Credit Cards', 'Personal Loans', 'Home Loans', 'Savings Accounts']
  },
  { 
    name: 'ICICI Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/1200px-ICICI_Bank_Logo.svg.png',
    description: 'ICICI Bank offers a diverse portfolio of financial services to corporate and retail customers.',
    services: ['Instant Loans', 'Credit Cards', 'Wealth Management', 'Insurance']
  },
  { 
    name: 'Axis Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Axis_Bank_logo.svg/1200px-Axis_Bank_logo.svg.png',
    description: 'Axis Bank is the third largest private sector bank in India, providing a suite of financial services.',
    services: ['Business Loans', 'Credit Cards', 'Fixed Deposits', 'Education Loans']
  },
  { 
    name: 'SBI Card', 
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/SBI_Card_logo.svg/1200px-SBI_Card_logo.svg.png',
    description: 'SBI Card is a leading credit card issuer in India, offering various reward-centric cards.',
    services: ['Shopping Cards', 'Travel Cards', 'Fuel Cards', 'Premium Cards']
  },
  { 
    name: 'IDFC First', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/IDFC_First_Bank_logo.svg/1200px-IDFC_First_Bank_logo.svg.png',
    description: 'IDFC First Bank is focused on providing technology-led banking solutions to its customers.',
    services: ['Zero Fee Cards', 'Personal Loans', 'Consumer Durable Loans', 'Savings Accounts']
  },
  { 
    name: 'Kotak', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kotak_Mahindra_Bank_logo.svg/1200px-Kotak_Mahindra_Bank_logo.svg.png',
    description: 'Kotak Mahindra Bank offers tailored financial solutions across banking, insurance, and investments.',
    services: ['811 Savings Account', 'Credit Cards', 'Car Loans', 'Mutual Funds']
  },
  { 
    name: 'IndusInd', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/IndusInd_Bank_Logo.svg/1200px-IndusInd_Bank_Logo.svg.png',
    description: 'IndusInd Bank is known for its innovative customer-centric banking products and services.',
    services: ['Aura Edge Card', 'Personal Loans', 'Vehicle Loans', 'Forex Services']
  },
  { 
    name: 'Yes Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Yes_Bank_Logo.svg/1200px-Yes_Bank_Logo.svg.png',
    description: 'Yes Bank provides a range of banking and financial services to corporate and retail segments.',
    services: ['Digital Banking', 'Credit Cards', 'Enterprise Loans', 'Insurance']
  },
];

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
