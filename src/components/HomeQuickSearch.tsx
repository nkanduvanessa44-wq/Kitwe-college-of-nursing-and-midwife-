import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  X, 
  GraduationCap, 
  FileCheck, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles,
  ExternalLink,
  BookOpen,
  Stethoscope,
  MapPin,
  CreditCard,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export type SearchCategory = 'all' | 'programs' | 'requirements' | 'resources';

interface SearchResultItem {
  id: string;
  type: 'program' | 'requirement' | 'resource';
  title: string;
  subtitle: string;
  categoryLabel: string;
  description: string;
  tags: string[];
  actionLabel: string;
  targetTab: 'apply' | 'programs' | 'track' | 'student-portal' | 'about' | 'contact';
  badge?: string;
  details?: string[];
}

export const HomeQuickSearch: React.FC = () => {
  const { setActiveTab } = useApp();
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<SearchCategory>('all');
  const [isFocused, setIsFocused] = useState(false);

  // Indexed searchable repository
  const searchIndex: SearchResultItem[] = [
    // --- ACADEMIC PROGRAMS ---
    {
      id: 'prog-rn',
      type: 'program',
      title: 'Diploma in Registered Nursing (RN)',
      subtitle: '3 Years Full-Time · January & July Intakes',
      categoryLabel: 'Academic Program',
      description: 'Comprehensive clinical nursing program covering medical-surgical, obstetric, pediatric, and critical trauma care affiliated with Kitwe Teaching Hospital.',
      tags: ['registered nursing', 'rn', 'diploma', 'nursing', '3 years', 'tuition', 'intake', 'hospital'],
      actionLabel: 'Apply for RN Diploma',
      targetTab: 'apply',
      badge: 'NMCZ Accredited',
      details: ['Tuition: ZMW 14,500 / year', '5 O-Level Credits required', 'Bedside training in 12 KTH wards']
    },
    {
      id: 'prog-rm',
      type: 'program',
      title: 'Diploma in Registered Midwifery (Direct Entry)',
      subtitle: '3 Years Full-Time · January Intake',
      categoryLabel: 'Academic Program',
      description: 'Direct entry clinical midwifery qualification focused on maternal health, antenatal care, labour and neonatal resuscitation at KTH Labour Ward.',
      tags: ['midwifery', 'rm', 'registered midwifery', 'maternal', 'neonatal', 'labour ward', 'direct entry'],
      actionLabel: 'Apply for Midwifery',
      targetTab: 'apply',
      badge: 'High Demand',
      details: ['Tuition: ZMW 15,200 / year', 'Mandatory 40+ supervised live deliveries', 'Open to school leavers']
    },
    {
      id: 'prog-pb-mid',
      type: 'program',
      title: 'Post-Basic Diploma in Registered Midwifery',
      subtitle: '1 Year Accelerated · July Intake',
      categoryLabel: 'Academic Program',
      description: 'Accelerated obstetric training tailored for licensed Registered Nurses holding active NMCZ practicing certificates.',
      tags: ['post-basic', 'midwifery', 'nursing', 'accelerated', 'practicing nurses', '1 year'],
      actionLabel: 'Apply Post-Basic',
      targetTab: 'apply',
      badge: 'Post-Registration',
      details: ['Requires RN Diploma & valid NMCZ PIN', '1 year hospital experience', 'Tuition: ZMW 12,000']
    },
    {
      id: 'prog-phn',
      type: 'program',
      title: 'Advanced Diploma in Public Health Nursing',
      subtitle: '1 Year Full-Time · January Intake',
      categoryLabel: 'Academic Program',
      description: 'Prepares community health leaders in epidemiological disease surveillance, immunizations, and primary maternal health strategies.',
      tags: ['public health', 'phn', 'epidemiology', 'community', 'immunization', 'advanced diploma'],
      actionLabel: 'View Public Health Details',
      targetTab: 'programs',
      badge: 'Specialist Post-Basic',
      details: ['Tuition: ZMW 13,500 / year', 'Primary healthcare leadership', 'Ministry of Health aligned']
    },
    {
      id: 'prog-ophth',
      type: 'program',
      title: 'Diploma in Clinical Ophthalmic Nursing',
      subtitle: '1 Year Specialist · July Intake',
      categoryLabel: 'Academic Program',
      description: 'Advanced ocular health training in cataract surgical assistance, refraction, and clinical eye health in partnership with KTH Eye Unit.',
      tags: ['ophthalmic', 'eye', 'cataract', 'vision', 'optical', 'surgery', 'specialist'],
      actionLabel: 'View Ophthalmic Details',
      targetTab: 'programs',
      badge: 'Specialist Unit',
      details: ['Kitwe Teaching Hospital Eye Unit', 'Post-RN qualification', 'Tuition: ZMW 14,000']
    },

    // --- ADMISSION REQUIREMENTS ---
    {
      id: 'req-ecz-credits',
      type: 'requirement',
      title: 'Five (5) O-Level Credits Entry Requirement',
      subtitle: 'Examinations Council of Zambia (ECZ) / Cambridge GCE',
      categoryLabel: 'Admission Criteria',
      description: 'Mandatory minimum requirement: Five (5) O-Level credits or better including English Language, Mathematics, and Biology / Combined Sciences.',
      tags: ['ecz', 'credits', 'english', 'mathematics', 'maths', 'biology', 'science', 'gce', 'o-level', 'grade 12', 'entry'],
      actionLabel: 'Start Application with ECZ',
      targetTab: 'apply',
      badge: 'Compulsory',
      details: ['English Credit (1-6)', 'Mathematics Credit (1-6)', 'Biology or Science Credit (1-6)']
    },
    {
      id: 'req-app-fee',
      type: 'requirement',
      title: 'Application Processing Fee (ZMW 250.00)',
      subtitle: 'Instant Mobile Money & Bank Card Gateway',
      categoryLabel: 'Admission Fee',
      description: 'Non-refundable application processing fee of ZMW 250.00 payable via Airtel Money, MTN MoMo, Visa/Mastercard, or ZANACO bank deposit.',
      tags: ['application fee', 'zmw 250', 'airtel money', 'mtn momo', 'zanaco', 'payment', 'receipt', 'bank deposit'],
      actionLabel: 'Pay Fee in Application Portal',
      targetTab: 'apply',
      badge: 'Instant Receipt',
      details: ['Airtel Money USSD push', 'MTN MoMo push prompt', 'ZANACO Acc: 559281900142']
    },
    {
      id: 'req-docs-certified',
      type: 'requirement',
      title: 'Mandatory Certified Document Uploads',
      subtitle: 'Certified Copies Verification Checklist',
      categoryLabel: 'Document Uploads',
      description: 'Applicants must upload certified copies of: (1) National Registration Card (NRC), (2) Grade 12 ECZ Results, (3) Medical Fitness Report, and (4) Passport Photograph.',
      tags: ['documents', 'nrc', 'passport', 'medical fitness', 'certification', 'ecz statement', 'photo', 'commissioner for oaths'],
      actionLabel: 'Go to Document Upload',
      targetTab: 'apply',
      badge: 'Certified Copies',
      details: ['Must be certified by Commissioner for Oaths or Police', 'PDF, JPG, PNG accepted (max 5MB)']
    },
    {
      id: 'req-status-tracker',
      type: 'requirement',
      title: 'Automated 5-Stage Application Tracker',
      subtitle: 'Real-Time Verification & Offer Letter Download',
      categoryLabel: 'Tracking & Offers',
      description: 'Track your application status 24/7 using your reference code (e.g. KSNM-2026-8472) or NRC number to view live review progress and print offer letters.',
      tags: ['track status', 'reference code', 'offer letter', 'provisional admission', 'acceptance', 'interview'],
      actionLabel: 'Open Status Tracker',
      targetTab: 'track',
      badge: 'Live Status',
      details: ['Submitted → Fee Reconciled → Document Review → Interview → Admitted']
    },

    // --- CAMPUS & CLINICAL RESOURCES ---
    {
      id: 'res-kth',
      type: 'resource',
      title: 'Kitwe Teaching Hospital (KTH) Clinical Campus',
      subtitle: 'Tertiary Referral Bedside Training Facility',
      categoryLabel: 'Clinical Hospital',
      description: 'Zambia’s 2nd-largest referral hospital (650+ beds) where students train across Wards 4 & 5 (Surgical), Ward 8 (High Dependency Obstetric), ICU, and Casualty.',
      tags: ['kitwe teaching hospital', 'kth', 'hospital', 'wards', 'icu', 'labour ward', 'surgery', 'clinical', 'pediatric'],
      actionLabel: 'Explore Hospital Base',
      targetTab: 'about',
      badge: '650+ Beds',
      details: ['Wards 4, 8, ICU, SCBU, Theatre', 'Direct hospital walkway connectivity', 'Senior Sister-In-Charge preceptors']
    },
    {
      id: 'res-skills-lab',
      type: 'resource',
      title: 'Modern OSCE & Maternal Simulation Skills Laboratory',
      subtitle: 'Administration Complex Floor 1',
      categoryLabel: 'Campus Facility',
      description: 'Equipped pre-clinical lab with high-fidelity birthing mannequins, CPR trauma trainers, IV cannulation arms, and mock ward stations.',
      tags: ['simulation', 'osce', 'skills lab', 'mannequin', 'birthing simulator', 'clinical practicum', 'training'],
      actionLabel: 'View Campus Facilities',
      targetTab: 'about',
      badge: 'Simulation Tech',
      details: ['Objective Structured Clinical Exam (OSCE)', 'Sterile procedure stations', 'Pre-clinical validation']
    },
    {
      id: 'res-library',
      type: 'resource',
      title: 'Florence Nightingale Medical & Nursing Library',
      subtitle: 'Academic Block West Wing',
      categoryLabel: 'Academic Resource',
      description: 'Extensive repository of clinical nursing journals, ECZ past board exams, obstetrics textbooks, high-speed Wi-Fi, and e-learning terminals.',
      tags: ['library', 'books', 'journals', 'study', 'wifi', 'nmcz past papers', 'research', 'quiet study'],
      actionLabel: 'Contact Academic Library',
      targetTab: 'contact',
      badge: 'Open 08:00 - 21:00',
      details: ['Over 10,000 medical volumes', 'E-Library access', 'Quiet individual carrels']
    },
    {
      id: 'res-hostels',
      type: 'resource',
      title: 'Student Nurse Residential Hostels & Cafeteria',
      subtitle: 'Secure On-Campus Student Accommodation',
      categoryLabel: 'Student Living',
      description: 'Furnished residential hostels with 24/7 security, continuous water supply, study lounges, and subsidized student dining hall.',
      tags: ['hostels', 'accommodation', 'boarding', 'residence', 'rooms', 'dining', 'cafeteria', 'meals'],
      actionLabel: 'Enquire on Accommodation',
      targetTab: 'contact',
      badge: 'On-Campus',
      details: ['Separate female & male wings', 'Near hospital perimeter for night shifts', 'Subsidized dining']
    },
    {
      id: 'res-nmcz',
      type: 'resource',
      title: 'NMCZ Professional Indexing & Student Licensure Desk',
      subtitle: 'Registrar Directorate',
      categoryLabel: 'Statutory Body',
      description: 'Official liaison office managing candidate indexing with the Nursing and Midwifery Council of Zambia (NMCZ) for legal practice.',
      tags: ['nmcz', 'indexing', 'licensing', 'nursing council', 'practicing certificate', 'council'],
      actionLabel: 'Read Accreditation Info',
      targetTab: 'about',
      badge: 'Statutory Board',
      details: ['Mandatory for national qualifying exams', 'NMCZ index number issued', 'Code of professional conduct']
    }
  ];

  // Quick suggestion queries
  const popularKeywords = [
    { label: 'Registered Nursing', query: 'Registered Nursing' },
    { label: 'Midwifery Program', query: 'Midwifery' },
    { label: 'ECZ 5 Credits', query: 'ECZ' },
    { label: 'ZMW 250 App Fee', query: 'Application Fee' },
    { label: 'Hospital Wards (KTH)', query: 'Kitwe Teaching Hospital' },
    { label: 'OSCE Skills Lab', query: 'OSCE' },
    { label: 'Hostels & Housing', query: 'Hostel' }
  ];

  // Filter and search computation
  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return searchIndex.filter(item => {
      // Category filter
      if (selectedFilter === 'programs' && item.type !== 'program') return false;
      if (selectedFilter === 'requirements' && item.type !== 'requirement') return false;
      if (selectedFilter === 'resources' && item.type !== 'resource') return false;

      // Query match
      const titleMatch = item.title.toLowerCase().includes(trimmed);
      const descMatch = item.description.toLowerCase().includes(trimmed);
      const subMatch = item.subtitle.toLowerCase().includes(trimmed);
      const tagMatch = item.tags.some(t => t.toLowerCase().includes(trimmed));

      return titleMatch || descMatch || subMatch || tagMatch;
    });
  }, [query, selectedFilter]);

  const handleSelectChip = (kw: string) => {
    setQuery(kw);
    setIsFocused(true);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedFilter('all');
  };

  return (
    <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 -mt-4 mb-4">
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-sky-100 ring-1 ring-sky-200/50 space-y-4">
        
        {/* Search Bar Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-none">
                Instant Academic &amp; Campus Search
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Find programs, entry requirements, fees, Kitwe Teaching Hospital wards, and campus resources.
              </p>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/60'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setSelectedFilter('programs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'programs'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/60'
              }`}
            >
              Programs (5)
            </button>
            <button
              onClick={() => setSelectedFilter('requirements')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'requirements'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/60'
              }`}
            >
              Admissions Criteria
            </button>
            <button
              onClick={() => setSelectedFilter('resources')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'resources'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/60'
              }`}
            >
              Hospital &amp; Campus
            </button>
          </div>
        </div>

        {/* Big Search Input with Clear Button */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500 flex items-center gap-1.5">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Type to search (e.g. 'Registered Nursing', 'ECZ 5 credits', 'ZMW 250 fee', 'Labour Ward', 'OSCE lab', 'hostels')..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-sky-200 text-xs sm:text-sm focus:border-sky-500 focus:ring-4 focus:ring-sky-100 bg-sky-50/20 text-slate-900 transition-all font-medium placeholder:text-slate-400 shadow-2xs"
          />

          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              title="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-500 font-semibold text-[11px] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            Popular Queries:
          </span>
          {popularKeywords.map((kw, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectChip(kw.query)}
              className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-medium border border-sky-200/80 transition-colors"
            >
              {kw.label}
            </button>
          ))}
        </div>

        {/* LIVE SEARCH RESULTS CONTAINER */}
        {query.trim() && (
          <div className="pt-2 border-t border-sky-100 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-700">
                Found {searchResults.length} matching result{searchResults.length === 1 ? '' : 's'} for &ldquo;<span className="text-sky-700">{query}</span>&rdquo;
              </span>
              <button
                onClick={handleClear}
                className="text-sky-600 hover:underline text-[11px] font-semibold"
              >
                Close Search Results
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-sky-100 bg-white hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.type === 'program'
                            ? 'bg-sky-100 text-sky-800 border border-sky-200'
                            : item.type === 'requirement'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}>
                          {item.categoryLabel}
                        </span>

                        {item.badge && (
                          <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                        {item.subtitle}
                      </p>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      {item.details && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {item.details.map((d, dIdx) => (
                            <span 
                              key={dIdx}
                              className="text-[10px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                            >
                              • {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 font-mono">
                        Quick Navigate:
                      </span>
                      <button
                        onClick={() => setActiveTab(item.targetTab)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 shadow-2xs group-hover:translate-x-0.5"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-sky-50/40 rounded-2xl border border-sky-100 space-y-2">
                <Search className="w-8 h-8 text-sky-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-800">
                  No matching results found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try searching for general terms such as &ldquo;Registered Nursing&rdquo;, &ldquo;Midwifery&rdquo;, &ldquo;Credits&rdquo;, &ldquo;Airtel&rdquo;, or &ldquo;Hospital&rdquo;.
                </p>
                <button
                  onClick={handleClear}
                  className="px-4 py-1.5 bg-sky-600 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
