import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    quote: "FinLeads helped me get my first premium credit card with zero hassle. The consultation was truly expert and saved me hours of research.",
    rating: 5,
    avatar: "https://picsum.photos/seed/rahul/100/100"
  },
  {
    name: "Priya Patel",
    role: "Business Owner",
    quote: "Securing a business loan was a breeze with their help. They understood my requirements perfectly and found the best interest rates available.",
    rating: 5,
    avatar: "https://picsum.photos/seed/priya/100/100"
  },
  {
    name: "Amit Verma",
    role: "Marketing Manager",
    quote: "I was confused about health insurance options, but the team at FinLeads simplified everything. Highly recommend their free consultation!",
    rating: 4,
    avatar: "https://picsum.photos/seed/amit/100/100"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Testimonials</h2>
          <p className="text-4xl md:text-5xl font-bold text-gray-900">What Our Customers Say</p>
          <p className="text-lg text-gray-600">
            Join thousands of satisfied customers who have achieved their financial goals with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-3xl relative group hover:bg-blue-50 transition-colors"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-blue-100 group-hover:text-blue-200 transition-colors" />
              
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
