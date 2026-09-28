import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationForm } from '../types';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileCheck, 
  FileText, 
  Download, 
  Printer, 
  Award, 
  Calendar, 
  Building2, 
  UserCheck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const { applications, trackerPrefillRef, programs, setActiveTab } = useApp();

  const [query, setQuery] = useState(trackerPrefillRef || 'KSNM-2026-8472');
  const [selectedApp, setSelectedApp] = useState<ApplicationForm | null>(null);
  const [showOfferLetter, setShowOfferLetter] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (trackerPrefillRef) {
      setQuery(trackerPrefillRef);
      handleSearch(trackerPrefillRef);
    } else {
      handleSearch('KSNM-2026-8472');
    }
  }, [trackerPrefillRef]);

  const handleSearch = (searchKey?: string) => {
    const key = (searchKey || query).trim().toLowerCase();
    if (!key) return;

    setHasSearched(true);
    const found = applications.find(
      app => app.referenceNumber.toLowerCase() === key ||
             app.nrcNumber.toLowerCase() === key ||
             app.email.toLowerCase() === key
    );
    setSelectedApp(found || null);
    setShowOfferLetter(false);
  };

  const getStepProgress = (status: ApplicationForm['status']) => {
    switch (status) {
      case 'SUBMITTED': return 1;
      case 'FEE_CONFIRMED': return 2;
      case 'UNDER_REVIEW': return 3;
      case 'INTERVIEW_SCHEDULED': return 4;
      case 'ADMITTED': return 5;
      case 'REJECTED': return 3;
      default: return 1;
    }
  };

  const prog = selectedApp ? programs.find(p => p.id === selectedApp.programId) : null;
  const currentProgressStep = selectedApp ? getStepProgress(selectedApp.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Search Box Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
          Live Admissions Tracking System
        </span>
        <h1 className="font-serif-crest text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          Track Your Application Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Enter your Application Reference Code (e.g. <code>KSNM-2026-8472</code>) or NRC number to view live evaluation progress.
        </p>

        {/* Input bar */}
        <div className="mt-5 flex items-center gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="e.g. KSNM-2026-8472 or 318492/67/1"
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-sky-200 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white uppercase font-mono shadow-2xs"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shrink-0 shadow-xs"
          >
            Track Status
          </button>
        </div>

        {/* Quick Sample Links */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500">
          <span>Quick Samples:</span>
          <button 
            onClick={() => { setQuery('KSNM-2026-8472'); handleSearch('KSNM-2026-8472'); }}
            className="text-sky-700 hover:underline font-semibold"
          >
            KSNM-2026-8472 (Admitted)
          </button>
          <span>·</span>
          <button 
            onClick={() => { setQuery('KSNM-2026-9214'); handleSearch('KSNM-2026-9214'); }}
            className="text-sky-600 hover:underline font-semibold"
          >
            KSNM-2026-9214 (Interview)
          </button>
          <span>·</span>
          <button 
            onClick={() => { setQuery('KSNM-2026-6105'); handleSearch('KSNM-2026-6105'); }}
            className="text-blue-700 hover:underline font-semibold"
          >
            KSNM-2026-6105 (Under Review)
          </button>
        </div>
      </div>

      {/* RESULT DISPLAY */}
      {selectedApp ? (
        <div className="space-y-6">
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 shadow-xs">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500">Reference:</span>
                  <span className="text-lg font-mono font-extrabold text-sky-800">{selectedApp.referenceNumber}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedApp.firstName} {selectedApp.middleName} {selectedApp.lastName}
                </h2>
                <p className="text-xs text-slate-500">
                  {prog?.title} · {selectedApp.intakeSeason}
                </p>
              </div>

              {/* Status Badge */}
              <div className="sm:text-right">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  selectedApp.status === 'ADMITTED'
                    ? 'bg-sky-100 text-sky-800 border border-sky-300'
                    : selectedApp.status === 'INTERVIEW_SCHEDULED'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : selectedApp.status === 'REJECTED'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  {selectedApp.status.replace(/_/g, ' ')}
                </span>
                <span className="block text-[11px] text-slate-400 mt-1 font-mono">
                  NRC: {selectedApp.nrcNumber}
                </span>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div className="py-8">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-6">
                Automated Verification Stages
              </h4>

              <div className="relative">
                {/* Line */}
                <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
                
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                  
                  {/* Step 1 */}
                  <div className="flex sm:flex-col items-center gap-3 sm:text-center">
                    <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Application Submitted</p>
                      <p className="text-[11px] text-slate-500">Online form received</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex sm:flex-col items-center gap-3 sm:text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      currentProgressStep >= 2 ? 'bg-sky-500 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {currentProgressStep >= 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Fee Reconciled</p>
                      <p className="text-[11px] text-slate-500">ZMW 250 cleared</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex sm:flex-col items-center gap-3 sm:text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      currentProgressStep >= 3 ? 'bg-sky-500 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {currentProgressStep >= 3 ? <CheckCircle2 className="w-5 h-5" /> : '3'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Document Verification</p>
                      <p className="text-[11px] text-slate-500">ECZ results review</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex sm:flex-col items-center gap-3 sm:text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      currentProgressStep >= 4 ? 'bg-sky-500 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {currentProgressStep >= 4 ? <CheckCircle2 className="w-5 h-5" /> : '4'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Aptitude Interview</p>
                      <p className="text-[11px] text-slate-500">Faculty panel</p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex sm:flex-col items-center gap-3 sm:text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      currentProgressStep >= 5 
                        ? 'bg-sky-600 text-white shadow-md ring-4 ring-sky-100' 
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {currentProgressStep >= 5 ? <Award className="w-5 h-5 text-sky-200" /> : '5'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Admission Decision</p>
                      <p className="text-[11px] text-slate-500">Provisional Offer</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ADMISSION OFFER ANNOUNCEMENT (IF ADMITTED) */}
            {selectedApp.status === 'ADMITTED' && (
              <div className="bg-sky-50/70 border-2 border-sky-300 rounded-2xl p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
                      <Award className="w-5 h-5 text-sky-600" />
                      <span>Provisional Admission Offer Granted!</span>
                    </div>
                    <p className="text-xs text-sky-950">
                      {selectedApp.admissionRemarks || 'The Admissions Selection Board has provisionally admitted you into Kitwe School of Nursing and Midwifery for the upcoming intake.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowOfferLetter(!showOfferLetter)}
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2 shrink-0"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{showOfferLetter ? 'Hide Offer Letter' : 'View Official Admission Letter'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* INTERVIEW NOTICE (IF INTERVIEW SCHEDULED) */}
            {selectedApp.status === 'INTERVIEW_SCHEDULED' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-blue-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-blue-950">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Faculty Oral Aptitude Interview Scheduled</span>
                </div>
                <p>
                  <strong>Date &amp; Time:</strong> {selectedApp.interviewDate || 'October 14, 2026 at 09:00 hrs'}
                </p>
                <p>
                  <strong>Venue:</strong> Kitwe School of Nursing and Midwifery Administration Complex, Conference Room B.
                </p>
                <p>
                  <strong>Required on Interview Day:</strong> Original NRC, Original ECZ Grade 12 Certificate/Statement of Results, two passport-sized photographs, and formal attire.
                </p>
              </div>
            )}

            {/* Applicant Summary Accordion details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-sky-50/40 rounded-xl p-4 border border-sky-100 space-y-2">
                <h5 className="font-bold text-slate-800 uppercase tracking-wide">Candidate Qualifications</h5>
                <p><strong>Secondary School:</strong> {selectedApp.secondarySchool} ({selectedApp.completionYear})</p>
                <p><strong>ECZ Exam No:</strong> {selectedApp.eczExaminationNumber}</p>
                <div className="pt-1 text-[11px] grid grid-cols-2 gap-1 text-slate-600">
                  <span>English: {selectedApp.grades.english}</span>
                  <span>Maths: {selectedApp.grades.mathematics}</span>
                  <span>Biology: {selectedApp.grades.biologyOrScience}</span>
                  <span>Science: {selectedApp.grades.chemistryOrPhysicalScience || 'N/A'}</span>
                </div>
              </div>

              <div className="bg-sky-50/40 rounded-xl p-4 border border-sky-100 space-y-2">
                <h5 className="font-bold text-slate-800 uppercase tracking-wide">Verified Documents</h5>
                <ul className="space-y-1">
                  {selectedApp.documents.map((doc) => (
                    <li key={doc.id} className="flex items-center justify-between text-[11px]">
                      <span className="truncate max-w-[200px] text-slate-700">{doc.title}</span>
                      <span className="text-sky-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-sky-500" />
                        <span>Verified</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-sky-100 flex justify-between text-[11px] text-slate-500">
                  <span>Application Fee:</span>
                  <span className="font-bold text-sky-900 font-mono">ZMW 250 (PAID)</span>
                </div>
              </div>
            </div>

          </div>

          {/* OFFICIAL PROVISIONAL ADMISSION OFFER LETTER MODAL / VIEW */}
          {showOfferLetter && (
            <div id="printable-content" className="bg-white rounded-2xl border-2 border-slate-300 p-8 sm:p-12 shadow-2xl relative space-y-6">
              
              {/* Print Action Bar */}
              <div className="no-print flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-md">
                  Official Document Preview
                </span>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Admission Letter</span>
                </button>
              </div>

              {/* Official Letterhead */}
              <div className="text-center border-b-2 border-slate-900 pb-6 space-y-1">
                <div className="w-16 h-16 rounded-full bg-sky-900 text-white mx-auto flex items-center justify-center font-bold mb-2">
                  <Award className="w-8 h-8 text-sky-200" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600">
                  REPUBLIC OF ZAMBIA · MINISTRY OF HEALTH
                </h3>
                <h2 className="font-serif-crest text-xl sm:text-2xl font-extrabold text-slate-950 uppercase tracking-tight">
                  KITWE SCHOOL OF NURSING AND MIDWIFERY
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  Kitwe Teaching Hospital Grounds, Kuomboka Road, Parklands, P.O. Box 20969, Kitwe, Zambia
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  Tel: +260 (212) 226-315 · Email: admissions@ksnm.ac.zm · Web: www.ksnm.ac.zm
                </p>
              </div>

              {/* Letter Reference & Date */}
              <div className="flex justify-between text-xs font-mono text-slate-700">
                <div>
                  <p><strong>Our Ref:</strong> KSNM/ADM/{selectedApp.referenceNumber}</p>
                  <p><strong>NRC:</strong> {selectedApp.nrcNumber}</p>
                </div>
                <div className="text-right">
                  <p><strong>Date:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p><strong>Intake:</strong> {selectedApp.intakeSeason}</p>
                </div>
              </div>

              {/* Addressee */}
              <div className="text-xs text-slate-800 space-y-0.5">
                <p>To:</p>
                <p className="font-bold text-sm text-slate-950">{selectedApp.firstName} {selectedApp.middleName} {selectedApp.lastName}</p>
                <p>{selectedApp.residentialAddress}</p>
                <p>{selectedApp.district}, {selectedApp.province}, Zambia</p>
                <p>Phone: {selectedApp.phone}</p>
              </div>

              {/* Letter Subject */}
              <div className="text-center font-bold text-sm sm:text-base text-slate-950 uppercase underline decoration-2 underline-offset-4 py-2">
                PROVISIONAL OFFER OF ADMISSION INTO {prog?.title.toUpperCase()}
              </div>

              {/* Body */}
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 text-justify">
                <p>
                  Following your successful application and subsequent evaluation of your Examinations Council of Zambia (ECZ) certified academic credentials, I have the honour to inform you that you have been offered provisional admission into the <strong>{prog?.title}</strong> for the <strong>{selectedApp.intakeSeason}</strong> at Kitwe School of Nursing and Midwifery.
                </p>
                <p>
                  This offer is subject to the following statutory conditions:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-xs">
                  <li>Presentation of original Grade 12 ECZ certificates and National Registration Card upon physical registration for verification and indexing with the Nursing and Midwifery Council of Zambia (NMCZ).</li>
                  <li>Medical fitness clearance including chest X-ray and hepatitis B immunization from a recognized government referral hospital.</li>
                  <li>Payment of the required first semester tuition fees of <strong>ZMW {(prog?.annualTuitionZMW ? prog.annualTuitionZMW / 2 : 7250).toLocaleString()}</strong> into the institutional ZANACO account prior to orientation.</li>
                  <li>Strict adherence to the institutional Code of Professional Conduct and nursing clinical dress codes.</li>
                </ol>
                <p>
                  Official orientation commences on <strong>Monday, 12 January 2027 at 08:00 hrs</strong> in the Main Administration Block Auditorium, Kitwe School of Nursing and Midwifery.
                </p>
                <p>
                  On behalf of the faculty and the Medical Superintendent of Kitwe Teaching Hospital, I congratulate you and warmly welcome you to this prestigious institution.
                </p>
              </div>

              {/* Signature Block */}
              <div className="pt-8 flex justify-between items-end text-xs">
                <div>
                  <div className="font-serif-crest font-bold text-slate-950 text-sm italic">
                    Mrs. Gertrude M. Sakala
                  </div>
                  <div className="w-36 h-0.5 bg-slate-950 my-1" />
                  <p className="font-bold text-slate-900">Principal Tutor</p>
                  <p className="text-slate-600">Kitwe School of Nursing and Midwifery</p>
                </div>

                {/* Institutional Stamp seal in blue */}
                <div className="w-28 h-28 border-2 border-dashed border-sky-800 rounded-full flex flex-col items-center justify-center text-center p-2 text-sky-950 rotate-[-8deg] opacity-90 select-none">
                  <span className="text-[9px] font-bold uppercase">KITWE SCHOOL OF</span>
                  <span className="text-[9px] font-bold uppercase">NURSING &amp; MIDWIFERY</span>
                  <span className="text-[10px] font-black text-sky-700 my-0.5">OFFICIAL SEAL</span>
                  <span className="text-[8px] font-mono">{new Date().getFullYear()} ADMISSIONS</span>
                </div>
              </div>

            </div>
          )}

        </div>
      ) : hasSearched ? (
        <div className="bg-white rounded-2xl border border-sky-100 p-8 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="font-bold text-base text-slate-900">Application Reference Not Found</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            We could not find an application with code &quot;{query}&quot;. Please verify the reference number from your confirmation SMS/email or try one of the sample references above.
          </p>
          <button
            onClick={() => setActiveTab('apply')}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg text-xs font-semibold"
          >
            Start New Application
          </button>
        </div>
      ) : null}

    </div>
  );
};
