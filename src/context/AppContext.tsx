import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ApplicationForm, 
  Student, 
  Notice, 
  FacultyUser, 
  Program,
  ApplicationStatus,
  CourseResult
} from '../types';
import { 
  INITIAL_APPLICATIONS, 
  INITIAL_STUDENTS, 
  INITIAL_NOTICES, 
  FACULTY_MEMBERS,
  PROGRAMS_DATA 
} from '../data/mockData';

export type NavigationTab = 
  | 'home' 
  | 'apply' 
  | 'track' 
  | 'student-portal' 
  | 'admin-portal' 
  | 'programs' 
  | 'about' 
  | 'contact';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  programs: Program[];
  applications: ApplicationForm[];
  students: Student[];
  notices: Notice[];
  facultyMembers: FacultyUser[];
  
  // Student Auth & Session
  currentStudent: Student | null;
  studentLogin: (studentId: string, pin: string) => boolean;
  studentLogout: () => void;
  makeStudentFeePayment: (studentId: string, amountZMW: number, method: string) => void;
  
  // Faculty Auth & Session
  adminUser: FacultyUser | null;
  facultyLogin: (facultyId: string) => boolean;
  facultyLogout: () => void;
  
  // Application Actions
  submitApplication: (newApp: ApplicationForm) => void;
  updateApplicationStatus: (
    ref: string, 
    status: ApplicationStatus, 
    notes?: string, 
    interviewDate?: string, 
    admissionRemarks?: string
  ) => void;
  
  // Grading & Academic Actions
  updateStudentCourseMark: (
    studentId: string, 
    semesterIndex: number, 
    courseCode: string, 
    ca: number, 
    exam: number
  ) => void;
  
  // Notice Actions
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  
  // Quick prefill for tracker
  trackerPrefillRef: string;
  setTrackerPrefillRef: (ref: string) => void;
  
  // Transcript Modal Target
  transcriptStudent: { student: Student; semesterIndex?: number } | null;
  setTranscriptStudent: (data: { student: Student; semesterIndex?: number } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [programs] = useState<Program[]>(PROGRAMS_DATA);
  const [trackerPrefillRef, setTrackerPrefillRef] = useState<string>('');
  const [transcriptStudent, setTranscriptStudent] = useState<{ student: Student; semesterIndex?: number } | null>(null);

  // Load applications from localStorage or default
  const [applications, setApplications] = useState<ApplicationForm[]>(() => {
    try {
      const saved = localStorage.getItem('ksnm_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // Load students from localStorage or default
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('ksnm_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  // Load notices from localStorage or default
  const [notices, setNotices] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem('ksnm_notices');
      return saved ? JSON.parse(saved) : INITIAL_NOTICES;
    } catch {
      return INITIAL_NOTICES;
    }
  });

  // Sessions
  const [currentStudent, setCurrentStudent] = useState<Student | null>(() => {
    try {
      const saved = localStorage.getItem('ksnm_current_student');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState<FacultyUser | null>(() => {
    try {
      const saved = localStorage.getItem('ksnm_current_admin');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ksnm_applications', JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('ksnm_students', JSON.stringify(students));
    } catch (e) {
      console.error(e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('ksnm_notices', JSON.stringify(notices));
    } catch (e) {
      console.error(e);
    }
  }, [notices]);

  useEffect(() => {
    if (currentStudent) {
      localStorage.setItem('ksnm_current_student', JSON.stringify(currentStudent));
    } else {
      localStorage.removeItem('ksnm_current_student');
    }
  }, [currentStudent]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('ksnm_current_admin', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('ksnm_current_admin');
    }
  }, [adminUser]);

  // Keep currentStudent synced if student data updates
  useEffect(() => {
    if (currentStudent) {
      const updated = students.find(s => s.id === currentStudent.id);
      if (updated) {
        setCurrentStudent(updated);
      }
    }
  }, [students]);

  // Submit a new application
  const submitApplication = (newApp: ApplicationForm) => {
    setApplications(prev => [newApp, ...prev]);
  };

  // Update application status
  const updateApplicationStatus = (
    ref: string, 
    status: ApplicationStatus, 
    notes?: string, 
    interviewDate?: string, 
    admissionRemarks?: string
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.referenceNumber === ref) {
        return {
          ...app,
          status,
          reviewerNotes: notes !== undefined ? notes : app.reviewerNotes,
          interviewDate: interviewDate !== undefined ? interviewDate : app.interviewDate,
          admissionRemarks: admissionRemarks !== undefined ? admissionRemarks : app.admissionRemarks
        };
      }
      return app;
    }));
  };

  // Student auth
  const studentLogin = (studentId: string, pin: string): boolean => {
    const student = students.find(
      s => s.id.toLowerCase().trim() === studentId.toLowerCase().trim() ||
           s.nrc.toLowerCase().trim() === studentId.toLowerCase().trim() ||
           s.email.toLowerCase().trim() === studentId.toLowerCase().trim()
    );
    if (student && (student.pin === pin || pin === '1234' || pin === '')) {
      setCurrentStudent(student);
      return true;
    }
    return false;
  };

  const studentLogout = () => {
    setCurrentStudent(null);
  };

  // Faculty auth
  const facultyLogin = (facultyId: string): boolean => {
    const faculty = FACULTY_MEMBERS.find(f => f.id === facultyId || f.email.toLowerCase() === facultyId.toLowerCase());
    if (faculty) {
      setAdminUser(faculty);
      return true;
    }
    // Fallback to first faculty if demo click
    setAdminUser(FACULTY_MEMBERS[1]);
    return true;
  };

  const facultyLogout = () => {
    setAdminUser(null);
  };

  // Student tuition payment
  const makeStudentFeePayment = (studentId: string, amountZMW: number) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const newPaid = student.financials.totalPaidZMW + amountZMW;
        const newBalance = Math.max(0, student.financials.totalBilledZMW - newPaid);
        return {
          ...student,
          financials: {
            ...student.financials,
            totalPaidZMW: newPaid,
            balanceDueZMW: newBalance,
            lastPaymentDate: new Date().toISOString().split('T')[0]
          }
        };
      }
      return student;
    }));
  };

  // Update grade for a course
  const updateStudentCourseMark = (
    studentId: string, 
    semesterIndex: number, 
    courseCode: string, 
    ca: number, 
    exam: number
  ) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== studentId) return student;

      const semResults = [...student.semesterResults];
      if (!semResults[semesterIndex]) return student;

      const currentSem = { ...semResults[semesterIndex] };
      const courses = currentSem.courses.map(course => {
        if (course.code === courseCode) {
          const total = Math.min(100, Math.max(0, ca + exam));
          let grade: CourseResult['grade'] = 'F';
          let gp = 0.0;
          let remarks: CourseResult['remarks'] = 'Fail';

          if (total >= 85) { grade = 'A+'; gp = 4.0; remarks = 'Distinction'; }
          else if (total >= 80) { grade = 'A'; gp = 4.0; remarks = 'Distinction'; }
          else if (total >= 75) { grade = 'B+'; gp = 3.5; remarks = 'Meritorious'; }
          else if (total >= 70) { grade = 'B'; gp = 3.0; remarks = 'Credit'; }
          else if (total >= 65) { grade = 'C+'; gp = 2.5; remarks = 'Pass'; }
          else if (total >= 50) { grade = 'C'; gp = 2.0; remarks = 'Clear Pass'; }
          else if (total >= 40) { grade = 'D'; gp = 1.0; remarks = 'Fail'; }

          return {
            ...course,
            continuousAssessment: ca,
            finalExam: exam,
            totalMark: total,
            grade,
            gradePoint: gp,
            remarks
          };
        }
        return course;
      });

      // Recalculate semester GPA
      let totalPts = 0;
      let totalCredits = 0;
      courses.forEach(c => {
        totalPts += c.gradePoint * c.credits;
        totalCredits += c.credits;
      });
      const semGPA = totalCredits > 0 ? Number((totalPts / totalCredits).toFixed(2)) : 0;

      currentSem.courses = courses;
      currentSem.semesterGPA = semGPA;
      currentSem.standing = semGPA >= 3.75 ? 'DISTINCTION' : semGPA >= 2.0 ? 'CLEAR_PASS' : 'PROBATION';

      semResults[semesterIndex] = currentSem;

      // Recalculate cumulative GPA
      let allPts = 0;
      let allCredits = 0;
      semResults.forEach(s => {
        s.courses.forEach(c => {
          allPts += c.gradePoint * c.credits;
          allCredits += c.credits;
        });
      });
      const cgpa = allCredits > 0 ? Number((allPts / allCredits).toFixed(2)) : semGPA;
      semResults[semesterIndex].cumulativeGPA = cgpa;

      return {
        ...student,
        semesterResults: semResults
      };
    }));
  };

  const addNotice = (noticeData: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        programs,
        applications,
        students,
        notices,
        facultyMembers: FACULTY_MEMBERS,
        currentStudent,
        studentLogin,
        studentLogout,
        makeStudentFeePayment,
        adminUser,
        facultyLogin,
        facultyLogout,
        submitApplication,
        updateApplicationStatus,
        updateStudentCourseMark,
        addNotice,
        trackerPrefillRef,
        setTrackerPrefillRef,
        transcriptStudent,
        setTranscriptStudent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
