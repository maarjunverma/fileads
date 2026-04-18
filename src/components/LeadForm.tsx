import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import GenericLeadForm from './GenericLeadForm';

export default function LeadForm() {
  return (
    <section id="lead-form" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Get Started</h2>
            <p className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Ready to Secure Your <br />
              <span className="text-blue-600">Financial Future?</span>
            </p>
            <p className="text-lg text-gray-600 max-w-md">
              Fill out the form and our expert consultants will get back to you within 24 hours for a free consultation.
            </p>
          </div>

          <div className="space-y-6">
            {[
              'Expert financial advice tailored to you',
              'Access to 50+ banking partners',
              'Zero hidden charges or processing fees',
              '100% data privacy and security',
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="bg-blue-100 p-1 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl shadow-blue-100 p-8 md:p-12 border border-gray-100"
        >
          <GenericLeadForm />
        </motion.div>
      </div>
    </section>
  );
}
