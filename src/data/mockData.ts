import { Program, ApplicationForm, Student, Notice, FacultyUser } from '../types';

export const PROGRAMS_DATA: Program[] = [
  {
    id: 'RN_DIPLOMA',
    title: 'Diploma in Registered Nursing (RN)',
    duration: '3 Years (Full-Time)',
    intakes: ['January Intake', 'July Intake'],
    award: 'Diploma in Registered Nursing (NMCZ Accredited)',
    description: 'A premier comprehensive clinical programme equipping student nurses with evidence-based medical, surgical, pediatric, and community nursing competencies aligned with international healthcare standards.',
    requirements: [
      'Five (5) O-Level Credits or better in ECZ or Cambridge syllabus',
      'Mandatory Credit in English Language and Mathematics',
      'Mandatory Credit in Biology or Combined Sciences',
      'Credits in any two other subjects (e.g., Chemistry, Physics, Geography, Food & Nutrition)',
      'Minimum age of 16 years and medically certified fit'
    ],
    capacity: 180,
    annualTuitionZMW: 14500,
    applicationFeeZMW: 250
  },
  {
    id: 'RM_DIPLOMA',
    title: 'Diploma in Registered Midwifery (Direct Entry)',
    duration: '3 Years (Full-Time)',
    intakes: ['January Intake'],
    award: 'Diploma in Registered Midwifery (NMCZ Accredited)',
    description: 'Specialized maternal and neonatal clinical healthcare training focusing on antenatal care, labour and delivery management, postnatal care, and family health to combat maternal and infant mortality.',
    requirements: [
      'Five (5) O-Level Credits in ECZ / GCE',
      'Credits in English Language, Mathematics, and Biology/Science',
      'Passionate commitment to maternal and child healthcare delivery',
      'Police clearance and medical examination report'
    ],
    capacity: 120,
    annualTuitionZMW: 15200,
    applicationFeeZMW: 250
  },
  {
    id: 'POST_BASIC_MIDWIFERY',
    title: 'Post-Basic Diploma in Registered Midwifery',
    duration: '1 Year (Accelerated)',
    intakes: ['July Intake'],
    award: 'Post-Basic Diploma in Midwifery',
    description: 'Tailored for practicing Registered Nurses holding a valid NMCZ practicing license seeking specialized qualification in obstetric and neonatal midwifery care.',
    requirements: [
      'Diploma in Registered Nursing from an accredited institution',
      'Valid Nursing and Midwifery Council of Zambia (NMCZ) PIN/Practicing Certificate',
      'At least one year clinical hospital experience post-graduation',
      'Recommendation letter from Medical Superintendent or Principal Nursing Officer'
    ],
    capacity: 80,
    annualTuitionZMW: 12000,
    applicationFeeZMW: 250
  },
  {
    id: 'PUBLIC_HEALTH_NURSING',
    title: 'Advanced Diploma in Public Health Nursing',
    duration: '1 Year (Full-Time)',
    intakes: ['January Intake'],
    award: 'Advanced Diploma in Public Health Nursing',
    description: 'Prepares community health leaders to drive epidemiological surveillance, immunization strategies, disease outbreak response, and primary healthcare prevention programs across Zambia.',
    requirements: [
      'Registered Nursing Diploma or equivalent',
      'Valid NMCZ registration',
      'Institutional sponsorship or self-sponsorship clearance'
    ],
    capacity: 60,
    annualTuitionZMW: 13500,
    applicationFeeZMW: 250
  },
  {
    id: 'CLINICAL_OPHTHALMIC',
    title: 'Diploma in Clinical Ophthalmic Nursing',
    duration: '1 Year (Specialist)',
    intakes: ['July Intake'],
    award: 'Diploma in Ophthalmic Nursing',
    description: 'Advanced specialized nursing care for ocular diseases, ophthalmic surgical assistance, and community eye health screening in partnership with Kitwe Teaching Hospital Eye Unit.',
    requirements: [
      'Diploma in Registered Nursing with minimum 2 years post-registration experience',
      'Active NMCZ registration',
      'Hospital recommendation'
    ],
    capacity: 40,
    annualTuitionZMW: 14000,
    applicationFeeZMW: 250
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-01',
    title: '2026/2027 January Intake Online Applications Now Open',
    category: 'Admissions',
    date: 'September 24, 2026',
    urgent: true,
    content: 'Kitwe School of Nursing and Midwifery invites applications from suitably qualified candidates for Diploma in Registered Nursing and Diploma in Registered Midwifery. Online application fee is ZMW 250 payable via Mobile Money or Bank deposit.'
  },
  {
    id: 'not-02',
    title: 'Publication of Semester II Final Examination Results',
    category: 'Examinations',
    date: 'September 20, 2026',
    content: 'Final examination results for all Year 1, Year 2, and Year 3 cohorts have been ratified by the Academic Board and released on the Student Portal. Official printed result slips can be collected from the Examinations Office.'
  },
  {
    id: 'not-03',
    title: 'Clinical Rotation Roster: Kitwe Teaching Hospital (Wards 4, 8, ICU, SCBU)',
    category: 'Clinical Practice',
    date: 'September 15, 2026',
    content: 'All 3rd Year Registered Nursing students must report for their Labour Ward and Special Care Baby Unit (SCBU) rotation at 07:30 hrs in full clinical attire with NMCZ student badges.'
  },
  {
    id: 'not-04',
    title: 'Mandatory NMCZ Licensure Indexing & Verification',
    category: 'General',
    date: 'September 10, 2026',
    content: 'First-year students who have not yet submitted their certified copies of Grade 12 ECZ certificates for NMCZ indexing must do so before Friday at the Registrar desk.'
  }
];

export const INITIAL_APPLICATIONS: ApplicationForm[] = [
  {
    referenceNumber: 'KSNM-2026-8472',
    programId: 'RN_DIPLOMA',
    intakeSeason: 'January 2027 Intake',
    firstName: 'Thandiwe',
    middleName: 'Grace',
    lastName: 'Mulenga',
    nrcNumber: '318492/67/1',
    gender: 'Female',
    dob: '2004-05-14',
    maritalStatus: 'Single',
    phone: '+260 97 784 2190',
    email: 'thandiwe.mulenga@gmail.com',
    residentialAddress: 'Plot 481 Kwacha East, Kuomboka Road',
    district: 'Kitwe',
    province: 'Copperbelt',
    nextOfKinName: 'Peter Mulenga',
    nextOfKinPhone: '+260 96 612 4490',
    nextOfKinRelationship: 'Father',
    eczExaminationNumber: '2023-ECZ-09241',
    secondarySchool: 'Helen Kaunda Secondary School, Kitwe',
    completionYear: '2023',
    grades: {
      english: 'Distinction (One)',
      mathematics: 'Credit (Four)',
      biologyOrScience: 'Distinction (Two)',
      chemistryOrPhysicalScience: 'Credit (Three)',
      subject5Name: 'Civic Education',
      subject5Grade: 'Distinction (Two)',
      subject6Name: 'Geography',
      subject6Grade: 'Merit (Three)'
    },
    documents: [
      {
        id: 'doc-01',
        title: 'National Registration Card (NRC)',
        fileName: 'thandiwe_mulenga_nrc_certified.pdf',
        fileSize: '1.4 MB',
        fileType: 'application/pdf',
        uploadedAt: '2026-09-22 10:14',
        verified: true
      },
      {
        id: 'doc-02',
        title: 'ECZ Grade 12 Statement of Results',
        fileName: 'ecz_statement_2023_09241.pdf',
        fileSize: '2.1 MB',
        fileType: 'application/pdf',
        uploadedAt: '2026-09-22 10:16',
        verified: true
      },
      {
        id: 'doc-03',
        title: 'Medical Fitness Certificate',
        fileName: 'kth_medical_fitness_report.pdf',
        fileSize: '890 KB',
        fileType: 'application/pdf',
        uploadedAt: '2026-09-22 10:18',
        verified: true
      }
    ],
    payment: {
      paymentId: 'PAY-ZMW-948102',
      amountZMW: 250,
      method: 'AIRTEL_MONEY',
      phoneNumber: '+260 97 784 2190',
      referenceCode: 'AT-KTH-928174',
      timestamp: '2026-09-22 10:20:15',
      status: 'COMPLETED'
    },
    status: 'ADMITTED',
    submittedAt: '2026-09-22 10:20:15',
    reviewerNotes: 'Excellent academic profile with Distinction in Biology and English. All certified documents verified by Admissions Board.',
    admissionRemarks: 'Congratulations! You have been provisionally admitted into the Diploma in Registered Nursing (3 Years) for the January 2027 intake. Orientation begins 12 January 2027 at the Main Administration Auditorium.'
  },
  {
    referenceNumber: 'KSNM-2026-9214',
    programId: 'RM_DIPLOMA',
    intakeSeason: 'January 2027 Intake',
    firstName: 'Chilufya',
    middleName: 'Agnes',
    lastName: 'Banda',
    nrcNumber: '409182/11/1',
    gender: 'Female',
    dob: '2005-08-19',
    maritalStatus: 'Single',
    phone: '+260 95 530 8821',
    email: 'chilufya.banda@yahoo.com',
    residentialAddress: 'House 12, Nkana East, Kitwe',
    district: 'Kitwe',
    province: 'Copperbelt',
    nextOfKinName: 'Mary Banda',
    nextOfKinPhone: '+260 97 811 0932',
    nextOfKinRelationship: 'Mother',
    eczExaminationNumber: '2024-ECZ-44102',
    secondarySchool: 'Mindolo Secondary School',
    completionYear: '2024',
    grades: {
      english: 'Merit (Three)',
      mathematics: 'Credit (Five)',
      biologyOrScience: 'Distinction (Two)',
      chemistryOrPhysicalScience: 'Credit (Four)',
      subject5Name: 'Commerce',
      subject5Grade: 'Credit (Three)',
      subject6Name: 'Religious Education',
      subject6Grade: 'Distinction (One)'
    },
    documents: [
      {
        id: 'doc-04',
        title: 'National Registration Card (NRC)',
        fileName: 'nrc_banda_chilufya.jpg',
        fileSize: '1.2 MB',
        fileType: 'image/jpeg',
        uploadedAt: '2026-09-25 14:02',
        verified: true
      },
      {
        id: 'doc-05',
        title: 'ECZ Results Slip',
        fileName: 'ecz_results_banda.pdf',
        fileSize: '1.8 MB',
        fileType: 'application/pdf',
        uploadedAt: '2026-09-25 14:04',
        verified: true
      }
    ],
    payment: {
      paymentId: 'PAY-ZMW-772910',
      amountZMW: 250,
      method: 'MTN_MOMO',
      phoneNumber: '+260 96 820 1199',
      referenceCode: 'MTN-REF-449102',
      timestamp: '2026-09-25 14:08:44',
      status: 'COMPLETED'
    },
    status: 'INTERVIEW_SCHEDULED',
    submittedAt: '2026-09-25 14:08:44',
    interviewDate: 'October 14, 2026 at 09:00 AM',
    reviewerNotes: 'Document verification successful. Candidate invited for clinical aptitude interview at Administration Conference Room.'
  },
  {
    referenceNumber: 'KSNM-2026-6105',
    programId: 'RN_DIPLOMA',
    intakeSeason: 'January 2027 Intake',
    firstName: 'Kabwe',
    middleName: 'Emmanuel',
    lastName: 'Tembo',
    nrcNumber: '298172/61/1',
    gender: 'Male',
    dob: '2003-11-02',
    maritalStatus: 'Single',
    phone: '+260 97 319 4488',
    email: 'kabwe.tembo@hotmail.com',
    residentialAddress: 'Plot 104, Riverside West, Kitwe',
    district: 'Kitwe',
    province: 'Copperbelt',
    nextOfKinName: 'Justine Tembo',
    nextOfKinPhone: '+260 97 411 9900',
    nextOfKinRelationship: 'Brother',
    eczExaminationNumber: '2022-ECZ-88192',
    secondarySchool: 'Chibuluma Secondary School, Kalulushi',
    completionYear: '2022',
    grades: {
      english: 'Credit (Four)',
      mathematics: 'Credit (Three)',
      biologyOrScience: 'Credit (Four)',
      chemistryOrPhysicalScience: 'Credit (Four)',
      subject5Name: 'History',
      subject5Grade: 'Pass (Six)'
    },
    documents: [
      {
        id: 'doc-06',
        title: 'NRC Certificate',
        fileName: 'tembo_kabwe_nrc.pdf',
        fileSize: '950 KB',
        fileType: 'application/pdf',
        uploadedAt: '2026-09-27 09:12',
        verified: false
      }
    ],
    payment: {
      paymentId: 'PAY-ZMW-331092',
      amountZMW: 250,
      method: 'CARD_VISA_MC',
      referenceCode: 'VISA-AUTH-882194',
      timestamp: '2026-09-27 09:15:30',
      status: 'COMPLETED'
    },
    status: 'UNDER_REVIEW',
    submittedAt: '2026-09-27 09:15:30',
    reviewerNotes: 'Application fee cleared. Awaiting Admissions Committee review.'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'SN/2024/0142',
    pin: '1234',
    fullName: 'Chileshe Mwape',
    nrc: '281944/68/1',
    email: 'chileshe.mwape@student.ksnm.ac.zm',
    phone: '+260 97 122 3344',
    gender: 'Female',
    program: 'Diploma in Registered Nursing (RN)',
    currentYear: 3,
    currentSemester: 1,
    enrollmentYear: 2024,
    clinicalWard: {
      hospital: 'Kitwe Teaching Hospital',
      wardName: 'Ward 8 - High Dependency Obstetric & Surgical',
      supervisor: 'Matron M. Chisenga (Senior Clinical Instructor)',
      shift: 'Morning Shift (07:00 - 15:30 hrs)'
    },
    financials: {
      totalBilledZMW: 43500,
      totalPaidZMW: 40000,
      balanceDueZMW: 3500,
      lastPaymentDate: '2026-08-14'
    },
    semesterResults: [
      {
        academicYear: '2024/2025',
        yearOfStudy: 1,
        semester: 1,
        publishedDate: '2024-06-30',
        courses: [
          { code: 'NUR 111', name: 'Human Anatomy and Physiology I', credits: 4, continuousAssessment: 34, finalExam: 48, totalMark: 82, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'NUR 112', name: 'Fundamentals of Nursing Practice I', credits: 4, continuousAssessment: 36, finalExam: 51, totalMark: 87, grade: 'A+', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'NUR 113', name: 'Microbiology and Parasitology', credits: 3, continuousAssessment: 30, finalExam: 45, totalMark: 75, grade: 'B+', gradePoint: 3.5, remarks: 'Meritorious' },
          { code: 'NUR 114', name: 'First Aid and Emergency Trauma Care', credits: 2, continuousAssessment: 38, finalExam: 52, totalMark: 90, grade: 'A+', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'COM 101', name: 'Communication and Professional Nursing Ethics', credits: 2, continuousAssessment: 32, finalExam: 44, totalMark: 76, grade: 'B+', gradePoint: 3.5, remarks: 'Meritorious' }
        ],
        semesterGPA: 3.84,
        cumulativeGPA: 3.84,
        standing: 'DISTINCTION'
      },
      {
        academicYear: '2024/2025',
        yearOfStudy: 1,
        semester: 2,
        publishedDate: '2024-12-18',
        courses: [
          { code: 'NUR 121', name: 'Human Anatomy and Physiology II', credits: 4, continuousAssessment: 32, finalExam: 46, totalMark: 78, grade: 'B+', gradePoint: 3.5, remarks: 'Meritorious' },
          { code: 'NUR 122', name: 'Fundamentals of Nursing Practice II (Clinical OSCE)', credits: 4, continuousAssessment: 37, finalExam: 50, totalMark: 87, grade: 'A+', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'PHA 121', name: 'Pharmacology and Therapeutics in Nursing', credits: 3, continuousAssessment: 31, finalExam: 42, totalMark: 73, grade: 'B', gradePoint: 3.0, remarks: 'Credit' },
          { code: 'SOC 121', name: 'Sociology of Health and Disease in Zambia', credits: 2, continuousAssessment: 34, finalExam: 45, totalMark: 79, grade: 'B+', gradePoint: 3.5, remarks: 'Meritorious' },
          { code: 'NUT 122', name: 'Clinical Nutrition and Dietetics', credits: 2, continuousAssessment: 35, finalExam: 47, totalMark: 82, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' }
        ],
        semesterGPA: 3.63,
        cumulativeGPA: 3.74,
        standing: 'CLEAR_PASS'
      },
      {
        academicYear: '2025/2026',
        yearOfStudy: 2,
        semester: 1,
        publishedDate: '2025-06-25',
        courses: [
          { code: 'NUR 211', name: 'Medical-Surgical Nursing I (Cardiology & Pulmonology)', credits: 4, continuousAssessment: 33, finalExam: 49, totalMark: 82, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'NUR 212', name: 'Obstetric Care and Antenatal Management', credits: 4, continuousAssessment: 36, finalExam: 50, totalMark: 86, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'NUR 213', name: 'Community Health Nursing and Epidemiology', credits: 3, continuousAssessment: 30, finalExam: 44, totalMark: 74, grade: 'B', gradePoint: 3.0, remarks: 'Credit' },
          { code: 'CLI 214', name: 'Clinical Practicum: General Wards (KTH)', credits: 4, continuousAssessment: 38, finalExam: 52, totalMark: 90, grade: 'A+', gradePoint: 4.0, remarks: 'Distinction' }
        ],
        semesterGPA: 3.80,
        cumulativeGPA: 3.76,
        standing: 'DISTINCTION'
      },
      {
        academicYear: '2025/2026',
        yearOfStudy: 2,
        semester: 2,
        publishedDate: '2025-12-20',
        courses: [
          { code: 'NUR 221', name: 'Medical-Surgical Nursing II (Gastroenterology & Renal)', credits: 4, continuousAssessment: 35, finalExam: 48, totalMark: 83, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'NUR 222', name: 'Pediatric and Child Health Nursing', credits: 4, continuousAssessment: 34, finalExam: 47, totalMark: 81, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'NUR 223', name: 'Mental Health and Psychiatric Nursing', credits: 3, continuousAssessment: 29, finalExam: 43, totalMark: 72, grade: 'B', gradePoint: 3.0, remarks: 'Credit' },
          { code: 'CLI 224', name: 'Pediatric & Medical Clinical Rotation (OSCE)', credits: 4, continuousAssessment: 37, finalExam: 51, totalMark: 88, grade: 'A+', gradePoint: 4.0, remarks: 'Distinction' }
        ],
        semesterGPA: 3.80,
        cumulativeGPA: 3.77,
        standing: 'DISTINCTION'
      },
      {
        academicYear: '2026/2027',
        yearOfStudy: 3,
        semester: 1,
        publishedDate: '2026-09-18',
        courses: [
          { code: 'NUR 311', name: 'Critical Care and Emergency Nursing (ICU/HDU)', credits: 4, continuousAssessment: 35, finalExam: 50, totalMark: 85, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'NUR 312', name: 'Nursing Leadership, Management & Health Systems', credits: 3, continuousAssessment: 33, finalExam: 46, totalMark: 79, grade: 'B+', gradePoint: 3.5, remarks: 'Meritorious' },
          { code: 'RES 313', name: 'Applied Nursing Research Methodology & Project', credits: 3, continuousAssessment: 36, finalExam: 48, totalMark: 84, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'CLI 314', name: 'Advanced Clinical Practicum (Operating Theatre & ICU)', credits: 5, continuousAssessment: 39, finalExam: 53, totalMark: 92, grade: 'A+', gradePoint: 4.0, remarks: 'Distinction' }
        ],
        semesterGPA: 3.90,
        cumulativeGPA: 3.80,
        standing: 'DISTINCTION'
      }
    ]
  },
  {
    id: 'SN/2025/0089',
    pin: '1234',
    fullName: 'Mutale Bwalya',
    nrc: '339182/11/1',
    email: 'mutale.bwalya@student.ksnm.ac.zm',
    phone: '+260 96 441 8922',
    gender: 'Female',
    program: 'Diploma in Registered Midwifery (Direct Entry)',
    currentYear: 2,
    currentSemester: 1,
    enrollmentYear: 2025,
    clinicalWard: {
      hospital: 'Kitwe Teaching Hospital',
      wardName: 'Labour Ward & Antenatal Clinic Complex',
      supervisor: 'Sister-In-Charge R. Musonda',
      shift: 'Night Duty (20:00 - 07:00 hrs)'
    },
    financials: {
      totalBilledZMW: 30400,
      totalPaidZMW: 30400,
      balanceDueZMW: 0,
      lastPaymentDate: '2026-07-28'
    },
    semesterResults: [
      {
        academicYear: '2025/2026',
        yearOfStudy: 1,
        semester: 1,
        publishedDate: '2025-06-28',
        courses: [
          { code: 'MID 111', name: 'Anatomy and Physiology of Reproduction', credits: 4, continuousAssessment: 31, finalExam: 44, totalMark: 75, grade: 'B+', gradePoint: 3.5, remarks: 'Meritorious' },
          { code: 'MID 112', name: 'Foundation of Midwifery Care and Ethics', credits: 4, continuousAssessment: 35, finalExam: 49, totalMark: 84, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'NUR 113', name: 'Basic Nursing Principles & Infection Control', credits: 3, continuousAssessment: 33, finalExam: 47, totalMark: 80, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' }
        ],
        semesterGPA: 3.82,
        cumulativeGPA: 3.82,
        standing: 'DISTINCTION'
      },
      {
        academicYear: '2025/2026',
        yearOfStudy: 1,
        semester: 2,
        publishedDate: '2025-12-22',
        courses: [
          { code: 'MID 121', name: 'Normal Pregnancy and Antenatal Management', credits: 4, continuousAssessment: 34, finalExam: 48, totalMark: 82, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'MID 122', name: 'Physiology of Normal Labour and Delivery', credits: 4, continuousAssessment: 36, finalExam: 50, totalMark: 86, grade: 'A', gradePoint: 4.0, remarks: 'Distinction' },
          { code: 'CLI 123', name: 'Clinical Midwifery Practicum I (Deliveries Logged: 15)', credits: 4, continuousAssessment: 38, finalExam: 50, totalMark: 88, grade: 'A+', gradePoint: 4.0, remarks: 'Distinction' }
        ],
        semesterGPA: 4.0,
        cumulativeGPA: 3.91,
        standing: 'DISTINCTION'
      }
    ]
  },
  {
    id: 'SN/2024/0205',
    pin: '1234',
    fullName: 'Lupando Kaunda',
    nrc: '229481/64/1',
    email: 'lupando.kaunda@student.ksnm.ac.zm',
    phone: '+260 97 900 1122',
    gender: 'Male',
    program: 'Diploma in Registered Nursing (RN)',
    currentYear: 2,
    currentSemester: 2,
    enrollmentYear: 2024,
    clinicalWard: {
      hospital: 'Kitwe Teaching Hospital',
      wardName: 'Ward 3 - Male Surgical & Orthopedic',
      supervisor: 'Mr. B. Chilombo (Clinical Preceptor)',
      shift: 'Afternoon Shift (13:30 - 20:30 hrs)'
    },
    financials: {
      totalBilledZMW: 29000,
      totalPaidZMW: 24000,
      balanceDueZMW: 5000,
      lastPaymentDate: '2026-05-10'
    },
    semesterResults: [
      {
        academicYear: '2024/2025',
        yearOfStudy: 1,
        semester: 1,
        publishedDate: '2024-06-30',
        courses: [
          { code: 'NUR 111', name: 'Human Anatomy and Physiology I', credits: 4, continuousAssessment: 26, finalExam: 42, totalMark: 68, grade: 'B', gradePoint: 3.0, remarks: 'Credit' },
          { code: 'NUR 112', name: 'Fundamentals of Nursing Practice I', credits: 4, continuousAssessment: 29, finalExam: 45, totalMark: 74, grade: 'B', gradePoint: 3.0, remarks: 'Credit' },
          { code: 'NUR 113', name: 'Microbiology and Parasitology', credits: 3, continuousAssessment: 25, finalExam: 40, totalMark: 65, grade: 'C+', gradePoint: 2.5, remarks: 'Pass' }
        ],
        semesterGPA: 2.86,
        cumulativeGPA: 2.86,
        standing: 'CLEAR_PASS'
      }
    ]
  }
];

export const FACULTY_MEMBERS: FacultyUser[] = [
  {
    id: 'FAC-001',
    name: 'Mrs. Gertrude M. Sakala',
    role: 'PRINCIPAL_TUTOR',
    email: 'principal@ksnm.ac.zm',
    designation: 'Principal Tutor & Head of Institution (MSc Nursing, BSc Midwifery)'
  },
  {
    id: 'FAC-002',
    name: 'Sr. Chanda Phiri',
    role: 'ADMISSIONS_OFFICER',
    email: 'admissions@ksnm.ac.zm',
    designation: 'Senior Registrar & Head of Admissions Selection Board'
  },
  {
    id: 'FAC-003',
    name: 'Mr. Patrick Mutambo',
    role: 'EXAMINATIONS_OFFICER',
    email: 'exams@ksnm.ac.zm',
    designation: 'Examinations Officer & NMCZ Liaison Coordinator'
  },
  {
    id: 'FAC-004',
    name: 'Matron Mary Chisenga',
    role: 'CLINICAL_COORDINATOR',
    email: 'clinical@ksnm.ac.zm',
    designation: 'Clinical Practice Coordinator & KTH Liaison Matron'
  }
];
