import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Search, 
  FileText, 
  UserCheck, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentStudent, 
    studentLogout, 
    adminUser, 
    facultyLogout 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sky-100 shadow-xs">
      {/* Top Institutional Bar in clean light blue and white */}
      <div className="bg-sky-50/80 border-b border-sky-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              Kitwe Teaching Hospital Grounds, Kuomboka Rd, Kitwe, Zambia
            </span>
            <span className="hidden md:inline-block text-sky-300">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              Admissions: +260 (212) 226-315 / +260 97 784 2190
            </span>
          </div>
          
          <div className="flex items-center gap-4 ml-auto text-slate-600 font-medium">
            <span className="hidden sm:inline">NMCZ &amp; HPCZ Accredited</span>
            <span className="text-sky-800 bg-white border border-sky-200 px-2 py-0.5 rounded text-[11px] font-semibold shadow-2xs">
              2026/2027 Admissions Open
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Name */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3.5 text-left focus:outline-hidden group"
          >
            {/* Crest Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 p-2 text-white shadow-md flex items-center justify-center shrink-0 border border-sky-300 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                {/* Traditional Lamp of Nursing and Cross */}
                <path d="M20 5V35M10 15H30" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="20" cy="20" r="16" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="2 3" />
                <path d="M12 28C14 31 26 31 28 28" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                <circle cx="20" cy="11" r="2.5" fill="#38BDF8" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-crest text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-none">
                  KITWE SCHOOL OF NURSING &amp; MIDWIFERY
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-sky-700 font-medium tracking-wide mt-1">
                Copperbelt Provincial Health Directorate · Affiliated with Kitwe Teaching Hospital
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'home' 
                  ? 'text-sky-800 bg-sky-50 font-semibold' 
                  : 'text-slate-600 hover:text-sky-800 hover:bg-sky-50/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('programs')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'programs' 
                  ? 'text-sky-800 bg-sky-50 font-semibold' 
                  : 'text-slate-600 hover:text-sky-800 hover:bg-sky-50/60'
              }`}
            >
              Programs
            </button>

            <button
              onClick={() => setActiveTab('apply')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-xs ${
                activeTab === 'apply'
                  ? 'bg-sky-600 text-white shadow-sky-600/30 ring-2 ring-sky-300'
                  : 'bg-sky-500 hover:bg-sky-600 text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Apply Online
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'track' 
                  ? 'text-sky-800 bg-sky-50 font-semibold' 
                  : 'text-slate-600 hover:text-sky-800 hover:bg-sky-50/60'
              }`}
            >
              <Search className="w-4 h-4 text-sky-500" />
              Track Status
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1" />

            {/* Student Portal Nav Item */}
            <button
              onClick={() => setActiveTab('student-portal')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'student-portal' 
                  ? 'text-sky-900 bg-sky-100/70 font-semibold border border-sky-300' 
                  : 'text-slate-700 hover:text-sky-900 hover:bg-sky-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-sky-600" />
              <span>Student Portal</span>
              {currentStudent && (
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" title="Logged in" />
              )}
            </button>

            {/* Admin Nav Item */}
            <button
              onClick={() => setActiveTab('admin-portal')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'admin-portal' 
                  ? 'text-blue-900 bg-blue-50 font-semibold border border-blue-200' 
                  : 'text-slate-700 hover:text-blue-900 hover:bg-sky-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Faculty Admin</span>
              {adminUser && (
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" title="Admin active" />
              )}
            </button>

            {/* Active User Quick Badge */}
            {(currentStudent || adminUser) && (
              <div className="flex items-center gap-2 pl-2">
                {currentStudent && (
                  <div className="flex items-center gap-1.5 bg-sky-50 border border-sky-200 py-1 px-2.5 rounded-lg text-xs text-sky-900">
                    <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span className="font-medium truncate max-w-[100px]">{currentStudent.fullName.split(' ')[0]}</span>
                    <button 
                      onClick={studentLogout} 
                      className="text-sky-400 hover:text-rose-600 ml-1" 
                      title="Log Out Student"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {adminUser && (
                  <div className="flex items-center gap-1.5 bg-blue-50 py-1 px-2.5 rounded-lg text-xs text-blue-900 border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-medium truncate max-w-[100px]">Faculty</span>
                    <button 
                      onClick={facultyLogout} 
                      className="text-blue-400 hover:text-rose-600 ml-1" 
                      title="Log Out Faculty"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setActiveTab('apply')}
              className="bg-sky-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-xs"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sky-100 bg-white px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-50"
          >
            Home
          </button>
          <button
            onClick={() => { setActiveTab('programs'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-50"
          >
            Academic Programs &amp; Requirements
          </button>
          <button
            onClick={() => { setActiveTab('apply'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-sky-800 bg-sky-50 border border-sky-200"
          >
            Online Application Portal (2026/2027)
          </button>
          <button
            onClick={() => { setActiveTab('track'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-50 flex items-center justify-between"
          >
            <span>Track Application Status</span>
            <Search className="w-4 h-4 text-sky-500" />
          </button>
          <button
            onClick={() => { setActiveTab('student-portal'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-sky-900 bg-sky-50 flex items-center justify-between"
          >
            <span>Student Results &amp; Portal</span>
            <GraduationCap className="w-4 h-4 text-sky-600" />
          </button>
          <button
            onClick={() => { setActiveTab('admin-portal'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-blue-900 bg-blue-50 flex items-center justify-between"
          >
            <span>Faculty &amp; Admin Dashboard</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </button>
          
          {(currentStudent || adminUser) && (
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
              <span>{currentStudent ? `Student: ${currentStudent.fullName}` : `Faculty: ${adminUser?.name}`}</span>
              <button
                onClick={() => {
                  if (currentStudent) studentLogout();
                  if (adminUser) facultyLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-rose-600 font-semibold"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
