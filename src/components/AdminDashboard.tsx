import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ApplicationForm, 
  ApplicationStatus, 
  Student, 
  FacultyUser 
} from '../types';
import { 
  ShieldCheck, 
  FileCheck, 
  Users, 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  CreditCard, 
  AlertCircle, 
  FileText, 
  Printer, 
  LogOut, 
  Save, 
  Edit3, 
  PlusCircle, 
  Eye, 
  Check, 
  X 
} from 'lucide-react';
import campusBannerImg from '../assets/images/campus_banner_1790582534269.jpg';

export const AdminDashboard: React.FC = () => {
  const { 
    adminUser, 
    facultyLogin, 
    facultyLogout, 
    facultyMembers, 
    applications, 
    updateApplicationStatus, 
    students, 
    updateStudentCourseMark,
    addNotice,
    setTranscriptStudent,
    programs 
  } = useApp();

  // Selected Tab in Admin: 'applications' | 'grades' | 'finances' | 'notices'
  const [activeTab, setActiveTab] = useState<'applications' | 'grades' | 'finances' | 'notices'>('applications');

  // Application Management State
  const [appSearch, setAppSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedApp, setSelectedApp] = useState<ApplicationForm | null>(null);
  
  // Status update modal inputs
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('ADMITTED');
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [interviewDate, setInterviewDate] = useState('October 14, 2026 at 09:00 hrs');
  const [admissionRemarks, setAdmissionRemarks] = useState('');

  // Grade Management State
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [selectedSemesterIdx, setSelectedSemesterIdx] = useState<number>(0);
  const [editingCourseCode, setEditingCourseCode] = useState<string | null>(null);
  const [editCaMark, setEditCaMark] = useState<number>(30);
  const [editExamMark, setEditExamMark] = useState<number>(50);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // New Notice state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Admissions' | 'Examinations' | 'Clinical Practice' | 'General'>('Examinations');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePublished, setNoticePublished] = useState(false);

  // If faculty is not logged in, show Faculty Sign In view with visible campus background
  if (!adminUser) {
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
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-800 mx-auto flex items-center justify-center border border-sky-100 shadow-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-2.5 py-0.5 rounded-full border border-sky-200">
              Kitwe School Faculty &amp; Staff
            </span>
            <h1 className="font-serif-crest text-2xl font-bold text-slate-900">
              Faculty Admin Portal
            </h1>
            <p className="text-xs text-slate-600">
              Restricted management area for Admissions Board, Examinations Directorate, and Clinical Preceptors.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
              Select Authorized Staff Identity (1-Click Demo Login):
            </span>

            {facultyMembers.map((fac) => (
              <button
                key={fac.id}
                type="button"
                onClick={() => facultyLogin(fac.id)}
                className="w-full p-3 rounded-xl border border-sky-100 hover:border-sky-300 hover:bg-sky-50/80 text-left transition-all text-xs flex items-center justify-between group bg-white shadow-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 group-hover:text-sky-800 block">{fac.name}</span>
                  <span className="text-slate-500 block text-[11px]">{fac.designation}</span>
                </div>
                <span className="text-sky-600 font-semibold text-xs shrink-0 pl-2">
                  Enter →
                </span>
              </button>
            ))}
          </div>

          <div className="p-3 bg-sky-50/60 border border-sky-100 rounded-xl text-[11px] text-slate-600 text-center">
            Role-Based Access Control: Verification audits are securely logged.
          </div>
        </div>
      </div>
    );
  }

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.referenceNumber.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.firstName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.lastName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.nrcNumber.toLowerCase().includes(appSearch.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenStatusModal = (app: ApplicationForm) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setReviewerNotes(app.reviewerNotes || '');
    setInterviewDate(app.interviewDate || 'October 14, 2026 at 09:00 hrs');
    setAdmissionRemarks(app.admissionRemarks || 'Congratulations! You have been provisionally admitted into the Diploma in Registered Nursing for the January 2027 intake.');
  };

  const handleSaveStatus = () => {
    if (!selectedApp) return;
    updateApplicationStatus(
      selectedApp.referenceNumber,
      newStatus,
      reviewerNotes,
      newStatus === 'INTERVIEW_SCHEDULED' ? interviewDate : undefined,
      newStatus === 'ADMITTED' ? admissionRemarks : undefined
    );
    setSelectedApp(null);
  };

  // Student results management
  const currentSelectedStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const currentSemResult = currentSelectedStudent?.semesterResults[selectedSemesterIdx] || currentSelectedStudent?.semesterResults[0];

  const handleStartEditCourse = (courseCode: string, ca: number, exam: number) => {
    setEditingCourseCode(courseCode);
    setEditCaMark(ca);
    setEditExamMark(exam);
  };

  const handleSaveCourseMark = () => {
    if (!editingCourseCode || !currentSelectedStudent) return;
    updateStudentCourseMark(
      currentSelectedStudent.id,
      selectedSemesterIdx,
      editingCourseCode,
      Number(editCaMark),
      Number(editExamMark)
    );
    setEditingCourseCode(null);
    setSaveSuccessMsg('Marks saved and GPA recalculated successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;
    addNotice({
      title: noticeTitle,
      category: noticeCategory,
      content: noticeContent,
      urgent: false
    });
    setNoticeTitle('');
    setNoticeContent('');
    setNoticePublished(true);
    setTimeout(() => setNoticePublished(false), 4000);
  };

  // Calculations for finance audit
  const totalRevenueZMW = applications.reduce((sum, app) => sum + (app.payment?.amountZMW || 0), 0);

  return (
    <div className="relative min-h-screen pb-12">
      {/* Visible Campus Picture in the background behind the entire dashboard */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src={campusBannerImg}
          alt="Kitwe School of Nursing and Midwifery Campus"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[1.0] contrast-[1.02] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/60 via-white/50 to-sky-50/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Admin Top Banner with Visible Campus Photo */}
        <div className="relative overflow-hidden text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-sky-400/50">
          <img
            src={campusBannerImg}
            alt="Kitwe School Campus Administration Block"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.02]"
          />
          {/* Subtle gradient so the photo is clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-600/90 text-white font-bold flex items-center justify-center shrink-0 shadow-lg border border-sky-300/40">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-200 font-semibold uppercase tracking-wider drop-shadow-sm">Admin Console</span>
                <span className="text-xs text-sky-300">·</span>
                <span className="text-xs text-sky-200">Kitwe School Faculty Hub</span>
              </div>
              <h1 className="font-serif-crest text-xl sm:text-2xl font-bold mt-1 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {adminUser.name}
              </h1>
              <p className="text-xs text-sky-100 drop-shadow-sm">
                {adminUser.designation} · {adminUser.email}
              </p>
            </div>
          </div>

          {/* Quick Stats & Sign Out */}
          <div className="relative z-10 flex flex-wrap md:flex-col items-end gap-3 shrink-0">
            <div className="flex items-center gap-3 bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-xs shadow-md">
              <div>
                <span className="text-sky-200 block text-[10px] uppercase font-semibold">Total Applications</span>
                <span className="font-bold text-white font-mono text-sm">{applications.length}</span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div>
                <span className="text-sky-200 block text-[10px] uppercase font-semibold">Enrolled Students</span>
                <span className="font-bold text-white font-mono text-sm">{students.length}</span>
              </div>
            </div>

            <button
              onClick={facultyLogout}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-xs text-white flex items-center gap-1.5 transition-colors border border-rose-300/40 shadow-sm backdrop-blur-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Faculty</span>
            </button>
          </div>
        </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-sky-100 pb-2">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Online Admissions Management</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-sky-700 text-white font-mono">
            {applications.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('grades')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'grades'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Student Examination &amp; Grade Entry</span>
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
          <span>Application Fee Audit &amp; Revenue</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'notices'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Notice / Circular</span>
        </button>
      </div>

      {/* TAB 1: ONLINE APPLICATIONS REVIEW */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-sky-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                placeholder="Search reference, name, or NRC..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-sky-200 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold text-slate-700"
              >
                <option value="ALL">All Statuses</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                <option value="ADMITTED">Admitted</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-sky-50/50 text-slate-700 uppercase font-semibold text-[11px] border-b border-sky-100">
                  <tr>
                    <th className="p-3.5">Ref Number</th>
                    <th className="p-3.5">Applicant Name</th>
                    <th className="p-3.5">NRC Number</th>
                    <th className="p-3.5">Program Applied</th>
                    <th className="p-3.5 text-center">App Fee</th>
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredApps.map((app) => (
                    <tr key={app.referenceNumber} className="hover:bg-sky-50/40 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-sky-900">{app.referenceNumber}</td>
                      <td className="p-3.5 font-medium text-slate-900">
                        {app.firstName} {app.lastName}
                        <span className="block text-[10px] text-slate-400 font-sans">{app.phone}</span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">{app.nrcNumber}</td>
                      <td className="p-3.5 text-slate-700">
                        <span className="font-semibold text-slate-900 block truncate max-w-[200px]">
                          {programs.find(p => p.id === app.programId)?.title || app.programId}
                        </span>
                        <span className="text-[10px] text-slate-400">{app.intakeSeason}</span>
                      </td>
                      <td className="p-3.5 text-center font-mono">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                          ZMW 250 (PAID)
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          app.status === 'ADMITTED'
                            ? 'bg-sky-100 text-sky-800 border border-sky-200'
                            : app.status === 'INTERVIEW_SCHEDULED'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : app.status === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {app.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleOpenStatusModal(app)}
                          className="px-3 py-1.5 bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1 border border-sky-200"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review &amp; Decide</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* APPLICATION REVIEW MODAL */}
          {selectedApp && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 space-y-5 text-slate-900">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-sky-800">{selectedApp.referenceNumber}</span>
                    <h3 className="font-bold text-base text-slate-900 mt-0.5">
                      Review Application: {selectedApp.firstName} {selectedApp.lastName}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Candidate Academic Breakdown */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-sky-50/40 p-4 rounded-xl border border-sky-100">
                  <div>
                    <span className="text-slate-500 block">NRC Number:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedApp.nrcNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Secondary School:</span>
                    <span className="font-semibold text-slate-900">{selectedApp.secondarySchool} ({selectedApp.completionYear})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ECZ Exam Number:</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedApp.eczExaminationNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Next of Kin:</span>
                    <span className="text-slate-900">{selectedApp.nextOfKinName} ({selectedApp.nextOfKinRelationship})</span>
                  </div>
                </div>

                {/* Verified O-Level Grades */}
                <div>
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                    Evaluated ECZ O-Level Grades
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 rounded bg-sky-50 border border-sky-100">
                      <span className="text-slate-500 block text-[10px]">English</span>
                      <span className="font-bold text-sky-900">{selectedApp.grades.english}</span>
                    </div>
                    <div className="p-2 rounded bg-sky-50 border border-sky-100">
                      <span className="text-slate-500 block text-[10px]">Mathematics</span>
                      <span className="font-bold text-sky-900">{selectedApp.grades.mathematics}</span>
                    </div>
                    <div className="p-2 rounded bg-sky-50 border border-sky-100">
                      <span className="text-slate-500 block text-[10px]">Biology</span>
                      <span className="font-bold text-sky-900">{selectedApp.grades.biologyOrScience}</span>
                    </div>
                    <div className="p-2 rounded bg-sky-50 border border-sky-100">
                      <span className="text-slate-500 block text-[10px]">Science/Chem</span>
                      <span className="font-bold text-sky-900">{selectedApp.grades.chemistryOrPhysicalScience || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Uploaded Documents */}
                <div>
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                    Uploaded Certified Documents ({selectedApp.documents.length})
                  </h5>
                  <ul className="space-y-1.5 text-xs">
                    {selectedApp.documents.map((d) => (
                      <li key={d.id} className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="font-medium text-slate-800">{d.title}</span>
                        <span className="text-[11px] text-sky-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> Verified
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status Decision Form */}
                <div className="space-y-3 pt-2 border-t border-slate-200">
                  <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wide">
                    Admissions Committee Decision
                  </h5>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Set Admission Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                    >
                      <option value="SUBMITTED">Submitted (Pending Review)</option>
                      <option value="UNDER_REVIEW">Under Review by Faculty</option>
                      <option value="INTERVIEW_SCHEDULED">Interview Scheduled / Shortlisted</option>
                      <option value="ADMITTED">Admitted (Issue Provisional Offer Letter)</option>
                      <option value="REJECTED">Declined / Not Admitted</option>
                    </select>
                  </div>

                  {newStatus === 'INTERVIEW_SCHEDULED' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Interview Date &amp; Time</label>
                      <input
                        type="text"
                        value={interviewDate}
                        onChange={(e) => setInterviewDate(e.target.value)}
                        placeholder="October 14, 2026 at 09:00 hrs"
                        className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                  )}

                  {newStatus === 'ADMITTED' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Admission Offer Letter Remarks</label>
                      <textarea
                        value={admissionRemarks}
                        onChange={(e) => setAdmissionRemarks(e.target.value)}
                        rows={2}
                        className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Reviewer Internal Notes</label>
                    <input
                      type="text"
                      value={reviewerNotes}
                      onChange={(e) => setReviewerNotes(e.target.value)}
                      placeholder="e.g. ECZ credits verified. Eligible for admission."
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveStatus}
                    className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Decision &amp; Update Live Status</span>
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: STUDENT EXAMINATION MARKS & GRADES */}
      {activeTab === 'grades' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Select Student:</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => {
                    setSelectedStudentId(e.target.value);
                    setSelectedSemesterIdx(0);
                  }}
                  className="p-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.id}) · {s.program.split('(')[0]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Select Semester:</label>
                <select
                  value={selectedSemesterIdx}
                  onChange={(e) => setSelectedSemesterIdx(Number(e.target.value))}
                  className="p-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                >
                  {currentSelectedStudent?.semesterResults.map((sem, idx) => (
                    <option key={idx} value={idx}>
                      Year {sem.yearOfStudy}, Sem {sem.semester} ({sem.academicYear})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setTranscriptStudent({ student: currentSelectedStudent, semesterIndex: selectedSemesterIdx })}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Preview Official Statement of Results</span>
            </button>
          </div>

          {saveSuccessMsg && (
            <div className="p-3 bg-sky-100 border border-sky-300 rounded-xl text-xs text-sky-900 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* Marks Editor Table */}
          {currentSemResult && (
            <div className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-xs">
              
              <div className="p-4 bg-sky-50/50 border-b border-sky-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Grading Sheet: {currentSelectedStudent.fullName} ({currentSelectedStudent.id})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Year {currentSemResult.yearOfStudy}, Semester {currentSemResult.semester} · Semester GPA: <strong className="text-sky-700 font-mono">{currentSemResult.semesterGPA.toFixed(2)}</strong>
                  </p>
                </div>

                <span className="text-xs font-mono font-bold text-slate-500">
                  Total Courses: {currentSemResult.courses.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="p-3">Code</th>
                      <th className="p-3">Course Title</th>
                      <th className="p-3 text-center">Continuous Assessment (40%)</th>
                      <th className="p-3 text-center">Final Exam (60%)</th>
                      <th className="p-3 text-center">Total (100%)</th>
                      <th className="p-3 text-center">Grade</th>
                      <th className="p-3 text-center">GP</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-xs">
                    {currentSemResult.courses.map((course) => {
                      const isEditing = editingCourseCode === course.code;

                      return (
                        <tr key={course.code} className="hover:bg-sky-50/30">
                          <td className="p-3 font-bold text-slate-900">{course.code}</td>
                          <td className="p-3 font-sans text-slate-800">{course.name}</td>
                          
                          <td className="p-3 text-center">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editCaMark}
                                onChange={(e) => setEditCaMark(Number(e.target.value))}
                                max={40}
                                min={0}
                                className="w-16 p-1 text-center border border-sky-500 rounded bg-white font-mono"
                              />
                            ) : (
                              <span>{course.continuousAssessment}</span>
                            )}
                          </td>

                          <td className="p-3 text-center">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editExamMark}
                                onChange={(e) => setEditExamMark(Number(e.target.value))}
                                max={60}
                                min={0}
                                className="w-16 p-1 text-center border border-sky-500 rounded bg-white font-mono"
                              />
                            ) : (
                              <span>{course.finalExam}</span>
                            )}
                          </td>

                          <td className="p-3 text-center font-bold text-slate-900">
                            {isEditing ? Number(editCaMark) + Number(editExamMark) : course.totalMark}
                          </td>

                          <td className="p-3 text-center font-bold">
                            <span className="text-sky-700">{course.grade}</span>
                          </td>

                          <td className="p-3 text-center">{course.gradePoint.toFixed(1)}</td>

                          <td className="p-3 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={handleSaveCourseMark}
                                  className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-[11px] font-bold flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Save</span>
                                </button>
                                <button
                                  onClick={() => setEditingCourseCode(null)}
                                  className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px]"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleStartEditCourse(course.code, course.continuousAssessment, course.finalExam)}
                                className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded text-[11px] font-semibold flex items-center gap-1 ml-auto border border-sky-200"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit Mark</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 3: FEE AUDIT & REVENUE */}
      {activeTab === 'finances' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Application Fee Financial Audit Log</h3>
            <p className="text-xs text-slate-500 mt-1">
              Reconciled Mobile Money and Bank Card transactions for 2026/2027 admissions processing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
              <span className="text-xs text-sky-800 block">Total Application Fee Revenue</span>
              <span className="text-2xl font-mono font-extrabold text-sky-900">
                ZMW {totalRevenueZMW.toLocaleString()}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-600 block">Total Paid Submissions</span>
              <span className="text-2xl font-mono font-extrabold text-slate-900">
                {applications.filter(a => a.payment?.status === 'COMPLETED').length} Applicants
              </span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-xs text-blue-800 block">Treasury Reconciliation</span>
              <span className="text-xs font-bold text-blue-900 block mt-1">
                ZANACO Acc # 559281900142
              </span>
              <span className="text-[11px] text-blue-700">Audit Status: Balanced</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50/50 text-slate-700 uppercase font-semibold text-[11px] border-b border-sky-100">
                <tr>
                  <th className="p-3">Payment Receipt</th>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Reference Code</th>
                  <th className="p-3 text-right">Amount (ZMW)</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-xs">
                {applications.map((app) => (
                  <tr key={app.referenceNumber} className="hover:bg-sky-50/30">
                    <td className="p-3 font-bold text-slate-900">{app.payment?.paymentId || 'N/A'}</td>
                    <td className="p-3 font-sans font-medium text-slate-800">{app.firstName} {app.lastName}</td>
                    <td className="p-3 font-sans text-slate-600">{app.payment?.method || 'Mobile Money'}</td>
                    <td className="p-3 text-slate-500">{app.payment?.referenceCode}</td>
                    <td className="p-3 text-right font-bold text-sky-800">ZMW 250.00</td>
                    <td className="p-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                        CLEARED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PUBLISH NOTICE */}
      {activeTab === 'notices' && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Publish Faculty Circular or Notice</h3>
            <p className="text-xs text-slate-500 mt-1">
              Announcements published here are instantly broadcasted to the Student Portal and Homepage.
            </p>
          </div>

          {noticePublished && (
            <div className="p-3 bg-sky-100 border border-sky-300 rounded-xl text-xs text-sky-900 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Notice broadcasted successfully to all student portals!</span>
            </div>
          )}

          <form onSubmit={handlePublishNotice} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title *</label>
              <input
                type="text"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                placeholder="e.g. Schedule for Clinical Ward Induction Ceremony"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={noticeCategory}
                onChange={(e) => setNoticeCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white font-medium"
              >
                <option value="Examinations">Examinations &amp; Ratification</option>
                <option value="Admissions">Admissions &amp; Registration</option>
                <option value="Clinical Practice">Clinical Practice &amp; Wards</option>
                <option value="General">General School Circular</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Content *</label>
              <textarea
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                rows={4}
                placeholder="Enter official circular message..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Official Notice</span>
            </button>
          </form>
        </div>
      )}

      </div>
    </div>
  );
};
