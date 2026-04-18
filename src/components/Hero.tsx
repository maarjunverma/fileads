import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import { partners } from '../data/partners';

export default function Hero() {
  const scrollToForm = () => {
    const form = document.getElementById('lead-form');
    form?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Trusted by 10,000+ Customers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
            Smart Financial <br />
            <span className="text-blue-600">Solutions</span> for Your <br />
            Future Growth.
          </h1>
          
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            Get expert guidance on Credit Cards, Loans, and Insurance. 
            We help you choose the best financial products tailored to your needs.
          </p>

          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Our Top Partners</p>
            <div className="flex flex-wrap gap-6 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              {partners.slice(0, 4).map((partner) => (
                <img 
                  key={partner.name} 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-6 md:h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              ))}
              <span className="text-xs font-bold text-gray-400">+ many more</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-blue-200"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4 px-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-gray-900">4.9/5 Rating</p>
                <p className="text-gray-500">from 2k+ reviews</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 pt-2">
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="bg-gray-100 p-1 rounded-full">
                <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="bg-gray-100 p-1 rounded-full">
                <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider">Privacy Assured</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">0%</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Processing Fee</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">24h</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Fast Approval</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Digital Process</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1573163281514-8746059d47a4?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Financial Growth Advisor" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          
          {/* Floating Cards */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center space-x-3 border border-gray-50"
          >
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Credit Score</p>
              <p className="text-lg font-bold text-gray-900">780+</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center space-x-3 border border-gray-50"
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Instant Loan</p>
              <p className="text-lg font-bold text-gray-900">₹5 Lakhs</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
