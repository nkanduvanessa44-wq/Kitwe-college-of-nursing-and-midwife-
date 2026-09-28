/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ApplicationPortal } from './components/ApplicationPortal';
import { ApplicationTracker } from './components/ApplicationTracker';
import { StudentPortal } from './components/StudentPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { ProgramsView } from './components/ProgramsView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { OfficialTranscriptModal } from './components/OfficialTranscriptModal';

const MainContent: React.FC = () => {
  const { activeTab, transcriptStudent, setTranscriptStudent } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-sky-50/25 text-slate-900">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'apply' && <ApplicationPortal />}
        {activeTab === 'track' && <ApplicationTracker />}
        {activeTab === 'student-portal' && <StudentPortal />}
        {activeTab === 'admin-portal' && <AdminDashboard />}
        {activeTab === 'programs' && <ProgramsView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      <Footer />

      {/* Official Transcript / Statement of Results Modal */}
      {transcriptStudent && (
        <OfficialTranscriptModal
          student={transcriptStudent.student}
          semesterIndex={transcriptStudent.semesterIndex}
          onClose={() => setTranscriptStudent(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
