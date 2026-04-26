import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';

// FIX: Removed trailing slash to prevent double-slashes in the request (//api/finleads)
const STRAPI_URL = 'https://api.madsag.in'; 

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Credit Card',
    message: '',
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter a valid 10-digit phone number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    setErrorMessage(null);

    try {
      /**
       * CONFIGURATION ALIGNED WITH QUOTEMODAL:
       * 1. Explicitly wrapping payload in a "data" object for Strapi v4/v5.
       * 2. Using clean URL concatenation.
       * 3. Pluralized endpoint 'finleads' as per Strapi conventions.
       */
      const response = await axios.post(`${STRAPI_URL}/api/finleads`, {
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
 

      // Strapi returns 201 Created for new entries
      if (response.status === 200 || response.status === 201) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: 'Credit Card', message: '' });
        
        // Auto-reset success state after 3.5s (similar to your QuoteModal logic)
        setTimeout(() => {
          setStatus('idle');
        }, 3500);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus('error');
      
      // FIX: Improved error extraction to catch Strapi's nested error messages
      const detail = error.response?.data?.error?.message || error.message || 'Server connection failed';
      setErrorMessage(detail);
    }
  };

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
          {status === 'success' ? (
            <div className="text-center py-12 space-y-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                <p className="text-gray-600">Strategic brief received. Deployment coordinators will initiate contact within 24 standard business hours.</p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="text-blue-600 font-bold hover:underline"
              >
                Book another consultation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    disabled={status === 'loading'}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:opacity-50`}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                    disabled={status === 'loading'}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:opacity-50`}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  disabled={status === 'loading'}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:opacity-50`}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Service Interested In</label>
                <select
                  id="service"
                  name="service"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none bg-white disabled:opacity-50"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option>Credit Card</option>
                  <option>Personal Loan</option>
                  <option>Home Loan</option>
                  <option>Insurance</option>
                  <option>Business Loan</option>
                  <option>Investment Plan</option>
                </select>
                </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Additional Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  disabled={status === 'loading'}
                  placeholder="Tell us more about your requirements..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none disabled:opacity-50"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                disabled={status === 'loading'}
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-100"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span>INITIATE CONSULTATION</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
                   <div className="text-red-600 font-bold text-sm">
                    <p>Submission Error: {errorMessage || 'Something went wrong.'}</p>
                   </div>
                </div>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}