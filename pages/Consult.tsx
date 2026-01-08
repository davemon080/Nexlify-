
import React, { useState } from 'react';
import { 
  EnvelopeIcon, 
  MapPinIcon, 
  PhoneIcon,
  CheckBadgeIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { useData } from '../context/DataContext';

const Inquiry: React.FC = () => {
  const { addEnquiry } = useData();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    service: 'Web Development',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile) return;
    
    addEnquiry(form);
    setSubmitted(true);
    setForm({ name: '', email: '', mobile: '', service: 'Web Development', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-7xl mx-auto">
      <div className="mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
          Project <span className="text-gradient">Inquiry</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl">
          Start a conversation about your digital future. Fill out the form below or reach out directly to our strategy team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7 reveal">
          <div className="glass rounded-[2rem] p-6 md:p-10 border border-slate-200 dark:border-white/10 shadow-2xl shadow-primary/5">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
              <EnvelopeIcon className="w-6 h-6 mr-3 text-primary" />
              Send a Brief
            </h3>
            
            {submitted ? (
              <div className="p-8 text-center bg-green-500/10 border border-green-500/20 rounded-2xl animate-in zoom-in-95">
                <CheckBadgeIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h4>
                <p className="text-slate-500">Thank you. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-all outline-none"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-all outline-none"
                      placeholder="jane@nexlify.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Mobile Number</label>
                  <div className="relative">
                    <DevicePhoneMobileIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-all outline-none"
                      placeholder="+1 (555) 000-0000"
                      value={form.mobile}
                      onChange={e => setForm({...form, mobile: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Service Type</label>
                  <select 
                    className="w-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-all outline-none appearance-none"
                    value={form.service}
                    onChange={e => setForm({...form, service: e.target.value})}
                  >
                    <option>Web Development</option>
                    <option>Graphic Design</option>
                    <option>Content Writing</option>
                    <option>Full Agency Retainer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-all outline-none resize-none"
                    placeholder="Tell us about your project goals..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-10 reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Presence</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-semibold">Call Us</p>
                  <p className="text-slate-500 dark:text-slate-400">+1 (555) 789-0123</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPinIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-semibold">Office</p>
                  <p className="text-slate-500 dark:text-slate-400">Nexlify HQ, Tech Plaza<br />San Jose, CA 95113</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 glass border border-slate-200 dark:border-white/5 rounded-[2rem] bg-primary/5">
            <h4 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center">
              <CheckBadgeIcon className="w-5 h-5 mr-2 text-primary-light" />
              The Nexlify Promise
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center">• 24-hour response time</li>
              <li className="flex items-center">• Custom-tailored solutions</li>
              <li className="flex items-center">• Direct access to lead designers</li>
              <li className="flex items-center">• Milestone-based delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
