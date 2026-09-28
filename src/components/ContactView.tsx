import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
          Copperbelt Province, Zambia
        </span>
        <h1 className="font-serif-crest text-3xl sm:text-4xl font-bold text-slate-900">
          Contact Admissions &amp; Campus Registry
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have questions regarding online applications, certified document verification, or student results? Reach out to our registry team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Kitwe School Campus Information
            </h3>

            <div className="flex items-start gap-3 text-xs text-slate-700">
              <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-semibold">Physical Location:</strong>
                <span>Kitwe Teaching Hospital Grounds, Kuomboka Road, Parklands, P.O. Box 20969, Kitwe, Zambia</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-700">
              <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-semibold">Admissions &amp; Enquiries Hotline:</strong>
                <span>+260 (212) 226-315 / +260 97 784 2190 / +260 96 612 4490</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-700">
              <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-semibold">Official Email:</strong>
                <span>admissions@ksnm.ac.zm / principal@ksnm.ac.zm</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-700">
              <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-semibold">Office Hours:</strong>
                <span>Monday – Friday: 08:00 – 17:00 hrs (Closed on Public Holidays)</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-sky-950 to-slate-900 text-white rounded-2xl p-6 space-y-2 shadow-md border border-sky-800/40">
            <h4 className="font-serif-crest text-sky-300 font-bold text-sm">
              Kitwe Teaching Hospital Clinical Affiliation
            </h4>
            <p className="text-xs text-sky-100 leading-relaxed">
              Located within the Kitwe Teaching Hospital medical perimeter, enabling students immediate transition between theoretical lecture halls and inpatient ward clinical practicums.
            </p>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="font-bold text-base text-slate-900">Send an Enquiry to Admissions</h3>
          
          {sent && (
            <div className="p-3.5 bg-sky-100 border border-sky-300 rounded-xl text-xs text-sky-900 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Thank you! Your message has been routed to the Admissions Officer. We will respond via phone or email shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kondwani Phiri"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+260 97 ..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Enquiry Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Ask about entry requirements, fee schedules, or application deadlines..."
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Enquiry</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
