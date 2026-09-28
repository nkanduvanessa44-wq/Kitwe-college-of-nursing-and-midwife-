export type ProgramType = 
  | 'RN_DIPLOMA' 
  | 'RM_DIPLOMA' 
  | 'POST_BASIC_MIDWIFERY' 
  | 'PUBLIC_HEALTH_NURSING' 
  | 'CLINICAL_OPHTHALMIC';

export interface Program {
  id: ProgramType;
  title: string;
  duration: string;
  intakes: string[];
  award: string;
  description: string;
  requirements: string[];
  capacity: number;
  annualTuitionZMW: number;
  applicationFeeZMW: number;
}

export type ApplicationStatus = 
  | 'SUBMITTED' 
  | 'FEE_CONFIRMED' 
  | 'UNDER_REVIEW' 
  | 'INTERVIEW_SCHEDULED' 
  | 'ADMITTED' 
  | 'REJECTED' 
  | 'DOCUMENTS_REQUIRED';

export type PaymentMethod = 'AIRTEL_MONEY' | 'MTN_MOMO' | 'ZAMTEL_KWACHA' | 'CARD_VISA_MC' | 'BANK_TRANSFER';

export interface ApplicationPayment {
  paymentId: string;
  amountZMW: number;
  method: PaymentMethod;
  phoneNumber?: string;
  referenceCode: string;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface ApplicationDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  verified: boolean;
  fileDataUrl?: string;
}

export interface ApplicationForm {
  referenceNumber: string; // e.g. KSNM-2026-4819
  programId: ProgramType;
  intakeSeason: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  nrcNumber: string; // e.g. 123456/11/1
  gender: 'Female' | 'Male';
  dob: string;
  maritalStatus: 'Single' | 'Married' | 'Other';
  phone: string;
  email: string;
  residentialAddress: string;
  district: string;
  province: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  nextOfKinRelationship: string;
  
  // High school ECZ results
  eczExaminationNumber: string;
  secondarySchool: string;
  completionYear: string;
  grades: {
    english: string;
    mathematics: string;
    biologyOrScience: string;
    chemistryOrPhysicalScience?: string;
    subject5Name: string;
    subject5Grade: string;
    subject6Name?: string;
    subject6Grade?: string;
  };
  
  documents: ApplicationDocument[];
  payment?: ApplicationPayment;
  status: ApplicationStatus;
  submittedAt: string;
  reviewerNotes?: string;
  interviewDate?: string;
  admissionRemarks?: string;
}

export interface CourseResult {
  code: string;
  name: string;
  credits: number;
  continuousAssessment: number; // out of 40 or 50
  finalExam: number; // out of 60 or 50
  totalMark: number; // out of 100
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  gradePoint: number;
  remarks: 'Distinction' | 'Meritorious' | 'Credit' | 'Clear Pass' | 'Pass' | 'Fail';
}

export interface SemesterResult {
  academicYear: string; // e.g. 2025/2026
  yearOfStudy: number; // 1, 2, 3
  semester: 1 | 2;
  courses: CourseResult[];
  semesterGPA: number;
  cumulativeGPA: number;
  standing: 'CLEAR_PASS' | 'PROBATION' | 'DISTINCTION';
  publishedDate: string;
}

export interface Student {
  id: string; // e.g. SN/2024/0142
  pin: string; // secret password for login
  fullName: string;
  nrc: string;
  email: string;
  phone: string;
  gender: 'Female' | 'Male';
  program: string;
  currentYear: number;
  currentSemester: 1 | 2;
  enrollmentYear: number;
  avatarUrl?: string;
  clinicalWard: {
    hospital: string;
    wardName: string;
    supervisor: string;
    shift: string;
  };
  financials: {
    totalBilledZMW: number;
    totalPaidZMW: number;
    balanceDueZMW: number;
    lastPaymentDate: string;
  };
  semesterResults: SemesterResult[];
}

export interface FacultyUser {
  id: string;
  name: string;
  role: 'PRINCIPAL_TUTOR' | 'ADMISSIONS_OFFICER' | 'EXAMINATIONS_OFFICER' | 'CLINICAL_COORDINATOR';
  email: string;
  designation: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Admissions' | 'Examinations' | 'Clinical Practice' | 'General';
  date: string;
  urgent?: boolean;
  content: string;
}

export interface AcademicEvent {
  id: string;
  title: string;
  date: string;
  month: string;
  day: string;
  time?: string;
  location: string;
  audience: 'Applicants' | 'Students' | 'All' | 'Faculty';
  badge: string;
  description: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Official Announcement' | 'Academic Calendar' | 'Admissions Notice' | 'Clinical & Wards';
  date: string;
  author: string;
  urgent?: boolean;
  summary: string;
  content: string;
  targetAudience: 'Applicants' | 'Students' | 'Public';
  readTime: string;
}
