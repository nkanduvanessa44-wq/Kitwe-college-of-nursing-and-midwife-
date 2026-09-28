import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  FileCheck, 
  Phone, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  CreditCard,
  FileText,
  Stethoscope,
  Award
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'Admissions' | 'Fees & Payment' | 'Documents & Tracking' | 'Programs & Wards';
  question: string;
  answer: string;
  highlights?: string[];
}

export const HomeFAQ: React.FC = () => {
  const { setActiveTab, setTrackerPrefillRef } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const faqData: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'Admissions',
      question: 'What are the minimum ECZ Grade 12 entry requirements for the Diploma in Registered Nursing (RN)?',
      answer: 'Applicants must possess a minimum of five (5) O-Level Credits or better in the Examinations Council of Zambia (ECZ) or Cambridge General Certificate of Education (GCE). Requirements strictly include:\n• Mandatory Credit in English Language\n• Mandatory Credit in Mathematics\n• Mandatory Credit in Biology or Combined Sciences\n• Credits in any two other subjects (e.g. Chemistry, Physics, Agricultural Science, Geography, Civic Education, or Religious Education).\nCandidates must be medically certified fit and at least 16 years of age.',
      highlights: ['5 O-Level Credits or better', 'Credits in English, Maths & Biology compulsory', 'ECZ / Cambridge Syllabus recognized']
    },
    {
      id: 'faq-2',
      category: 'Fees & Payment',
      question: 'How much is the online application processing fee and what payment methods are accepted?',
      answer: 'The application processing fee is ZMW 250.00 (non-refundable). Our online portal provides instant digital reconciliation supporting:\n• Airtel Money: Instant USSD push prompt simulation to your handset\n• MTN MoMo: Direct mobile money authorization\n• Visa & Mastercard: Secure debit/credit card checkout\n• Direct Bank Deposit: Zambia National Commercial Bank (ZANACO) Kitwe Business Centre Branch (Account # 559281900142).\nUpon clearance, you instantly receive a digital payment receipt ID and your official application reference number.',
      highlights: ['Application Fee: ZMW 250.00', 'Instant Mobile Money (Airtel & MTN)', 'ZANACO Account: 559281900142']
    },
    {
      id: 'faq-3',
      category: 'Documents & Tracking',
      question: 'What certified documents must I upload when applying online?',
      answer: 'You must attach clear, legible certified copies of the following four documents in PDF, JPG, or PNG format (maximum 5MB each):\n1. National Registration Card (NRC) or valid Passport\n2. ECZ Grade 12 Statement of Results or School Certificate\n3. Medical Fitness Examination Report issued by a registered Government Medical Officer from a state hospital\n4. Recent passport-sized photograph on a plain white background.\nAll academic credentials must be certified by a recognized Commissioner for Oaths, Police Officer, or Secondary School Headteacher.',
      highlights: ['Certified NRC or Passport', 'ECZ Statement of Results', 'Government Hospital Medical Report', 'Passport Photograph (White background)']
    },
    {
      id: 'faq-4',
      category: 'Documents & Tracking',
      question: 'How does automated application status tracking work and how long does verification take?',
      answer: 'Once you submit your application and fee payment, the system generates a unique Application Reference Code (e.g. KSNM-2026-8472). You can click "Track Status" anytime and enter your reference code or NRC number to view live progress through five automated verification stages: (1) Application Submitted, (2) Fee Reconciled, (3) Document Verification by Admissions Board, (4) Aptitude Interview Scheduled, and (5) Provisional Admission Decision. Typical review turnaround is 3 to 5 business days.',
      highlights: ['Track 24/7 with Reference Code or NRC', '5 automated transparent stages', 'Turnaround: 3 to 5 working days']
    },
    {
      id: 'faq-5',
      category: 'Admissions',
      question: 'Can I view and download an official Provisional Offer of Admission letter online?',
      answer: 'Yes! Once the Admissions Committee reviews your qualifications and awards admission, your online tracking status updates to "ADMITTED". A dedicated button appears allowing you to immediately view and print your formal, watermarked Provisional Offer of Admission letter complete with Ministry of Health letterhead, official seal, Principal Tutor signature, tuition fee schedule, and reporting dates.',
      highlights: ['Instant downloadable formal admission letter', 'Official Ministry of Health & KSNM seal', 'Includes orientation & fee guidelines']
    },
    {
      id: 'faq-6',
      category: 'Programs & Wards',
      question: 'What is the difference between Direct Entry Midwifery and Post-Basic Midwifery?',
      answer: '• Direct Entry Midwifery (3 Years): Open to Grade 12 school leavers who meet the five O-Level credit criteria. Trainees learn comprehensive obstetric, neonatal, and primary midwifery care from foundational nursing to complex deliveries.\n• Post-Basic Midwifery (1 Year Accelerated): Specifically designed for practicing Registered Nurses holding a valid practicing license from the Nursing and Midwifery Council of Zambia (NMCZ) who wish to acquire specialized midwifery credentials.',
      highlights: ['Direct Entry: 3-Year for School Leavers', 'Post-Basic: 1-Year for Registered Nurses', 'Supervised 40+ deliveries at KTH Labour Ward']
    },
    {
      id: 'faq-7',
      category: 'Programs & Wards',
      question: 'Where do clinical ward rotations take place during training?',
      answer: 'Kitwe School of Nursing and Midwifery is situated directly within the perimeter of Kitwe Teaching Hospital (KTH)—Zambia’s second-largest tertiary referral hospital with over 650 beds. Students undergo hands-on bedside clinical rotations across: Casualty & Trauma, High Dependency & Intensive Care Units (ICU), Wards 4 & 5 (Surgical), Labour & Delivery Suites, Special Care Baby Units (SCBU), Pediatric Wards, and community urban health centres in Kitwe.',
      highlights: ['Kitwe Teaching Hospital (650+ beds)', 'OSCE Simulation Skills Laboratory', 'Supervised by Senior Clinical Preceptors']
    },
    {
      id: 'faq-8',
      category: 'Admissions',
      question: 'Are male applicants accepted for Registered Nursing and Midwifery programs?',
      answer: 'Yes, absolutely. Kitwe School of Nursing and Midwifery strongly encourages both male and female candidates to apply. Gender equity is fully observed across all academic programs, including the Diploma in Registered Nursing and Diploma in Registered Midwifery.',
      highlights: ['Equal opportunity admissions', 'Both male and female candidates welcome']
    },
    {
      id: 'faq-9',
      category: 'Fees & Payment',
      question: 'What is the annual tuition fee and are installment payment plans supported?',
      answer: 'Tuition fees vary by program (e.g. ZMW 14,500/year for Registered Nursing; ZMW 15,200/year for Registered Midwifery). The institution supports flexible semester installment plans. Registered students can make semester tuition payments online via Mobile Money or Bank Deposit through the Student Portal and view instant balance updates on their fee ledger.',
      highlights: ['ZMW 14,500 – 15,200 annual tuition', 'Payable per semester in flexible installments', 'Online student tuition payment integration']
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'ALL' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.highlights?.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'ALL', label: 'All Questions' },
    { id: 'Admissions', label: 'Admissions & Requirements' },
    { id: 'Fees & Payment', label: 'Fees & Payment Gateway' },
    { id: 'Documents & Tracking', label: 'Documents & Status Tracking' },
    { id: 'Programs & Wards', label: 'Programs & Hospital Wards' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif-crest text-2xl sm:text-3xl font-bold text-slate-900">
            Admissions &amp; Application Guidelines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Clear answers to common questions about ECZ qualifications, application fees, certified document uploads, status tracking, and clinical ward training.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-sky-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. ECZ credits, ZMW 250 fee, Airtel Money, KTH wards)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sky-200 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-sky-50/30 text-slate-900 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-sky-50 text-sky-800 hover:bg-sky-100/80 border border-sky-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen 
                      ? 'border-sky-300 bg-white shadow-xs ring-1 ring-sky-200/50' 
                      : 'border-sky-100 bg-sky-50/20 hover:border-sky-200 hover:bg-sky-50/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 focus:outline-hidden"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isOpen ? 'bg-sky-600 text-white' : 'bg-sky-100 text-sky-700'
                      }`}>
                        <HelpCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block mb-1">
                          {faq.category}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`p-1 rounded-md transition-transform duration-200 text-slate-400 shrink-0 ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-sky-100/80 text-xs sm:text-sm text-slate-600 space-y-3 animate-in fade-in duration-200">
                      <div className="whitespace-pre-line leading-relaxed pl-9">
                        {faq.answer}
                      </div>

                      {faq.highlights && (
                        <div className="pl-9 pt-2 flex flex-wrap gap-2">
                          {faq.highlights.map((h, hIdx) => (
                            <span 
                              key={hIdx}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-900 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200"
                            >
                              <CheckCircle2 className="w-3 h-3 text-sky-600" />
                              <span>{h}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 bg-sky-50/30 rounded-2xl border border-sky-100 space-y-2">
              <HelpCircle className="w-8 h-8 text-sky-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-800">No questions found matching &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-500">Try searching for &quot;ECZ&quot;, &quot;ZMW 250&quot;, &quot;Airtel&quot;, or &quot;Midwifery&quot;.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); }}
                className="text-xs font-semibold text-sky-700 hover:underline pt-1"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Quick Action Footer Strip inside FAQ */}
        <div className="bg-gradient-to-r from-sky-50 via-sky-100/50 to-blue-50 rounded-2xl p-6 border border-sky-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-sm text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Still Have Questions Regarding Admissions?</span>
            </h4>
            <p className="text-xs text-slate-600">
              Our Admissions Registrar desk is open Monday to Friday, 08:00 – 17:00 hrs.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('apply')}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Apply Online</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="px-4 py-2.5 bg-white hover:bg-sky-50 text-sky-800 rounded-xl text-xs font-semibold border border-sky-200 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Contact Registry</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
