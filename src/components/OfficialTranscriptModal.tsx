import React from 'react';
import { Student, SemesterResult } from '../types';
import { X, Printer, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  student: Student;
  semesterIndex?: number;
  onClose: () => void;
}

export const OfficialTranscriptModal: React.FC<Props> = ({ student, semesterIndex, onClose }) => {
  const semestersToShow = semesterIndex !== undefined 
    ? [student.semesterResults[semesterIndex]] 
    : student.semesterResults;

  const latestSemester = student.semesterResults[student.semesterResults.length - 1];
  const overallCgpa = latestSemester?.cumulativeGPA || 3.8;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl relative my-8 text-slate-900">
        
        {/* Controls Bar */}
        <div className="no-print flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-900 bg-sky-100 px-3 py-1 rounded-md border border-sky-200">
              Official Academic Transcript Slip
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Transcript</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div id="printable-content" className="space-y-6">
          
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5">
            <div className="w-14 h-14 rounded-full bg-sky-950 text-white mx-auto flex items-center justify-center font-bold mb-2">
              <Award className="w-8 h-8 text-sky-200" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600">
              REPUBLIC OF ZAMBIA · MINISTRY OF HEALTH
            </h3>
            <h1 className="font-serif-crest text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              KITWE SCHOOL OF NURSING AND MIDWIFERY
            </h1>
            <p className="text-xs text-slate-600">
              Kitwe Teaching Hospital Complex · Kuomboka Road, Parklands, P.O. Box 20969, Kitwe
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Accredited by the Nursing and Midwifery Council of Zambia (NMCZ)
            </p>
            <div className="mt-2 inline-block px-4 py-1 bg-slate-900 text-white font-serif-crest text-xs font-bold tracking-widest uppercase">
              OFFICIAL STATEMENT OF EXAMINATION RESULTS
            </div>
          </div>

          {/* Student Biodata Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-sky-50/40 p-4 rounded-xl border border-sky-100 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Student Name</span>
              <span className="font-bold text-slate-900">{student.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Student ID No.</span>
              <span className="font-bold text-slate-900 font-mono">{student.id}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">NRC Number</span>
              <span className="font-bold text-slate-900 font-mono">{student.nrc}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Current Program</span>
              <span className="font-bold text-slate-900">{student.program}</span>
            </div>
          </div>

          {/* Grades Table per Semester */}
          <div className="space-y-6">
            {semestersToShow.map((sem, sIdx) => (
              <div key={sIdx} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-300 pb-1">
                  <span className="text-sky-950">
                    Academic Year: {sem.academicYear} · Year {sem.yearOfStudy}, Semester {sem.semester}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    Released: {sem.publishedDate}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200">
                    <thead className="bg-slate-100 text-slate-700 text-[11px] uppercase">
                      <tr>
                        <th className="p-2 border">Code</th>
                        <th className="p-2 border">Course Title</th>
                        <th className="p-2 border text-center">Cr</th>
                        <th className="p-2 border text-center">CA</th>
                        <th className="p-2 border text-center">Exam</th>
                        <th className="p-2 border text-center">Total</th>
                        <th className="p-2 border text-center">Grade</th>
                        <th className="p-2 border text-center">GP</th>
                        <th className="p-2 border">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                      {sem.courses.map((course) => (
                        <tr key={course.code} className="hover:bg-slate-50">
                          <td className="p-2 border font-bold text-slate-900">{course.code}</td>
                          <td className="p-2 border font-sans text-slate-800">{course.name}</td>
                          <td className="p-2 border text-center">{course.credits}</td>
                          <td className="p-2 border text-center">{course.continuousAssessment}</td>
                          <td className="p-2 border text-center">{course.finalExam}</td>
                          <td className="p-2 border text-center font-bold text-slate-900">{course.totalMark}</td>
                          <td className="p-2 border text-center font-bold">
                            <span className={course.grade.startsWith('A') ? 'text-sky-700' : 'text-slate-900'}>
                              {course.grade}
                            </span>
                          </td>
                          <td className="p-2 border text-center">{course.gradePoint.toFixed(1)}</td>
                          <td className="p-2 border font-sans text-slate-700">{course.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Semester Summary Strip */}
                <div className="flex flex-wrap items-center justify-between text-xs bg-sky-50/50 p-2.5 rounded-lg border border-sky-100 font-semibold">
                  <div>
                    <span className="text-slate-500">Semester GPA: </span>
                    <span className="font-mono text-sky-800 font-bold">{sem.semesterGPA.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Cumulative GPA (CGPA): </span>
                    <span className="font-mono text-sky-800 font-bold">{sem.cumulativeGPA.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Board Academic Standing: </span>
                    <span className="text-sky-800 font-bold uppercase">{sem.standing.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grading Key */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[10px] text-slate-600 space-y-1">
            <span className="font-bold uppercase text-slate-800 block">Grading Scale (NMCZ Aligned):</span>
            <p>
              A+ (85–100% · Distinction · 4.0 GP) · A (80–84% · Distinction · 4.0 GP) · B+ (75–79% · Meritorious · 3.5 GP) · B (70–74% · Credit · 3.0 GP) · C+ (65–69% · Pass · 2.5 GP) · C (50–64% · Clear Pass · 2.0 GP) · F (&lt;50% · Fail · 0.0 GP)
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 flex justify-between items-end text-xs">
            <div>
              <p className="font-bold text-slate-900">Mr. Patrick Mutambo</p>
              <div className="w-40 h-0.5 bg-slate-950 my-1" />
              <p className="text-slate-600">Examinations Officer &amp; NMCZ Liaison</p>
              <p className="text-[10px] text-slate-400">Date Issued: {new Date().toLocaleDateString('en-GB')}</p>
            </div>

            <div className="w-24 h-24 border-2 border-sky-900 border-dashed rounded-full flex flex-col items-center justify-center text-center p-2 text-sky-950 rotate-[-10deg] opacity-80 select-none">
              <span className="text-[8px] font-bold">KITWE SCHOOL</span>
              <span className="text-[9px] font-black text-sky-700">EXAMS OFFICE</span>
              <span className="text-[7px] font-mono">SEAL &amp; CERTIFIED</span>
            </div>

            <div className="text-right">
              <p className="font-bold text-slate-900">Mrs. Gertrude M. Sakala</p>
              <div className="w-40 h-0.5 bg-slate-950 my-1 ml-auto" />
              <p className="text-slate-600">Principal Tutor</p>
              <p className="text-[10px] text-slate-400">Kitwe School of Nursing and Midwifery</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
