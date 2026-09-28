import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Program } from '../types';

export const generateCourseCatalogPDF = (programs: Program[]) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const primaryColor = [3, 105, 161]; // Medical Sky Blue (#0369A1)
  const secondaryColor = [56, 189, 248]; // Light Sky Blue (#38BDF8)
  const darkTextColor = [15, 23, 42]; // Slate 900
  const mutedTextColor = [71, 85, 105]; // Slate 600

  const addHeader = (title: string, subheader: string = 'OFFICIAL ACADEMIC COURSE CATALOG & PROSPECTUS') => {
    // Top colored banner
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Accent line
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(0, 28, pageWidth, 2, 'F');

    // School Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('KITWE SCHOOL OF NURSING AND MIDWIFERY', pageWidth / 2, 11, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Republic of Zambia · Ministry of Health · Copperbelt Provincial Health Office', pageWidth / 2, 17, { align: 'center' });

    doc.setFontSize(7.5);
    doc.text('Affiliated to Kitwe Teaching Hospital · NMCZ & HPCZ Accredited Institution', pageWidth / 2, 23, { align: 'center' });

    // Section title
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, 14, 38);

    doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(subheader, 14, 43);

    // Dividing rule
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(14, 46, pageWidth - 14, 46);
  };

  const addFooter = (currentPage: number, totalPages: number) => {
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
    doc.text('Kitwe Teaching Hospital Grounds, Kuomboka Rd, Kitwe · admissions@ksnm.ac.zm · +260 212 226315', 14, pageHeight - 9);
    doc.text(`Page ${currentPage} of ${totalPages}`, pageWidth - 14, pageHeight - 9, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: INSTITUTION OVERVIEW & PROGRAM SUMMARY
  // ==========================================
  addHeader('2026 / 2027 ACADEMIC PROGRAM CATALOGUE', 'General Overview & Admission Entry Standards');

  let y = 52;

  // Intro paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  const introText = 
    'Established in 1958, Kitwe School of Nursing and Midwifery is one of Zambia’s foremost clinical training health colleges. Situated within the grounds of Kitwe Teaching Hospital, the institution provides exceptional didactic instruction combined with high-volume bedside clinical immersion. All diploma qualifications are officially accredited and indexed by the Nursing and Midwifery Council of Zambia (NMCZ).';
  const splitIntro = doc.splitTextToSize(introText, pageWidth - 28);
  doc.text(splitIntro, 14, y);
  y += splitIntro.length * 4.5 + 4;

  // Highlights boxes
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(14, y, pageWidth - 28, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('KEY ACADEMIC STANDARDS & STATUTORY ACCREDITATION', 18, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('• Regulating Authority: Nursing and Midwifery Council of Zambia (NMCZ) & Health Professions Council (HPCZ)', 18, y + 10);
  doc.text('• Primary Clinical Base: Kitwe Teaching Hospital (650+ bed tertiary referral hospital)', 18, y + 14);
  y += 24;

  // Table of Programs Offered
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Approved Programs & Tuition Structure', 14, y);
  y += 3;

  const programRows = programs.map((p, idx) => [
    `${idx + 1}. ${p.title}`,
    p.duration,
    p.intakes.join(', '),
    `ZMW ${p.annualTuitionZMW.toLocaleString()}`,
    `ZMW ${p.applicationFeeZMW.toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Program Title', 'Duration', 'Intake Cycles', 'Annual Tuition', 'App Fee']],
    body: programRows,
    theme: 'striped',
    headStyles: {
      fillColor: [3, 105, 161],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
    },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 32 },
      2: { cellWidth: 36 },
      3: { cellWidth: 26, halign: 'right' },
      4: { cellWidth: 20, halign: 'right' },
    },
    margin: { left: 14, right: 14 },
  });

  // General Requirements Section
  // @ts-ignore
  y = doc.lastAutoTable.finalY + 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Standard Minimum Admission Criteria (ECZ / GCE O-Level)', 14, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  const reqPoints = [
    '1. Minimum of five (5) O-Level Credits in Examinations Council of Zambia (ECZ) or Cambridge General Certificate.',
    '2. Mandatory Credits in: English Language, Mathematics, and Biology / Science.',
    '3. Additional Credits in any two subjects (e.g. Chemistry, Physics, Agricultural Science, Geography, Civic Education).',
    '4. Certified copy of National Registration Card (NRC) or valid Passport.',
    '5. Satisfactory Medical Fitness Examination Report certified by a registered Government Medical Officer.',
    '6. Police Clearance Certificate / Recommendation of good conduct.'
  ];
  reqPoints.forEach((point) => {
    doc.text(point, 16, y);
    y += 4;
  });

  addFooter(1, 3);

  // ==========================================
  // PAGE 2: DETAILED REGISTERED NURSING (RN) CURRICULUM
  // ==========================================
  doc.addPage();
  addHeader('DIPLOMA IN REGISTERED NURSING (RN) - 3 YEARS', 'Detailed Course Curriculum & Clinical Rotation Syllabus');
  y = 52;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  const rnDesc = 'The 3-Year Registered Nursing curriculum equips candidates with comprehensive medical, surgical, pediatric, psychiatric, and emergency life-support competencies in compliance with NMCZ standards.';
  doc.text(doc.splitTextToSize(rnDesc, pageWidth - 28), 14, y);
  y += 10;

  const rnCourseData = [
    // Year 1
    ['NUR 111', 'Human Anatomy & Physiology I', '4', 'Didactic / Lab', 'Year 1 Sem 1'],
    ['NUR 112', 'Fundamentals of Nursing Practice I', '4', 'Skills Lab & Ward', 'Year 1 Sem 1'],
    ['NUR 113', 'Microbiology & Parasitology in Health', '3', 'Laboratory Science', 'Year 1 Sem 1'],
    ['COM 101', 'Communication & Nursing Professional Ethics', '2', 'Lecture / Seminar', 'Year 1 Sem 1'],
    ['NUR 121', 'Human Anatomy & Physiology II', '4', 'Didactic / Lab', 'Year 1 Sem 2'],
    ['NUR 122', 'Fundamentals of Nursing II (Clinical OSCE)', '4', 'Ward / OSCE Exam', 'Year 1 Sem 2'],
    ['PHA 121', 'Pharmacology & Therapeutics in Nursing', '3', 'Clinical Pharmacology', 'Year 1 Sem 2'],
    ['SOC 121', 'Sociology of Health & Disease in Zambia', '2', 'Community Health', 'Year 1 Sem 2'],
    // Year 2
    ['NUR 211', 'Medical-Surgical Nursing I (Cardio & Pulmonology)', '4', 'KTH Ward 4 & 5', 'Year 2 Sem 1'],
    ['NUR 212', 'Obstetric Care & Antenatal Health', '4', 'Labour Ward KTH', 'Year 2 Sem 1'],
    ['NUR 213', 'Community Health & Epidemiology', '3', 'Urban Health Centres', 'Year 2 Sem 1'],
    ['CLI 214', 'Clinical Practicum: General Adult Wards', '4', 'Bedside Supervised', 'Year 2 Sem 1'],
    ['NUR 221', 'Medical-Surgical Nursing II (Gastro & Renal)', '4', 'KTH Surgical Units', 'Year 2 Sem 2'],
    ['NUR 222', 'Pediatric & Child Health Nursing', '4', 'Pediatric Wards', 'Year 2 Sem 2'],
    ['NUR 223', 'Mental Health & Psychiatric Nursing', '3', 'Psychiatric Unit', 'Year 2 Sem 2'],
    ['CLI 224', 'Pediatric & Medical Ward Rotation (OSCE)', '4', 'Ward Assessment', 'Year 2 Sem 2'],
    // Year 3
    ['NUR 311', 'Critical Care & Emergency Nursing (ICU/HDU)', '4', 'Intensive Care Unit', 'Year 3 Sem 1'],
    ['NUR 312', 'Nursing Leadership, Management & Health Systems', '3', 'Health Administration', 'Year 3 Sem 1'],
    ['RES 313', 'Applied Nursing Research Project', '3', 'Research Thesis', 'Year 3 Sem 1'],
    ['CLI 314', 'Advanced Practicum (Theatre & Special Wards)', '5', 'Operating Theatre', 'Year 3 Sem 1'],
    ['NMCZ 320', 'National Qualifying Licensure Board Preparation', '6', 'NMCZ Mock & Board', 'Year 3 Sem 2']
  ];

  autoTable(doc, {
    startY: y,
    head: [['Code', 'Course Title', 'Credits', 'Training Setting', 'Schedule']],
    body: rnCourseData,
    theme: 'grid',
    headStyles: {
      fillColor: [3, 105, 161],
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 6.8,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 20, fontStyle: 'bold' },
      1: { cellWidth: 84 },
      2: { cellWidth: 16, halign: 'center' },
      3: { cellWidth: 40 },
      4: { cellWidth: 24, fontStyle: 'italic' },
    },
    margin: { left: 14, right: 14 },
  });

  addFooter(2, 3);

  // ==========================================
  // PAGE 3: MIDWIFERY, PUBLIC HEALTH, CLINICAL OPHTHALMIC & ADMISSIONS
  // ==========================================
  doc.addPage();
  addHeader('MIDWIFERY & SPECIALIST NURSING DIPLOMAS', 'Maternal Health, Public Health, Ophthalmic & Application Steps');
  y = 52;

  // Registered Midwifery section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('1. Diploma in Registered Midwifery (Direct Entry & Post-Basic)', 14, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  const rmInfo = 
    'Prepares midwives to champion maternal, newborn, and infant health. Clinical components require completion of at least 40 supervised live deliveries, 80 antenatal examinations, and 30 postnatal assessments logged in the official NMCZ Midwifery Logbook at Kitwe Teaching Hospital Labour Ward.';
  doc.text(doc.splitTextToSize(rmInfo, pageWidth - 28), 14, y);
  y += 10;

  const midCourses = [
    ['MID 111', 'Anatomy & Physiology of Human Reproduction', '4 Credits', 'Year 1 Sem 1'],
    ['MID 112', 'Principles of Midwifery Care & Maternal Nutrition', '4 Credits', 'Year 1 Sem 1'],
    ['MID 121', 'Normal Pregnancy & Antenatal Healthcare Protocols', '4 Credits', 'Year 1 Sem 2'],
    ['MID 122', 'Physiology of Normal Labour & Delivery Management', '4 Credits', 'Year 1 Sem 2'],
    ['CLI 123', 'Clinical Labour Ward Rotation (Deliveries Logged: 20)', '5 Credits', 'Year 1 Sem 2'],
    ['MID 211', 'Complicated Labour, Malpresentation & Emergency Obstetric Care', '4 Credits', 'Year 2 Sem 1'],
    ['MID 212', 'Neonatology & Special Care Baby Unit (SCBU) Care', '4 Credits', 'Year 2 Sem 1'],
    ['MID 221', 'Postnatal Care, Family Planning & Community Midwifery', '3 Credits', 'Year 2 Sem 2']
  ];

  autoTable(doc, {
    startY: y,
    head: [['Course Code', 'Course Title', 'Credit Weight', 'Level / Term']],
    body: midCourses,
    theme: 'striped',
    headStyles: {
      fillColor: [14, 116, 144], // Sky Cyan 700
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 26, fontStyle: 'bold' },
      1: { cellWidth: 96 },
      2: { cellWidth: 30, halign: 'center' },
      3: { cellWidth: 30 },
    },
    margin: { left: 14, right: 14 },
  });

  // @ts-ignore
  y = doc.lastAutoTable.finalY + 8;

  // Specialist Post-Basic Programs summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('2. Specialist Post-Basic Programs (1-Year Accelerated)', 14, y);
  y += 4.5;

  const specialistData = [
    ['Public Health Nursing', 'Advanced Diploma', 'Epidemiology, Immunization, Disease Outbreak Response, Maternal & Child Health'],
    ['Clinical Ophthalmic', 'Diploma', 'Ocular Anatomy, Cataract Surgical Assisting, Refraction, Eye Health Clinics']
  ];

  autoTable(doc, {
    startY: y,
    head: [['Program Name', 'Award Level', 'Core Competencies & Clinical Base']],
    body: specialistData,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 44, fontStyle: 'bold' },
      1: { cellWidth: 32 },
      2: { cellWidth: 106 },
    },
    margin: { left: 14, right: 14 },
  });

  // @ts-ignore
  y = doc.lastAutoTable.finalY + 8;

  // How to Apply Box
  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(186, 230, 253);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, y, pageWidth - 28, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('HOW TO APPLY ONLINE VIA THE INSTITUTIONAL PORTAL', 18, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('1. Visit the portal online at our web address and click "Apply Online (2026/2027 Intake)".', 18, y + 10);
  doc.text('2. Complete applicant biodata, ECZ O-Level results, and attach certified NRC and ECZ statement.', 18, y + 14);
  doc.text('3. Pay the ZMW 250 application processing fee securely via Airtel Money, MTN MoMo, or Visa/Mastercard.', 18, y + 18);
  doc.text('4. Receive your instant Application Reference Number (e.g. KSNM-2026-XXXX) for real-time tracking.', 18, y + 22);

  addFooter(3, 3);

  // Trigger Save/Download
  doc.save('Kitwe_School_of_Nursing_Course_Catalog_2026_2027.pdf');
};
