import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NewsArticle, AcademicEvent } from '../types';
import { 
  Bell, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  GraduationCap, 
  Sparkles, 
  X, 
  Share2, 
  Printer, 
  Search,
  Filter,
  Megaphone
} from 'lucide-react';

export const LatestNewsSection: React.FC = () => {
  const { setActiveTab, setTrackerPrefillRef } = useApp();

  // Filter state
  const [filterAudience, setFilterAudience] = useState<'ALL' | 'Applicants' | 'Students'>('ALL');
  const [activeTab, setActiveTabSection] = useState<'all' | 'announcements' | 'events'>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const newsArticles: NewsArticle[] = [
    {
      id: 'news-1',
      title: 'Official Opening of 2026/2027 Online Application Portal for January Intake',
      category: 'Admissions Notice',
      date: 'September 24, 2026',
      author: 'Admissions Directorate & Registrar',
      urgent: true,
      targetAudience: 'Applicants',
      readTime: '3 min read',
      summary: 'Applications are officially invited for the Diploma in Registered Nursing, Diploma in Registered Midwifery, and Advanced Diploma in Public Health Nursing. Apply online with certified ECZ credentials.',
      content: `The Admissions Selection Board of Kitwe School of Nursing and Midwifery wishes to notify the general public that online admissions for the 2026/2027 Academic Year (January 2027 Intake) are officially open.\n\nAll prospective candidates must possess at least five (5) O-Level Credits in the Examinations Council of Zambia (ECZ) or equivalent, including English Language, Mathematics, and Biology/Combined Sciences.\n\nThe application processing fee is ZMW 250.00 payable securely via integrated Mobile Money (Airtel Money, MTN MoMo) or bank deposit. Applications submitted online are indexed and processed within 3 to 5 business days.\n\nCandidates are advised to avoid third-party agents and submit directly via the official portal.`
    },
    {
      id: 'news-2',
      title: 'Publication of Ratified Semester II Final Examination Marks & Result Slips',
      category: 'Official Announcement',
      date: 'September 20, 2026',
      author: 'Office of the Examinations Officer',
      targetAudience: 'Students',
      readTime: '2 min read',
      summary: 'The Academic Board has officially released Semester II examination results for all Year 1, Year 2, and Year 3 cohorts. Students can now view their GPA and print official transcript slips.',
      content: `The Examinations Officer, in conjunction with the Academic Ratification Board, announces the official release of the Semester II Examination Results for the 2025/2026 academic calendar.\n\nStudents are advised to log into the Student Portal using their Student ID (e.g. SN/2024/XXXX) or registered NRC number to inspect individual course Continuous Assessment (CA 40%), Final Examination marks (60%), and Cumulative Grade Point Averages (CGPA).\n\nOfficial stamped statement of results slips are available for immediate printing through the portal or collection from the Examinations Registry at the Administration Block.`
    },
    {
      id: 'news-3',
      title: 'Clinical Ward Rotation Roster Released for Kitwe Teaching Hospital (Wards 4, 8 & ICU)',
      category: 'Clinical & Wards',
      date: 'September 16, 2026',
      author: 'Clinical Practice Coordinator & KTH Matron',
      targetAudience: 'Students',
      readTime: '4 min read',
      summary: 'All 2nd and 3rd Year Registered Nursing and Midwifery students must report for their clinical rotation shifts at Kitwe Teaching Hospital in full clinical regalia with NMCZ logbooks.',
      content: `The Clinical Practice Coordination Unit, in collaboration with the Kitwe Teaching Hospital Nursing Directorate, has published the duty roster for the upcoming rotation cycle.\n\nWards covered include Ward 8 (High Dependency Obstetric & Surgical), Ward 4 (Male Surgical), Pediatric Intensive Care, and the Labour Ward Delivery Complex.\n\nKey Directives:\n1. Shift handovers are scheduled for 07:00 hrs (Morning) and 13:30 hrs (Afternoon).\n2. All trainees must carry their NMCZ Clinical Procedure Logbooks for preceptor sign-off.\n3. Mandatory adherence to sterile attire and professional nursing code of conduct.`
    },
    {
      id: 'news-4',
      title: 'NMCZ Mandatory Licensure Indexing & Verification for Incoming Cohort',
      category: 'Official Announcement',
      date: 'September 10, 2026',
      author: 'Principal Tutor & NMCZ Liaison',
      targetAudience: 'Applicants',
      readTime: '2 min read',
      summary: 'All provisionally admitted candidates must submit verified original ECZ certificates for official indexing with the Nursing and Midwifery Council of Zambia prior to matriculation.',
      content: `In accordance with the Health Professions Act and statutory regulations governing nursing education in Zambia, all provisionally admitted candidates must undergo mandatory indexing with the Nursing and Midwifery Council of Zambia (NMCZ).\n\nFailure to complete indexing disqualifies a student from sitting for national qualifying licensing board examinations upon graduation.\n\nVerification of original documents takes place at the Main Administration Auditorium.`
    }
  ];

  const upcomingEvents: AcademicEvent[] = [
    {
      id: 'evt-1',
      title: 'Aptitude & Oral Entrance Interviews',
      date: 'October 14, 2026',
      month: 'OCT',
      day: '14',
      time: '08:30 – 16:00 hrs',
      location: 'Administration Block Conference Room B',
      audience: 'Applicants',
      badge: 'Shortlisted Candidates',
      description: 'Faculty panel interviews for shortlisted January 2027 applicants. Original certificates and certified NRC required.'
    },
    {
      id: 'evt-2',
      title: 'Closing Deadline for January 2027 Admissions',
      date: 'November 20, 2026',
      month: 'NOV',
      day: '20',
      time: '23:59 hrs',
      location: 'Online Admissions Portal',
      audience: 'Applicants',
      badge: 'Strict Deadline',
      description: 'Final cutoff date for submitting online applications and ZMW 250 fee clearance for the January 2027 intake.'
    },
    {
      id: 'evt-3',
      title: 'Publication of Ratified Admission Offer Letters',
      date: 'December 05, 2026',
      month: 'DEC',
      day: '05',
      time: '10:00 hrs',
      location: 'Student & Application Portal',
      audience: 'Applicants',
      badge: 'Offer Letters Issued',
      description: 'Official release of provisional admission offer letters downloadable with formal seal via the online tracker.'
    },
    {
      id: 'evt-4',
      title: 'First-Year Student Orientation & Clinical Induction',
      date: 'January 12, 2027',
      month: 'JAN',
      day: '12',
      time: '08:00 hrs',
      location: 'Main Auditorium & KTH Grounds',
      audience: 'Students',
      badge: 'Academic Term Start',
      description: 'Welcome address by Principal Tutor, campus tour, medical fitness review, and issue of clinical uniforms and student IDs.'
    },
    {
      id: 'evt-5',
      title: 'Commencement of Semester I Didactic Lectures & OSCE Labs',
      date: 'January 19, 2027',
      month: 'JAN',
      day: '19',
      time: '07:30 hrs',
      location: 'Lecture Theaters 1 & 2',
      audience: 'Students',
      badge: 'All Cohorts',
      description: 'Formal commencement of theoretical classes, skills laboratory simulation, and hospital ward rotations.'
    }
  ];

  // Filtering
  const filteredArticles = newsArticles.filter(art => {
    if (filterAudience === 'ALL') return true;
    return art.targetAudience === filterAudience || art.targetAudience === 'Public';
  });

  const filteredEvents = upcomingEvents.filter(evt => {
    if (filterAudience === 'ALL') return true;
    if (filterAudience === 'Applicants') return evt.audience === 'Applicants' || evt.audience === 'All';
    if (filterAudience === 'Students') return evt.audience === 'Students' || evt.audience === 'All';
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Urgent Announcement Top Banner */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Megaphone className="w-5 h-5 text-sky-100 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white text-sky-700 px-2 py-0.5 rounded-full">
                  Urgent Notice
                </span>
                <span className="text-xs text-sky-100 font-medium">Admissions Directorate</span>
              </div>
              <p className="text-xs sm:text-sm font-bold mt-0.5">
                January 2027 Online Application Window Open · Diploma in Registered Nursing &amp; Midwifery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('apply')}
              className="px-4 py-2 bg-white text-sky-700 hover:bg-sky-50 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Apply Online Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setSelectedArticle(newsArticles[0]);
              }}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
            >
              Read Notice
            </button>
          </div>
        </div>

        {/* Section Title & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sky-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-sky-600" />
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-2.5 py-0.5 rounded-full border border-sky-200">
                Institutional Circulars &amp; Calendar
              </span>
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Latest News &amp; Official Updates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Official circulars, academic board announcements, interview schedules, and calendar events for students and applicants.
            </p>
          </div>

          {/* Audience Filter Pills */}
          <div className="flex items-center gap-1.5 bg-sky-50 p-1.5 rounded-xl border border-sky-200/80 shrink-0">
            <button
              onClick={() => setFilterAudience('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterAudience === 'ALL'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-800'
              }`}
            >
              All Updates
            </button>

            <button
              onClick={() => setFilterAudience('Applicants')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterAudience === 'Applicants'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-800'
              }`}
            >
              For Applicants
            </button>

            <button
              onClick={() => setFilterAudience('Students')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterAudience === 'Students'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-800'
              }`}
            >
              For Current Students
            </button>
          </div>
        </div>

        {/* Main Grid: 2/3 News & Circulars + 1/3 Upcoming Academic Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Official News & Announcements (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                <span>Official Announcements &amp; Circulars</span>
              </h3>
              <span className="text-xs text-sky-700 font-medium">
                {filteredArticles.length} notices found
              </span>
            </div>

            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-sky-100 hover:border-sky-300 rounded-2xl p-5 sm:p-6 transition-all hover:shadow-sm space-y-3 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {article.date}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[11px] text-slate-500 font-medium">{article.readTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        article.targetAudience === 'Applicants'
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {article.targetAudience === 'Applicants' ? 'For Applicants' : 'Current Students'}
                      </span>

                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 
                      onClick={() => setSelectedArticle(article)}
                      className="font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer leading-snug"
                    >
                      {article.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">
                      By: <strong className="text-slate-700">{article.author}</strong>
                    </span>

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Full Circular</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Upcoming Event Dates & Academic Calendar (1 Col) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Upcoming Key Dates</span>
              </h3>
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                2026/2027 Calendar
              </span>
            </div>

            <div className="bg-sky-50/40 rounded-2xl border border-sky-100 p-4 sm:p-5 space-y-4">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-xl p-3.5 border border-sky-100 hover:border-sky-300 shadow-2xs transition-all space-y-2"
                >
                  <div className="flex items-start gap-3">
                    {/* Stylized Calendar Date Block */}
                    <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex flex-col items-center justify-center shrink-0 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase leading-none">{evt.month}</span>
                      <span className="text-base font-black leading-none mt-0.5 font-mono">{evt.day}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200 truncate">
                          {evt.badge}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 mt-1 leading-snug">
                        {evt.title}
                      </h5>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed pl-15">
                    {evt.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {evt.time}
                    </span>
                    <span className="flex items-center gap-1 truncate max-w-[130px]" title={evt.location}>
                      <MapPin className="w-3 h-3 text-sky-500" />
                      {evt.location.split(',')[0]}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-center">
                <button
                  onClick={() => setActiveTab('programs')}
                  className="w-full py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-xs font-bold transition-colors border border-sky-200 flex items-center justify-center gap-1"
                >
                  <span>Download Academic Calendar Prospectus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* FULL ARTICLE / CIRCULAR DETAILS MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-900 space-y-5 border border-sky-100 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-500">
                  {selectedArticle.date}
                </span>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-crest text-xl sm:text-2xl font-bold text-slate-950 leading-snug">
                {selectedArticle.title}
              </h3>
              <p className="text-xs text-sky-700 font-semibold">
                Issued by: {selectedArticle.author} · Kitwe School of Nursing and Midwifery
              </p>
            </div>

            <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-100 text-xs text-slate-600 font-medium">
              <strong>Official Circular Summary:</strong> {selectedArticle.summary}
            </div>

            <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed border-t border-slate-100 pt-4 max-h-[360px] overflow-y-auto pr-1">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedArticle.targetAudience === 'Applicants' ? (
                  <button
                    onClick={() => {
                      setSelectedArticle(null);
                      setActiveTab('apply');
                    }}
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Proceed to Online Application</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedArticle(null);
                      setActiveTab('student-portal');
                    }}
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Open Student Results Portal</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close Notice
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
