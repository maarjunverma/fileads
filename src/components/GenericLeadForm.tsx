import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';

interface GenericLeadFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function GenericLeadForm({ onSuccess, className = "" }: GenericLeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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

    try {
      const response = await axios.post('/api/finleads', formData);

      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: 'Credit Card', message: '' });
        if (onSuccess) onSuccess();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`text-center py-12 space-y-6 ${className}`}>
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
          <p className="text-gray-600">Your consultation has been booked. We'll contact you shortly.</p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-blue-600 font-bold hover:underline"
        >
          Book another consultation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Full Name</label>
          <input
            required
            type="text"
            placeholder="John Doe"
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Phone Number</label>
          <input
            required
            type="tel"
            placeholder="+91 98765 43210"
            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
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
        <label className="text-sm font-bold text-gray-700">Email Address</label>
        <input
          required
          type="email"
          placeholder="john@example.com"
          className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Service Interested In</label>
        <select
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none bg-white"
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
        <label className="text-sm font-bold text-gray-700">Additional Message (Optional)</label>
        <textarea
          rows={3}
          placeholder="Tell us more about your requirements..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
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
            <span>Book Consultation Now</span>
            <Send className="w-5 h-5" />
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="text-red-500 text-sm font-medium text-center">
          Something went wrong. Please try again later.
        </p>
      )}
    </form>
  );
}
