import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  User, 
  KeyRound, 
  FileText, 
  Calendar, 
  CreditCard, 
  Award, 
  Stethoscope, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Printer, 
  AlertCircle,
  Building,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import campusBannerImg from '../assets/images/campus_banner_1790582534269.jpg';

export const StudentPortal: React.FC = () => {
  const { 
    currentStudent, 
    studentLogin, 
    studentLogout, 
    students, 
    makeStudentFeePayment,
    setTranscriptStudent,
    notices
  } = useApp();

  // Sign-in Form
  const [studentId, setStudentId] = useState('');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Portal view state
  const [activeTab, setActiveTab] = useState<'results' | 'clinical' | 'finances' | 'announcements'>('results');
  const [selectedSemesterIdx, setSelectedSemesterIdx] = useState<number>(0);

  // Fee payment state
  const [feeAmount, setFeeAmount] = useState('1500');
  const [payMethod, setPayMethod] = useState<'AIRTEL' | 'MTN' | 'CARD'>('AIRTEL');
  const [payerPhone, setPayerPhone] = useState('+260 97 122 3344');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const ok = studentLogin(studentId, pin);
    if (!ok) {
      setLoginError('Invalid Student ID or PIN. Please check your credentials or use the 1-click test student login below.');
    }
  };

  const handleQuickDemoLogin = (demoStudentId: string) => {
    setStudentId(demoStudentId);
    setPin('1234');
    studentLogin(demoStudentId, '1234');
  };

  const handlePayTuition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) return;
    const amount = Number(feeAmount);
    if (isNaN(amount) || amount <= 0) return;

    setIsProcessingPayment(true);
    setTimeout(() => {
      makeStudentFeePayment(currentStudent.id, amount, payMethod);
      setIsProcessingPayment(false);
      setPaymentSuccessMsg(`Success! Payment of ZMW ${amount.toLocaleString()} received via ${payMethod}. Updated balance reflected.`);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
      setTimeout(() => setPaymentSuccessMsg(''), 5000);
    }, 1200);
  };

  // If not logged in, show Sign In View with visible campus background
  if (!currentStudent) {
    return (
      <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12 overflow-hidden">
        {/* Visible Campus Photo in Background */}
        <img
          src={campusBannerImg}
          alt="Kitwe School of Nursing and Midwifery Administration Block"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.94] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/40 via-slate-900/30 to-sky-950/50 backdrop-blur-[1px]" />

        <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-sky-200/80 p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-700 mx-auto flex items-center justify-center border border-sky-100 shadow-sm">
              <GraduationCap className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-2.5 py-0.5 rounded-full border border-sky-200">
              Student Information System
            </span>
            <h1 className="font-serif-crest text-2xl font-bold text-slate-900">
              Student Portal Sign In
            </h1>
            <p className="text-xs text-slate-600">
              Sign in with your Student ID number (e.g. <code className="text-sky-700 font-mono">SN/2024/0142</code>) or NRC to access examination marks, GPA, and transcripts.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student ID or Registered NRC Number
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. SN/2024/0142"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 bg-white font-mono uppercase"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Portal PIN / Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN (Default: 1234)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 bg-white"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Default test student PIN is: 1234</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Sign In to Student Dashboard</span>
            </button>
          </form>

          {/* Quick Demo Access Buttons */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5 text-center">
              1-Click Demo Student Accounts:
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('SN/2024/0142')}
                className="w-full p-2.5 rounded-xl border border-sky-100 hover:border-sky-300 hover:bg-sky-50/60 text-left transition-all text-xs flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-slate-900 group-hover:text-sky-800">Chileshe Mwape</span>
                  <span className="text-slate-500 block text-[11px]">3rd Year Registered Nursing · CGPA: 3.80</span>
                </div>
                <span className="text-sky-600 font-semibold text-[11px] group-hover:translate-x-0.5 transition-transform">
                  Login →
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('SN/2025/0089')}
                className="w-full p-2.5 rounded-xl border border-sky-100 hover:border-sky-300 hover:bg-sky-50/60 text-left transition-all text-xs flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-slate-900 group-hover:text-sky-800">Mutale Bwalya</span>
                  <span className="text-slate-500 block text-[11px]">2nd Year Registered Midwifery · CGPA: 3.91</span>
                </div>
                <span className="text-sky-600 font-semibold text-[11px] group-hover:translate-x-0.5 transition-transform">
                  Login →
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Authenticated Student View
  const selectedSem = currentStudent.semesterResults[selectedSemesterIdx] || currentStudent.semesterResults[0];
  const latestSem = currentStudent.semesterResults[currentStudent.semesterResults.length - 1];

  return (
    <div className="relative min-h-screen pb-12">
      {/* Visible Campus Picture in the background behind the student dashboard */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src={campusBannerImg}
          alt="Kitwe School of Nursing and Midwifery Campus"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[1.0] contrast-[1.02] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/60 via-white/50 to-sky-50/60" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Student Banner Card with Visible Campus Photo */}
        <div className="relative overflow-hidden text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-400/50">
          <img
            src={campusBannerImg}
            alt="Kitwe School Campus"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-sky-950/45 to-transparent" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-sky-700 text-sky-100 font-serif-crest text-2xl font-black flex items-center justify-center border-2 border-sky-400/50 shadow-lg shrink-0">
                {currentStudent.fullName.split(' ').map(n => n[0]).join('')}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif-crest text-xl sm:text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {currentStudent.fullName}
                  </h1>
                  <span className="text-xs text-sky-200 font-semibold drop-shadow-sm">
                    · Enrolled Active
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-sky-100 font-medium drop-shadow-sm">
                  {currentStudent.program} · Year {currentStudent.currentYear}, Semester {currentStudent.currentSemester}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-sky-100 pt-1 font-mono drop-shadow-sm">
                  <span>Student ID: <strong className="text-white">{currentStudent.id}</strong></span>
                  <span>·</span>
                  <span>NRC: <strong className="text-white">{currentStudent.nrc}</strong></span>
                </div>
              </div>
            </div>

          {/* Quick Metrics & Logout */}
          <div className="flex flex-wrap md:flex-col items-end gap-3 shrink-0">
            <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-right">
              <span className="text-[10px] text-sky-300 uppercase tracking-wider block font-bold">Cumulative GPA</span>
              <span className="text-2xl font-extrabold text-sky-200 font-mono">
                {latestSem?.cumulativeGPA.toFixed(2) || '3.80'}
              </span>
            </div>

            <button
              onClick={studentLogout}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-sky-100 flex items-center gap-1.5 transition-colors border border-white/15"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-300" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-100 pb-2">
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'results'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Semester Examination Results &amp; Transcript</span>
        </button>

        <button
          onClick={() => setActiveTab('clinical')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'clinical'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Clinical Placement (Kitwe Teaching Hospital)</span>
        </button>

        <button
          onClick={() => setActiveTab('finances')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'finances'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Tuition &amp; Fees Statement</span>
          {currentStudent.financials.balanceDueZMW > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'announcements'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Academic Timetable &amp; Notices</span>
        </button>
      </div>

      {/* TAB 1: EXAMINATION RESULTS VIEWING */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl border border-sky-100 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Select Semester:
              </label>
              <select
                value={selectedSemesterIdx}
                onChange={(e) => setSelectedSemesterIdx(Number(e.target.value))}
                className="p-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-sky-500"
              >
                {currentStudent.semesterResults.map((sem, idx) => (
                  <option key={idx} value={idx}>
                    Year {sem.yearOfStudy}, Semester {sem.semester} ({sem.academicYear})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTranscriptStudent({ student: currentStudent, semesterIndex: selectedSemesterIdx })}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Result Slip</span>
              </button>

              <button
                onClick={() => setTranscriptStudent({ student: currentStudent })}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Full Official Transcript</span>
              </button>
            </div>
          </div>

          {/* Grades Table */}
          {selectedSem && (
            <div className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-xs">
              
              <div className="p-5 border-b border-sky-100 bg-sky-50/50 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Official Results: Year {selectedSem.yearOfStudy}, Semester {selectedSem.semester}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Academic Year: {selectedSem.academicYear} · Published: {selectedSem.publishedDate}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-slate-500">Semester GPA: </span>
                    <span className="font-mono text-base font-bold text-sky-700">
                      {selectedSem.semesterGPA.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Academic Standing: </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                      {selectedSem.standing.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="p-3">Course Code</th>
                      <th className="p-3">Course Title</th>
                      <th className="p-3 text-center">Credits</th>
                      <th className="p-3 text-center">CA Mark (40%)</th>
                      <th className="p-3 text-center">Exam Mark (60%)</th>
                      <th className="p-3 text-center">Total (100%)</th>
                      <th className="p-3 text-center">Grade</th>
                      <th className="p-3 text-center">Grade Point</th>
                      <th className="p-3">Classification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-xs">
                    {selectedSem.courses.map((c) => (
                      <tr key={c.code} className="hover:bg-sky-50/40">
                        <td className="p-3 font-bold text-slate-900">{c.code}</td>
                        <td className="p-3 font-sans text-slate-800 font-medium">{c.name}</td>
                        <td className="p-3 text-center">{c.credits}</td>
                        <td className="p-3 text-center">{c.continuousAssessment}</td>
                        <td className="p-3 text-center">{c.finalExam}</td>
                        <td className="p-3 text-center font-bold text-slate-900">{c.totalMark}</td>
                        <td className="p-3 text-center font-bold">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            c.grade.startsWith('A') 
                              ? 'bg-sky-100 text-sky-800 border border-sky-200' 
                              : c.grade.startsWith('B')
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            {c.grade}
                          </span>
                        </td>
                        <td className="p-3 text-center">{c.gradePoint.toFixed(1)}</td>
                        <td className="p-3 font-sans text-slate-600">{c.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Grading Guide */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-slate-500 text-[11px] gap-2">
                <span>NMCZ Standards: Pass mark is 50% (Grade C). Distinction threshold is 80%+ (Grade A/A+).</span>
                <span className="font-semibold text-sky-700">Clear Pass: Eligible for Next Clinical Level</span>
              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 2: CLINICAL PLACEMENT AT KITWE TEACHING HOSPITAL */}
      {activeTab === 'clinical' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-sky-700" />
              <h3 className="font-bold text-lg text-slate-900">
                Hospital Clinical Placement Details
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Affiliated ward rotation at Kitwe Teaching Hospital. All student nurses must carry their NMCZ clinical logbook daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-sky-50/70 rounded-xl p-5 border border-sky-100 space-y-3">
              <span className="text-[11px] font-bold uppercase text-sky-900 tracking-wider">Hospital Facility</span>
              <p className="text-base font-bold text-slate-900">{currentStudent.clinicalWard.hospital}</p>
              <div>
                <span className="text-xs text-slate-500 block">Assigned Ward:</span>
                <span className="text-sm font-semibold text-sky-950">{currentStudent.clinicalWard.wardName}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Shift Timing:</span>
                <span className="text-xs font-mono font-medium text-slate-800">{currentStudent.clinicalWard.shift}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
              <span className="text-[11px] font-bold uppercase text-slate-700 tracking-wider">Clinical Supervision</span>
              <div>
                <span className="text-xs text-slate-500 block">Preceptor / Sister-in-Charge:</span>
                <span className="text-sm font-semibold text-slate-900">{currentStudent.clinicalWard.supervisor}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Assessment Format:</span>
                <span className="text-xs text-slate-700">OSCE (Objective Structured Clinical Examination) &amp; Ward Rounds</span>
              </div>
            </div>
          </div>

          {/* Clinical Competencies Checklist */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
              NMCZ Mandatory Ward Competency Portfolio
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-800">Sterile Surgical Dressing &amp; Wound Debridement</span>
                <span className="text-sky-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> 18/20 Logged
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-800">IV Cannulation &amp; Blood Transfusion Protocol</span>
                <span className="text-sky-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> Complete
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-800">Antenatal Assessment &amp; Fetal Heart Monitoring</span>
                <span className="text-sky-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> Complete
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-800">Critical Care Patient Ventilation Management</span>
                <span className="text-blue-700 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> In Progress
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TUITION & FEES STATEMENT */}
      {activeTab === 'finances' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Tuition &amp; Fees Financial Account</h3>
            <p className="text-xs text-slate-500 mt-1">
              Kitwe School of Nursing and Midwifery Bursar&apos;s Office statement of account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">Total Tuition Billed</span>
              <span className="text-xl font-mono font-bold text-slate-900">
                ZMW {currentStudent.financials.totalBilledZMW.toLocaleString()}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
              <span className="text-xs text-sky-700 block">Total Fees Paid</span>
              <span className="text-xl font-mono font-bold text-sky-800">
                ZMW {currentStudent.financials.totalPaidZMW.toLocaleString()}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-xs text-amber-700 block">Current Outstanding Balance</span>
              <span className="text-xl font-mono font-bold text-amber-900">
                ZMW {currentStudent.financials.balanceDueZMW.toLocaleString()}
              </span>
            </div>
          </div>

          {paymentSuccessMsg && (
            <div className="p-4 bg-sky-100 border border-sky-300 rounded-xl text-xs text-sky-900 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{paymentSuccessMsg}</span>
            </div>
          )}

          {/* Quick Pay Box if balance exists */}
          {currentStudent.financials.balanceDueZMW > 0 ? (
            <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Pay Tuition Installment Online
              </h4>

              <form onSubmit={handlePayTuition} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Amount (ZMW)</label>
                    <input
                      type="number"
                      value={feeAmount}
                      onChange={(e) => setFeeAmount(e.target.value)}
                      max={currentStudent.financials.balanceDueZMW}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Channel</label>
                    <select
                      value={payMethod}
                      onChange={(e) => setPayMethod(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white"
                    >
                      <option value="AIRTEL">Airtel Money (+260)</option>
                      <option value="MTN">MTN MoMo (+260)</option>
                      <option value="CARD">Visa / Mastercard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Account / Mobile Number</label>
                    <input
                      type="text"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  {isProcessingPayment ? 'Processing Mobile Money...' : `Pay ZMW ${Number(feeAmount || 0).toLocaleString()} Now`}
                </button>
              </form>
            </div>
          ) : (
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Your tuition account is fully cleared for this semester. No outstanding balance.</span>
            </div>
          )}

        </div>
      )}

      {/* TAB 4: ACADEMIC NOTICES */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {notices.map((n) => (
            <div key={n.id} className="bg-white rounded-xl border border-sky-100 p-5 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-sky-800">{n.category}</span>
                <span className="text-[11px] text-slate-400">{n.date}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.content}</p>
            </div>
          ))}
        </div>
      )}

      </div>
    </div>
  );
};
