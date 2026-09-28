import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Shield, Stethoscope, Building, Users, MapPin, CheckCircle2 } from 'lucide-react';

import campusBannerImg from '../assets/images/campus_banner_1790582534269.jpg';
import nursingStudentsImg from '../assets/images/nursing_students_1790582547579.jpg';
import hospitalCampusImg from '../assets/images/hospital_campus_1790582560091.jpg';

export const AboutView: React.FC = () => {
  const { facultyMembers, setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
          Est. 1958 · Copperbelt Province, Zambia
        </span>
        <h1 className="font-serif-crest text-3xl sm:text-4xl font-bold text-slate-900">
          About Kitwe School of Nursing &amp; Midwifery
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          For over six decades, Kitwe School of Nursing and Midwifery has stood as a beacon of clinical excellence, ethical nursing practice, and maternal health leadership across the Republic of Zambia and beyond.
        </p>
      </div>

      {/* Main Narrative & Campus Imagery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          <h2 className="font-serif-crest text-2xl font-bold text-slate-900">
            A Legacy of Dedicated Care &amp; Clinical Mastery
          </h2>
          <p>
            Established in 1958 under the Ministry of Health, Kitwe School of Nursing and Midwifery was founded alongside the historic development of Kitwe Central Hospital (now Kitwe Teaching Hospital) to serve the healthcare needs of the Copperbelt mining communities and national population.
          </p>
          <p>
            Our core mission is to produce competent, compassionate, and versatile registered nurses and midwives capable of delivering high-quality healthcare at primary, secondary, and tertiary levels within the Zambian healthcare system and internationally.
          </p>
          <p>
            The school is fully accredited and indexed by the Nursing and Midwifery Council of Zambia (NMCZ). Through our direct integration with Kitwe Teaching Hospital, our trainees benefit from bedside teaching in major trauma units, intensive care, pediatric surgery, and labour and delivery suites.
          </p>
          
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setActiveTab('apply')}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Apply for 2026/2027 Admissions
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className="px-4 py-2.5 text-xs font-semibold text-sky-700 hover:underline"
            >
              View Curricula →
            </button>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-sky-100">
          <img
            src={campusBannerImg}
            alt="Kitwe School of Nursing and Midwifery Administration Block"
            referrerPolicy="no-referrer"
            className="w-full h-80 object-cover"
          />
          <div className="p-4 bg-slate-900 text-white text-xs border-t border-sky-900">
            <span className="font-serif-crest font-bold text-sky-300 block">Administration Block</span>
            <span className="text-slate-300 text-[11px]">Kitwe School of Nursing and Midwifery Campus, Kuomboka Road, Kitwe.</span>
          </div>
        </div>
      </div>

      {/* Pillars Strip in Light Blue */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Clinical Excellence</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hands-on bedside clinical rotations across 12 inpatient wards at Kitwe Teaching Hospital under senior nursing sisters and consultant physicians.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">NMCZ Licensing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consistent top national ranking in the Nursing and Midwifery Council of Zambia qualifying licensure examinations with over 98% pass rates.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-sky-100 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Modern Simulation Lab</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Equipped skills laboratory with advanced maternal birthing mannequins, resuscitation simulators, and OSCE examination stations.
          </p>
        </div>
      </div>

      {/* Institutional Leadership */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-serif-crest text-2xl font-bold text-slate-900">
            Faculty &amp; Administrative Leadership
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Experienced nursing educators, clinical preceptors, and academic coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facultyMembers.map((fac) => (
            <div key={fac.id} className="bg-white rounded-2xl border border-sky-100 p-5 text-center space-y-3 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-800 mx-auto flex items-center justify-center font-serif-crest font-bold text-lg border border-sky-200">
                {fac.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{fac.name}</h4>
                <p className="text-[11px] text-sky-700 font-semibold mt-0.5">{fac.role.replace(/_/g, ' ')}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{fac.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Photos Gallery */}
      <div className="space-y-4 pt-4">
        <h3 className="font-serif-crest text-xl font-bold text-slate-900 text-center">
          Campus Life &amp; Clinical Facilities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-sky-100">
            <img
              src={nursingStudentsImg}
              alt="Student Nurses Formation"
              referrerPolicy="no-referrer"
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 text-white">
              <span className="text-xs font-semibold">Kitwe School of Nursing and Midwifery Professional Induction</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md border border-sky-100">
            <img
              src={hospitalCampusImg}
              alt="Kitwe Central Teaching Hospital"
              referrerPolicy="no-referrer"
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 text-white">
              <span className="text-xs font-semibold">Kitwe Teaching Hospital Grounds &amp; Clinical Complex</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
