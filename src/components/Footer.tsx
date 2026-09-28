import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Award, Shield, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-sky-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-700 flex items-center justify-center text-white font-bold shadow-md shadow-sky-950">
                <Award className="w-6 h-6 text-sky-200" />
              </div>
              <div>
                <h4 className="font-serif-crest text-white text-base font-bold tracking-tight">
                  KITWE SCHOOL OF NURSING &amp; MIDWIFERY
                </h4>
                <p className="text-xs text-sky-400 font-medium">Copperbelt Province · Zambia</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Established in 1958, Kitwe School of Nursing and Midwifery has trained generations of high-caliber registered nurses and midwives delivering exemplary patient care across Zambia and the Southern African region.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-sky-300">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Nursing and Midwifery Council of Zambia (NMCZ) Fully Accredited</span>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Academic Programs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => setActiveTab('programs')} 
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Diploma in Registered Nursing (3 Years)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('programs')} 
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Diploma in Registered Midwifery (Direct Entry)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('programs')} 
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Post-Basic Diploma in Registered Midwifery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('programs')} 
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Advanced Diploma in Public Health Nursing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('programs')} 
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Diploma in Clinical Ophthalmic Nursing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portals & Quick Access */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Online Services &amp; Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => setActiveTab('apply')} 
                  className="text-sky-400 hover:text-sky-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>2026/2027 Online Application</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('track')} 
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Track Application &amp; Admission Status
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('student-portal')} 
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Student Portal &amp; Semester Examination Results
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('student-portal')} 
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Clinical Rotation &amp; Wards Assignment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('admin-portal')} 
                  className="hover:text-sky-300 transition-colors text-left text-slate-300"
                >
                  Faculty &amp; Administration Staff Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Location & Contacts */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Contact &amp; Location
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  Kitwe Teaching Hospital Grounds, Kuomboka Drive, Parklands, P.O. Box 20969, Kitwe, Zambia
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+260 (212) 226-315 / +260 97 784 2190</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>admissions@ksnm.ac.zm / registrar@ksnm.ac.zm</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Mon – Fri: 08:00 – 17:00 hrs (Admissions Office)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kitwe School of Nursing and Midwifery. Ministry of Health, Republic of Zambia.</p>
          <div className="flex items-center gap-4 text-sky-400/80">
            <span>Affiliated to Kitwe Teaching Hospital</span>
            <span>·</span>
            <span>NMCZ Indexed</span>
            <span>·</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
