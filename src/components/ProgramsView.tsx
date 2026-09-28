import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  Download, 
  FileText, 
  Check, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { generateCourseCatalogPDF } from '../utils/generateCatalogPdf';

export const ProgramsView: React.FC = () => {
  const { programs, setActiveTab } = useApp();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCatalog = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateCourseCatalogPDF(programs);
        setIsDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4500);
      } catch (err) {
        console.error('Failed to generate catalog PDF', err);
        setIsDownloading(false);
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
          Academic Offerings &amp; Curricula
        </span>
        <h1 className="font-serif-crest text-3xl sm:text-4xl font-bold text-slate-900">
          Accredited Nursing &amp; Midwifery Programs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Approved and regulated by the Nursing and Midwifery Council of Zambia (NMCZ). Each program blends rigorous scientific theory, modern OSCE skills laboratory training, and extensive clinical ward rotations at Kitwe Teaching Hospital.
        </p>
      </div>

      {/* FORMAL COURSE CATALOG DOWNLOAD BANNER IN LIGHT BLUE & WHITE PALETTE */}
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-200 bg-sky-900/80 px-2.5 py-0.5 rounded-md border border-sky-700/60">
              <FileText className="w-3.5 h-3.5 text-sky-300" />
              <span>Official Institutional Prospectus · 2026/2027 Edition</span>
            </div>
            
            <h2 className="font-serif-crest text-xl sm:text-2xl font-bold text-white">
              Download Formal Course Catalog (PDF)
            </h2>
            
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              Download the complete printable syllabus, semester course codes, clinical competencies checklist, NMCZ licensure guidelines, tuition fee breakdowns, and admission requirements in a single formal PDF booklet.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-sky-200/90 pt-1">
              <span>• Full Multi-Page Curriculum</span>
              <span>• Official NMCZ Accreditation Seal</span>
              <span>• Vector High-Res Printable Document</span>
            </div>
          </div>

          {/* Download CTA Button */}
          <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
            <button
              onClick={handleDownloadCatalog}
              disabled={isDownloading}
              className={`px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2.5 ${
                downloadSuccess
                  ? 'bg-sky-500 text-white'
                  : isDownloading
                  ? 'bg-sky-800 text-sky-200 cursor-wait'
                  : 'bg-white hover:bg-sky-50 text-sky-950 shadow-white/20 transform hover:-translate-y-0.5'
              }`}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-sky-950 border-t-transparent rounded-full animate-spin" />
                  <span>Compiling Formal PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Catalog Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-sky-800" />
                  <span>Download Course Catalog (PDF)</span>
                </>
              )}
            </button>

            <span className="text-[11px] text-sky-300 font-mono">
              PDF Format · Kitwe_School_of_Nursing_Course_Catalog_2026_2027.pdf
            </span>
          </div>

        </div>
      </div>

      {/* Programs List */}
      <div className="space-y-8">
        {programs.map((prog) => (
          <div 
            key={prog.id}
            className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-xs hover:border-sky-300 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Col 1 & 2: Details */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                    {prog.duration}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Intakes: {prog.intakes.join(' · ')}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-sky-700 font-semibold">
                    {prog.award}
                  </span>
                </div>

                <h2 className="font-serif-crest text-xl sm:text-2xl font-bold text-slate-900">
                  {prog.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {prog.description}
                </p>

                {/* Entry Requirements */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Minimum Entry Requirements (ECZ / GCE):
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {prog.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Col 3: Fee & Action Card */}
              <div className="bg-sky-50/40 rounded-2xl p-6 border border-sky-100 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider block">
                    Financial &amp; Intake Details
                  </span>

                  <div>
                    <span className="text-xs text-slate-500 block">Annual Tuition:</span>
                    <span className="text-xl font-bold text-slate-900 font-mono">
                      ZMW {prog.annualTuitionZMW.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Payable per semester in installments</span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 block">Online Application Fee:</span>
                    <span className="text-sm font-bold text-sky-800 font-mono">
                      ZMW {prog.applicationFeeZMW.toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 block">Accreditation:</span>
                    <span className="text-xs font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                      <span>NMCZ &amp; MoH Certified</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('apply')}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Apply for this Program</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleDownloadCatalog}
                    className="w-full py-2 bg-white hover:bg-sky-50 text-sky-900 border border-sky-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-600" />
                    <span>Download Full Catalog (PDF)</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
