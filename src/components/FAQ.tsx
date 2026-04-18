import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What documents are required for a Personal Loan?",
    answer: "Typically, you'll need identity proof (Aadhar/PAN), address proof, and income proof (last 3 months' salary slips and 6 months' bank statements)."
  },
  {
    question: "How long does the credit card approval process take?",
    answer: "Most of our partner banks offer instant in-principle approval. The physical card usually reaches you within 7-10 working days after successful verification."
  },
  {
    question: "Is there any fee for your consultation services?",
    answer: "No, our consultation and assistance services are 100% free for customers. We partner with banks to bring you the best deals at no extra cost."
  },
  {
    question: "Can I apply for a loan with a low credit score?",
    answer: "While a higher score (750+) is ideal, we have partners who cater to various credit profiles. We can help you find the best possible option for your current score."
  },
  {
    question: "What is the maximum loan amount I can get?",
    answer: "The loan amount depends on your income, existing liabilities, and the type of loan. For personal loans, it can go up to ₹40 Lakhs, and for home loans, it depends on the property value."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">FAQ</h2>
          <p className="text-4xl font-bold text-gray-900">Frequently Asked Questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-blue-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
