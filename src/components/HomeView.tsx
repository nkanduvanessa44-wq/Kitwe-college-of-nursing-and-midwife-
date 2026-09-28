import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  GraduationCap, 
  Clock, 
  Award, 
  Building2, 
  Users, 
  BookOpen, 
  Stethoscope, 
  Calendar, 
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

import campusBannerImg from '../assets/images/campus_banner_1790582534269.jpg';
import nursingStudentsImg from '../assets/images/nursing_students_1790582547579.jpg';
import hospitalCampusImg from '../assets/images/hospital_campus_1790582560091.jpg';
import { HomeFAQ } from './HomeFAQ';
import { LatestNewsSection } from './LatestNewsSection';
import { HomeQuickSearch } from './HomeQuickSearch';

export const HomeView: React.FC = () => {
  const { setActiveTab, programs, notices, setTrackerPrefillRef } = useApp();

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO BANNER SECTION WITH THE CAMPUS PHOTO */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        {/* Full-Bleed Campus Photo Background Banner */}
        <div className="relative min-h-[580px] lg:min-h-[660px] flex items-end">
          <img
            src={campusBannerImg}
            alt="Kitwe School of Nursing and Midwifery Administration Block Campus"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.0] contrast-[1.02]"
          />
          
          {/* Subtle gentle gradient at the bottom so the photo is unobstructed while text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 z-10 w-full">
            <div className="max-w-3xl space-y-4">
              
              {/* Title */}
              <h1 className="font-serif-crest text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Kitwe School of Nursing &amp; Midwifery
              </h1>

              {/* Tagline */}
              <p className="text-base sm:text-lg text-sky-100 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-2xl">
                Pioneering clinical excellence, compassionate obstetric care, and life-saving healthcare leadership since 1958. Directly affiliated with Kitwe Teaching Hospital.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setActiveTab('apply')}
                  className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Apply Online 2026/2027</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('track')}
                  className="px-5 py-3.5 bg-slate-900/80 hover:bg-slate-900 text-white font-medium text-sm rounded-xl backdrop-blur-md border border-white/40 transition-all flex items-center gap-2 shadow-xl"
                >
                  <span>Track Application</span>
                </button>

                <button
                  onClick={() => setActiveTab('student-portal')}
                  className="px-5 py-3.5 bg-slate-900/80 hover:bg-slate-900 text-sky-100 font-medium text-sm rounded-xl border border-sky-400/40 backdrop-blur-md transition-all flex items-center gap-2 shadow-xl"
                >
                  <GraduationCap className="w-4 h-4 text-sky-300" />
                  <span>Student Portal</span>
                </button>
              </div>

              {/* Caption */}
              <p className="text-[11px] text-sky-100/90 italic pt-1 drop-shadow-sm">
                Kitwe School of Nursing and Midwifery Main Administration Block &amp; Covered Walkway, Kitwe.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* INSTANT ACADEMIC, ADMISSION & CAMPUS SEARCH BAR */}
      <HomeQuickSearch />

      {/* INSTITUTION METRICS STRIP IN LIGHT BLUE & SLATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-blue-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg border border-sky-800/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-sky-800/60">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-300 font-serif-crest">98.6%</p>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 font-medium">NMCZ Licensure Pass Rate</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-serif-crest">65+</p>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 font-medium">Years of Healthcare Heritage</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-300 font-serif-crest">1,200+</p>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 font-medium">Clinical Nurses &amp; Midwives Trained</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-serif-crest">12</p>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 font-medium">Hospital Teaching Wards at KTH</p>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPUS VISUAL SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-900 uppercase tracking-wider bg-sky-100/70 px-2.5 py-1 rounded-md border border-sky-200">
              <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
              Clinical Rigor &amp; Professional Dignity
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Shaping Zambia&apos;s Foremost Healthcare Custodians
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              At Kitwe School of Nursing and Midwifery, theoretical foundations meet high-volume, hands-on clinical mastery. Situated on the grounds of Kitwe Teaching Hospital, our students undergo intensive bedside clinical rotations across emergency care, surgical theaters, obstetric delivery suites, and pediatric wards.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Direct Bedside Training at Kitwe Teaching Hospital</h4>
                  <p className="text-xs text-slate-500">Zambia&apos;s second-largest tertiary referral medical institution serving the entire Copperbelt and Northern region.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Modern Simulation Skills Laboratory &amp; OSCE Rooms</h4>
                  <p className="text-xs text-slate-500">State-of-the-art anatomical models and birthing simulators for pre-clinical preparation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">NMCZ Licensing Board Examination Preparation</h4>
                  <p className="text-xs text-slate-500">Consistently ranking in the top echelon of national qualifying examination pass rates.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => setActiveTab('programs')}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Explore Nursing Programs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="px-4 py-2.5 text-xs font-semibold text-sky-700 hover:text-sky-800"
              >
                Read Institutional Heritage →
              </button>
            </div>
          </div>

          {/* Visual Side with Cohort and Hospital Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-sky-100">
                <img
                  src={nursingStudentsImg}
                  alt="Kitwe School of Nursing and Midwifery Student Cohort in White Uniforms"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-semibold">Student Nurses &amp; Midwives Induction</span>
                </div>
              </div>

              <div className="bg-sky-50/80 rounded-2xl p-5 border border-sky-100">
                <h5 className="font-bold text-xs text-sky-900 uppercase tracking-wide">Accreditation</h5>
                <p className="text-xs text-sky-800 mt-1">
                  Regulated and indexed by the Nursing and Midwifery Council of Zambia (NMCZ) under the Ministry of Health.
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:pt-6">
              <div className="bg-sky-950 text-white rounded-2xl p-5 shadow-lg border border-sky-800">
                <p className="text-xs font-serif-crest text-sky-300 font-bold uppercase">Clinical Base</p>
                <h4 className="text-sm font-bold mt-1 text-white">Kitwe Teaching Hospital Complex</h4>
                <p className="text-xs text-sky-100 mt-2">
                  Over 650 inpatient beds providing unparalleled clinical case exposure in cardiology, obstetrics, neonatology, and trauma surgery.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-sky-100">
                <img
                  src={hospitalCampusImg}
                  alt="Kitwe Central Teaching Hospital Grounds"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-semibold">Kitwe Teaching Hospital Grounds</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ACCREDITED ACADEMIC PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
            Undergraduate &amp; Specialist Qualifications
          </span>
          <h2 className="font-serif-crest text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Accredited Nursing &amp; Midwifery Programs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Every curriculum combines rigorous health science didactic theory with supervised hospital ward practicum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => (
            <div 
              key={prog.id}
              className="bg-white rounded-2xl border border-sky-100 p-6 flex flex-col justify-between hover:shadow-xl hover:border-sky-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                    {prog.duration}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {prog.intakes.join(' · ')}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-sky-700 transition-colors">
                  {prog.title}
                </h3>
                
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {prog.description}
                </p>

                {/* Requirements list */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider">Key Requirements:</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {prog.requirements.slice(0, 3).map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-sky-500 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">App Fee</span>
                  <span className="text-sm font-bold text-slate-900">ZMW {prog.applicationFeeZMW}</span>
                </div>

                <button
                  onClick={() => setActiveTab('apply')}
                  className="px-4 py-2 bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 border border-sky-200"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST NEWS & OFFICIAL UPDATES SECTION */}
      <LatestNewsSection />

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <HomeFAQ />

      {/* QUICK STATUS TRACKER LOOKUP TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-sky-900 via-sky-800 to-blue-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-sky-700/50 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <h3 className="font-serif-crest text-2xl sm:text-3xl font-bold">
              Have you already submitted an application?
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 mt-2">
              Track your admission status in real-time. Enter your application reference code (e.g., <code className="bg-sky-950 px-2 py-0.5 rounded text-sky-300 border border-sky-700">KSNM-2026-8472</code>) or National Registration Card (NRC) number to view verification progress or download your offer letter.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setTrackerPrefillRef('KSNM-2026-8472');
                  setActiveTab('track');
                }}
                className="px-5 py-3 bg-white hover:bg-sky-50 text-sky-950 font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                View Sample Admitted Application (Thandiwe Mulenga)
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className="px-5 py-3 bg-sky-950/60 hover:bg-sky-950 text-white font-medium text-xs rounded-xl border border-sky-400/30 transition-colors"
              >
                Lookup Application
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
