import { motion } from 'motion/react';
import { CreditCard, Landmark, Shield, Wallet, Briefcase, PieChart } from 'lucide-react';

const services = [
  {
    title: 'Credit Cards',
    description: 'Get the best credit cards with high rewards, cashback, and zero annual fees.',
    icon: CreditCard,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    title: 'Personal Loans',
    description: 'Quick approval and low-interest rates for all your personal financial needs.',
    icon: Wallet,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    title: 'Home Loans',
    description: 'Turn your dream home into reality with our flexible home loan options.',
    icon: Landmark,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
  {
    title: 'Insurance',
    description: 'Secure your family\'s future with comprehensive life and health insurance.',
    icon: Shield,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
  },
  {
    title: 'Business Loans',
    description: 'Fuel your business growth with our tailored financial solutions for SMEs.',
    icon: Briefcase,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
  {
    title: 'Investment Plans',
    description: 'Grow your wealth with expert-curated mutual funds and SIP options.',
    icon: PieChart,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Our Services</h2>
          <p className="text-4xl md:text-5xl font-bold text-gray-900">
            Comprehensive Financial Products for Every Need
          </p>
          <p className="text-lg text-gray-600">
            We partner with India's leading banks and financial institutions to bring you the best deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className={`${service.lightColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-7 h-7 ${service.textColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-2 transition-transform">
                <span>Learn More</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
