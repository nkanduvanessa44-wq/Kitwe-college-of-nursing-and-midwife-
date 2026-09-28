import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ProgramType, 
  ApplicationForm, 
  PaymentMethod, 
  ApplicationDocument 
} from '../types';
import { 
  Check, 
  Upload, 
  CreditCard, 
  Smartphone, 
  Building, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck, 
  Printer, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ApplicationPortal: React.FC = () => {
  const { programs, submitApplication, setActiveTab, setTrackerPrefillRef } = useApp();

  // Wizard Steps: 1: Program, 2: Personal, 3: ECZ Results, 4: Documents, 5: Payment, 6: Success
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedRef, setSubmittedRef] = useState<string>('');

  // Form State
  const [programId, setProgramId] = useState<ProgramType>('RN_DIPLOMA');
  const [intakeSeason, setIntakeSeason] = useState<string>('January 2027 Intake');
  
  // Personal
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nrcNumber, setNrcNumber] = useState('');
  const [gender, setGender] = useState<'Female' | 'Male'>('Female');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState<'Single' | 'Married' | 'Other'>('Single');
  const [phone, setPhone] = useState('+260 9');
  const [email, setEmail] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [district, setDistrict] = useState('Kitwe');
  const [province, setProvince] = useState('Copperbelt');
  
  // Next of Kin
  const [nextOfKinName, setNextOfKinName] = useState('');
  const [nextOfKinPhone, setNextOfKinPhone] = useState('+260 9');
  const [nextOfKinRelationship, setNextOfKinRelationship] = useState('Parent / Guardian');

  // ECZ Academic Grades
  const [eczExamNo, setEczExamNo] = useState('');
  const [secondarySchool, setSecondarySchool] = useState('');
  const [completionYear, setCompletionYear] = useState('2024');
  const [gradeEnglish, setGradeEnglish] = useState('Distinction (One)');
  const [gradeMath, setGradeMath] = useState('Credit (Three)');
  const [gradeBiology, setGradeBiology] = useState('Distinction (Two)');
  const [gradeScience, setGradeScience] = useState('Credit (Four)');
  const [subject5Name, setSubject5Name] = useState('Civic Education');
  const [subject5Grade, setSubject5Grade] = useState('Distinction (Two)');
  const [subject6Name, setSubject6Name] = useState('Geography');
  const [subject6Grade, setSubject6Grade] = useState('Merit (Three)');

  // Documents
  const [documents, setDocuments] = useState<ApplicationDocument[]>([
    {
      id: 'doc-nrc',
      title: 'National Registration Card (NRC) or Passport (Certified Copy)',
      fileName: '',
      fileSize: '',
      fileType: '',
      uploadedAt: '',
      verified: false
    },
    {
      id: 'doc-ecz',
      title: 'ECZ Grade 12 Statement of Results / Certificate (Certified)',
      fileName: '',
      fileSize: '',
      fileType: '',
      uploadedAt: '',
      verified: false
    },
    {
      id: 'doc-med',
      title: 'Medical Fitness Examination Report (from Government Hospital)',
      fileName: '',
      fileSize: '',
      fileType: '',
      uploadedAt: '',
      verified: false
    },
    {
      id: 'doc-photo',
      title: 'Recent Passport Size Photograph (White Background)',
      fileName: '',
      fileSize: '',
      fileType: '',
      uploadedAt: '',
      verified: false
    }
  ]);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('AIRTEL_MONEY');
  const [momoNumber, setMomoNumber] = useState('+260 97 ');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [bankRef, setBankRef] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [ussdPromptActive, setUssdPromptActive] = useState(false);
  const [ussdPin, setUssdPin] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedPaymentId, setGeneratedPaymentId] = useState('');

  // Handle document upload simulation
  const handleFileUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          fileName: file.name,
          fileSize: sizeStr,
          fileType: file.type || 'application/pdf',
          uploadedAt: new Date().toLocaleString(),
          verified: true
        };
      }
      return doc;
    }));
  };

  // Quick Demo fill
  const handlePrefillDemo = () => {
    setFirstName('Mwape');
    setMiddleName('Esther');
    setLastName('Lungu');
    setNrcNumber('381920/11/1');
    setGender('Female');
    setDob('2004-09-12');
    setPhone('+260 97 842 1904');
    setEmail('mwape.lungu@gmail.com');
    setResidentialAddress('House 44, Ndeke Village, Kitwe');
    setDistrict('Kitwe');
    setProvince('Copperbelt');
    setNextOfKinName('David Lungu');
    setNextOfKinPhone('+260 96 710 4481');
    setNextOfKinRelationship('Father');
    setEczExamNo('2024-ECZ-99120');
    setSecondarySchool('Mukuba Secondary School, Kitwe');
    setCompletionYear('2024');
    setGradeEnglish('Distinction (One)');
    setGradeMath('Credit (Three)');
    setGradeBiology('Distinction (One)');
    setGradeScience('Credit (Three)');
    setMomoNumber('+260 97 842 1904');

    // Simulate uploaded files
    setDocuments(prev => prev.map((doc, idx) => ({
      ...doc,
      fileName: idx === 0 ? 'mwape_lungu_nrc_certified.pdf' :
                idx === 1 ? 'ecz_grade12_statement_results.pdf' :
                idx === 2 ? 'kth_medical_fitness_form.pdf' : 'passport_photo_mwape.jpg',
      fileSize: '1.2 MB',
      fileType: idx === 3 ? 'image/jpeg' : 'application/pdf',
      uploadedAt: 'Just now',
      verified: true
    })));
  };

  // Process Application Fee Payment
  const handleInitiatePayment = () => {
    setIsProcessingPayment(true);
    
    if (paymentMethod === 'AIRTEL_MONEY' || paymentMethod === 'MTN_MOMO' || paymentMethod === 'ZAMTEL_KWACHA') {
      setTimeout(() => {
        setIsProcessingPayment(false);
        setUssdPromptActive(true);
      }, 1200);
    } else {
      setTimeout(() => {
        finalizePaymentAndApplication();
      }, 1800);
    }
  };

  const handleAuthorizeUssd = () => {
    if (!ussdPin || ussdPin.length < 4) {
      alert('Please enter a 4-digit mobile money PIN to simulate authorization.');
      return;
    }
    setIsProcessingPayment(true);
    setTimeout(() => {
      setUssdPromptActive(false);
      finalizePaymentAndApplication();
    }, 1500);
  };

  const finalizePaymentAndApplication = () => {
    const payId = `PAY-ZMW-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomRef = `KSNM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    setGeneratedPaymentId(payId);
    setPaymentSuccess(true);
    setIsProcessingPayment(false);
    setSubmittedRef(randomRef);

    const newApplication: ApplicationForm = {
      referenceNumber: randomRef,
      programId,
      intakeSeason,
      firstName: firstName || 'Applicant',
      middleName,
      lastName: lastName || 'Student',
      nrcNumber: nrcNumber || '381920/11/1',
      gender,
      dob: dob || '2004-01-01',
      maritalStatus,
      phone: phone || '+260 97 000 0000',
      email: email || 'applicant@example.com',
      residentialAddress: residentialAddress || 'Kitwe',
      district,
      province,
      nextOfKinName: nextOfKinName || 'Next of Kin',
      nextOfKinPhone: nextOfKinPhone || '+260 96 000 0000',
      nextOfKinRelationship,
      eczExaminationNumber: eczExamNo || '2024-ECZ-0000',
      secondarySchool: secondarySchool || 'Secondary School',
      completionYear,
      grades: {
        english: gradeEnglish,
        mathematics: gradeMath,
        biologyOrScience: gradeBiology,
        chemistryOrPhysicalScience: gradeScience,
        subject5Name,
        subject5Grade,
        subject6Name,
        subject6Grade
      },
      documents: documents.filter(d => d.verified),
      payment: {
        paymentId: payId,
        amountZMW: 250,
        method: paymentMethod,
        phoneNumber: momoNumber,
        referenceCode: `TX-${Math.floor(10000000 + Math.random() * 90000000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        status: 'COMPLETED'
      },
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      reviewerNotes: 'Application submitted online with instant ZMW 250 fee clearance. Pending Admissions Office credential verification.'
    };

    submitApplication(newApplication);

    // Fire Confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setCurrentStep(6);
  };

  const selectedProg = programs.find(p => p.id === programId) || programs[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
          Kitwe School of Nursing and Midwifery Admissions
        </span>
        <h1 className="font-serif-crest text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          Online Application Portal (2026/2027)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Complete all sections accurately. Application processing fee: <strong className="text-slate-900">ZMW 250.00</strong>.
        </p>

        {currentStep < 5 && (
          <button
            onClick={handlePrefillDemo}
            className="mt-3 text-[11px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg border border-sky-200 transition-colors inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Autofill Sample Applicant Data (1-Click Test)</span>
          </button>
        )}
      </div>

      {/* Stepper Progress Bar in Light Blue */}
      {currentStep <= 5 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className={currentStep >= 1 ? 'text-sky-700 font-bold' : ''}>1. Program</span>
            <span className={currentStep >= 2 ? 'text-sky-700 font-bold' : ''}>2. Biodata</span>
            <span className={currentStep >= 3 ? 'text-sky-700 font-bold' : ''}>3. ECZ Grades</span>
            <span className={currentStep >= 4 ? 'text-sky-700 font-bold' : ''}>4. Documents</span>
            <span className={currentStep >= 5 ? 'text-sky-700 font-bold' : ''}>5. Fee Payment</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-sky-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: PROGRAM CHOICE */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" />
              <span>Select Academic Program &amp; Intake</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Choose the nursing or midwifery course you wish to enroll into at Kitwe School of Nursing and Midwifery.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {programs.map((prog) => (
              <label 
                key={prog.id}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                  programId === prog.id 
                    ? 'border-sky-500 bg-sky-50/50 shadow-xs' 
                    : 'border-slate-200 hover:border-sky-200'
                }`}
              >
                <input
                  type="radio"
                  name="programSelection"
                  checked={programId === prog.id}
                  onChange={() => setProgramId(prog.id)}
                  className="mt-1 text-sky-600 focus:ring-sky-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{prog.title}</span>
                    <span className="text-xs font-semibold text-sky-800 bg-sky-100/80 px-2 py-0.5 rounded border border-sky-200">
                      {prog.duration}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{prog.description}</p>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    Tuition: ZMW {prog.annualTuitionZMW.toLocaleString()} / year · Capacity: {prog.capacity} seats
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Intake</label>
            <select
              value={intakeSeason}
              onChange={(e) => setIntakeSeason(e.target.value)}
              className="w-full sm:w-1/2 p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            >
              <option value="January 2027 Intake">January 2027 Intake (Main Intake)</option>
              <option value="July 2026 Intake">July 2026 Intake (Mid-Year Cohort)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>Next: Personal Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PERSONAL BIODATA */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Applicant Personal Details (Biodata)</h2>
            <p className="text-xs text-slate-500 mt-1">Provide your legal identification matching your NRC or Passport.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Mwape"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Middle Name</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Optional"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last / Surname *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Lungu"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NRC / Passport Number *</label>
              <input
                type="text"
                value={nrcNumber}
                onChange={(e) => setNrcNumber(e.target.value)}
                placeholder="e.g. 381920/11/1"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'Female' | 'Male')}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+260 97 123 4567"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="applicant@gmail.com"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address *</label>
              <input
                type="text"
                value={residentialAddress}
                onChange={(e) => setResidentialAddress(e.target.value)}
                placeholder="Plot or House number, Street"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Town / District *</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Kitwe"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Province *</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="Copperbelt">Copperbelt</option>
                <option value="Lusaka">Lusaka</option>
                <option value="Central">Central</option>
                <option value="Southern">Southern</option>
                <option value="Eastern">Eastern</option>
                <option value="Northern">Northern</option>
                <option value="Luapula">Luapula</option>
                <option value="Muchinga">Muchinga</option>
                <option value="North-Western">North-Western</option>
                <option value="Western">Western</option>
              </select>
            </div>
          </div>

          {/* Next of Kin */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Next of Kin / Emergency Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={nextOfKinName}
                  onChange={(e) => setNextOfKinName(e.target.value)}
                  placeholder="e.g. David Lungu"
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={nextOfKinPhone}
                  onChange={(e) => setNextOfKinPhone(e.target.value)}
                  placeholder="+260 96 ..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={nextOfKinRelationship}
                  onChange={(e) => setNextOfKinRelationship(e.target.value)}
                  placeholder="Father / Guardian"
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => {
                if (!firstName || !lastName || !nrcNumber) {
                  alert('Please enter at least First Name, Last Name, and NRC Number.');
                  return;
                }
                setCurrentStep(3);
              }}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>Next: ECZ Academic Results</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ECZ ACADEMIC RESULTS */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Examinations Council of Zambia (ECZ) Qualifications</h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your certified Grade 12 results. Minimum five (5) O-Level Credits including English, Maths, and Biology/Science.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ECZ Examination Number *</label>
              <input
                type="text"
                value={eczExamNo}
                onChange={(e) => setEczExamNo(e.target.value)}
                placeholder="e.g. 2024-ECZ-99120"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Secondary School Attended *</label>
              <input
                type="text"
                value={secondarySchool}
                onChange={(e) => setSecondarySchool(e.target.value)}
                placeholder="e.g. Helen Kaunda Secondary"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Year of Completion *</label>
              <input
                type="text"
                value={completionYear}
                onChange={(e) => setCompletionYear(e.target.value)}
                placeholder="2024"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="bg-sky-50/40 rounded-xl p-5 border border-sky-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Subject Grades Verification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">English Language *</label>
                <select
                  value={gradeEnglish}
                  onChange={(e) => setGradeEnglish(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="Distinction (One)">Distinction (One)</option>
                  <option value="Distinction (Two)">Distinction (Two)</option>
                  <option value="Merit (Three)">Merit (Three)</option>
                  <option value="Credit (Four)">Credit (Four)</option>
                  <option value="Credit (Five)">Credit (Five)</option>
                  <option value="Pass (Six)">Pass (Six)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mathematics *</label>
                <select
                  value={gradeMath}
                  onChange={(e) => setGradeMath(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="Distinction (One)">Distinction (One)</option>
                  <option value="Distinction (Two)">Distinction (Two)</option>
                  <option value="Merit (Three)">Merit (Three)</option>
                  <option value="Credit (Four)">Credit (Four)</option>
                  <option value="Credit (Five)">Credit (Five)</option>
                  <option value="Pass (Six)">Pass (Six)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Biology / Science *</label>
                <select
                  value={gradeBiology}
                  onChange={(e) => setGradeBiology(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="Distinction (One)">Distinction (One)</option>
                  <option value="Distinction (Two)">Distinction (Two)</option>
                  <option value="Merit (Three)">Merit (Three)</option>
                  <option value="Credit (Four)">Credit (Four)</option>
                  <option value="Credit (Five)">Credit (Five)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Chemistry / Physical Science</label>
                <select
                  value={gradeScience}
                  onChange={(e) => setGradeScience(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="Distinction (One)">Distinction (One)</option>
                  <option value="Distinction (Two)">Distinction (Two)</option>
                  <option value="Merit (Three)">Merit (Three)</option>
                  <option value="Credit (Four)">Credit (Four)</option>
                  <option value="Credit (Five)">Credit (Five)</option>
                  <option value="Pass (Six)">Pass (Six)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Subject 5</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={subject5Name}
                    onChange={(e) => setSubject5Name(e.target.value)}
                    placeholder="e.g. Civic Education"
                    className="w-2/3 p-2 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                  <select
                    value={subject5Grade}
                    onChange={(e) => setSubject5Grade(e.target.value)}
                    className="w-1/3 p-2 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="Distinction (One)">1 (Dist)</option>
                    <option value="Distinction (Two)">2 (Dist)</option>
                    <option value="Merit (Three)">3 (Merit)</option>
                    <option value="Credit (Four)">4 (Credit)</option>
                    <option value="Credit (Five)">5 (Credit)</option>
                    <option value="Pass (Six)">6 (Pass)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Subject 6</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={subject6Name}
                    onChange={(e) => setSubject6Name(e.target.value)}
                    placeholder="e.g. Geography / Commerce"
                    className="w-2/3 p-2 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                  <select
                    value={subject6Grade}
                    onChange={(e) => setSubject6Grade(e.target.value)}
                    className="w-1/3 p-2 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="Distinction (One)">1 (Dist)</option>
                    <option value="Distinction (Two)">2 (Dist)</option>
                    <option value="Merit (Three)">3 (Merit)</option>
                    <option value="Credit (Four)">4 (Credit)</option>
                    <option value="Credit (Five)">5 (Credit)</option>
                    <option value="Pass (Six)">6 (Pass)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>Next: Document Uploads</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REQUIRED DOCUMENT UPLOADS */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Required Certified Document Uploads</h2>
            <p className="text-xs text-slate-500 mt-1">
              Please upload certified copies of your identification, qualifications, and medical fitness report. Accepted formats: PDF, JPG, PNG (Max 5MB each).
            </p>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  doc.verified 
                    ? 'border-sky-300 bg-sky-50/40' 
                    : 'border-slate-200 hover:border-sky-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      {doc.verified ? (
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      ) : (
                        <Upload className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span>{doc.title}</span>
                    </h4>
                    {doc.verified ? (
                      <p className="text-[11px] text-sky-700 mt-1 flex items-center gap-2">
                        <span>File: <strong>{doc.fileName}</strong> ({doc.fileSize})</span>
                        <span>· Uploaded {doc.uploadedAt}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Not uploaded yet. Click Browse to select file from your device.
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <label className="cursor-pointer px-3.5 py-1.5 bg-white border border-slate-300 hover:border-sky-500 text-slate-700 hover:text-sky-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-sky-600" />
                      <span>{doc.verified ? 'Change File' : 'Browse File'}</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(doc.id, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-xs text-sky-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p>
              <strong>Notice on Certification:</strong> All documents must be certified by a recognized Commissioner for Oaths, Police Officer, or School Headteacher prior to final admission indexing.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => {
                const missing = documents.filter(d => !d.verified);
                if (missing.length > 2) {
                  alert('Please upload at least the NRC and ECZ Results statement before proceeding to payment.');
                  return;
                }
                setCurrentStep(5);
              }}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>Next: Application Fee Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: APPLICATION FEE PAYMENT INTEGRATION */}
      {currentStep === 5 && (
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Application Fee Payment Gateway</h2>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">Total Due</span>
                <span className="text-lg font-extrabold text-sky-700">ZMW 250.00</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select your payment method below. Instant mobile money prompt or bank card authorization.
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('AIRTEL_MONEY')}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                paymentMethod === 'AIRTEL_MONEY'
                  ? 'border-red-500 bg-red-50/50 text-red-900 ring-2 ring-red-500'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-red-600 text-white mx-auto flex items-center justify-center font-bold text-xs">
                AT
              </div>
              <span className="text-xs font-bold block mt-2">Airtel Money</span>
              <span className="text-[10px] text-slate-500">Zambia Mobile</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('MTN_MOMO')}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                paymentMethod === 'MTN_MOMO'
                  ? 'border-amber-500 bg-amber-50/50 text-amber-900 ring-2 ring-amber-500'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-900 mx-auto flex items-center justify-center font-bold text-xs">
                MTN
              </div>
              <span className="text-xs font-bold block mt-2">MTN MoMo</span>
              <span className="text-[10px] text-slate-500">Mobile Money</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('CARD_VISA_MC')}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                paymentMethod === 'CARD_VISA_MC'
                  ? 'border-sky-500 bg-sky-50/50 text-sky-900 ring-2 ring-sky-500'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-sky-600 text-white mx-auto flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold block mt-2">Visa / Card</span>
              <span className="text-[10px] text-slate-500">Debit or Credit</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('BANK_TRANSFER')}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                paymentMethod === 'BANK_TRANSFER'
                  ? 'border-sky-600 bg-sky-50/50 text-sky-900 ring-2 ring-sky-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-sky-700 text-white mx-auto flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold block mt-2">Bank Deposit</span>
              <span className="text-[10px] text-slate-500">ZANACO / Absa</span>
            </button>
          </div>

          {/* Form details for chosen method */}
          <div className="bg-sky-50/30 rounded-xl p-5 border border-sky-100">
            {(paymentMethod === 'AIRTEL_MONEY' || paymentMethod === 'MTN_MOMO' || paymentMethod === 'ZAMTEL_KWACHA') && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-sky-600" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    {paymentMethod === 'AIRTEL_MONEY' ? 'Airtel Money Push Prompt' : 'MTN MoMo Direct Prompt'}
                  </h4>
                </div>
                <p className="text-xs text-slate-600">
                  A USSD prompt for <strong className="text-slate-900">ZMW 250.00</strong> will be sent to your mobile phone. You will enter your mobile money PIN to confirm payment.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subscriber Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    placeholder="+260 97 ..."
                    className="w-full sm:w-2/3 p-2.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'CARD_VISA_MC' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sky-600" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Secure Visa / Mastercard Card Checkout
                  </h4>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4111 2222 3333 4444"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'BANK_TRANSFER' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-sky-700" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Direct Bank Account Deposit Details
                  </h4>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-sky-100 text-xs space-y-1">
                  <p><strong className="text-slate-900">Bank Name:</strong> Zambia National Commercial Bank (ZANACO)</p>
                  <p><strong className="text-slate-900">Branch:</strong> Kitwe Business Centre Branch</p>
                  <p><strong className="text-slate-900">Account Name:</strong> Kitwe School of Nursing and Midwifery Operational Account</p>
                  <p><strong className="text-slate-900">Account Number:</strong> 559281900142</p>
                  <p><strong className="text-slate-900">Amount:</strong> ZMW 250.00</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Deposit Slip Reference / Proof</label>
                  <input
                    type="text"
                    value={bankRef}
                    onChange={(e) => setBankRef(e.target.value)}
                    placeholder="e.g. ZAN-DEP-849201"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Interactive Mobile Money USSD Simulator Modal */}
          {ussdPromptActive && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-slate-900 text-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-sky-800 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 text-sky-400 mb-3">
                  <Smartphone className="w-5 h-5 animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-wider">USSD Push Simulation</span>
                </div>
                
                <div className="bg-black/40 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-2">
                  <p className="text-sky-300 font-bold">Kitwe School of Nursing</p>
                  <p>Authorize payment of <span className="text-white font-bold">ZMW 250.00</span> for 2026/2027 Application Fee.</p>
                  <p className="text-slate-400">Recipient: KSNM Treasury</p>
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-slate-300 mb-1">Enter Your 4-Digit Mobile Money PIN:</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={ussdPin}
                    onChange={(e) => setUssdPin(e.target.value)}
                    placeholder="••••"
                    className="w-full text-center tracking-widest text-lg font-mono p-2.5 rounded-lg bg-slate-800 border border-slate-600 text-white focus:ring-2 focus:ring-sky-500"
                    autoFocus
                  />
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setUssdPromptActive(false)}
                    className="w-1/2 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAuthorizeUssd}
                    disabled={isProcessingPayment}
                    className="w-1/2 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    {isProcessingPayment ? 'Verifying...' : 'Authorize PIN'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleInitiatePayment}
              disabled={isProcessingPayment}
              className="px-7 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/30 flex items-center gap-2 transition-all"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-sky-200" />
                  <span>Pay ZMW 250 &amp; Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: SUCCESS & AUTOMATED STATUS TRACKING */}
      {currentStep === 6 && (
        <div className="bg-white rounded-3xl border border-sky-200 p-8 sm:p-10 text-center space-y-6 shadow-xl max-w-2xl mx-auto">
          
          <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
              Application Successfully Submitted &amp; Verified
            </span>
            <h2 className="font-serif-crest text-2xl font-bold text-slate-900 mt-3">
              Welcome to Kitwe School of Nursing and Midwifery!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Your application has been received into the central admissions repository and your application fee of <strong>ZMW 250.00</strong> was processed successfully.
            </p>
          </div>

          {/* Reference Box */}
          <div className="bg-sky-50/50 border-2 border-sky-200 rounded-2xl p-6 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-sky-200/80 pb-3">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Application Reference Code</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-sky-900 tracking-wider">
                  {submittedRef}
                </span>
              </div>
              <span className="text-xs font-semibold text-sky-800 bg-sky-100 px-2.5 py-1 rounded-full border border-sky-200">
                Fee Paid (ZMW 250)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
              <div>
                <span className="text-slate-400 block">Candidate Name:</span>
                <span className="font-semibold text-slate-900">{firstName} {middleName} {lastName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">NRC Number:</span>
                <span className="font-semibold text-slate-900 font-mono">{nrcNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Program Selected:</span>
                <span className="font-semibold text-slate-900">{selectedProg.title}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Payment Receipt ID:</span>
                <span className="font-semibold text-slate-900 font-mono">{generatedPaymentId}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setTrackerPrefillRef(submittedRef);
                setActiveTab('track');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Track Application Status Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-3 bg-white border border-sky-200 hover:bg-sky-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-sky-600" />
              <span>Print Application Slip</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 pt-2">
            Keep your Reference Code safe. You can track your document review status or interview invitation at any time using this portal.
          </p>

        </div>
      )}

    </div>
  );
};
