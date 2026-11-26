import { useEffect } from 'react';
import { Award, CheckCircle2, Copy, Printer, ShieldCheck, X } from 'lucide-react';
import { toast } from 'sonner';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

export interface CertificateItem {
  id: string | number;
  participantName: string;
  scheme: string;
  issueDate: string;
  certificateNumber: string;
  status: 'issued' | 'pending';
  verificationCode?: string;
}

interface CertificatePreviewModalProps {
  certificate: CertificateItem;
  onClose: () => void;
}

export function printCertificatePdf(cert: CertificateItem) {
  const verificationCode =
    cert.verificationCode || `LVG-${cert.certificateNumber.replace(/[^A-Z0-9]/gi, '').slice(-8)}`;
  const html = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Certificate - ${cert.certificateNumber}</title>
  <style>
    @page { size: A4 landscape; margin: 12mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      color: #1f2937;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cert {
      width: 100%;
      max-width: 1020px;
      background: linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 55%, #F3F6FB 100%);
      border: 6px solid #1677F9;
      border-radius: 20px;
      padding: 48px 56px;
      position: relative;
      text-align: center;
    }
    .inner-border {
      border: 2px dashed rgba(22, 119, 249, 0.35);
      border-radius: 12px;
      padding: 36px 40px;
    }
    .brand { font-size: 14px; font-weight: 700; letter-spacing: 0.16em; color: #1677F9; text-transform: uppercase; }
    h1 { font-size: 36px; margin-top: 10px; color: #171C2B; letter-spacing: -0.02em; }
    .subtitle { font-size: 14px; color: #667085; margin-top: 6px; }
    .given { font-size: 13px; color: #667085; margin-top: 28px; text-transform: uppercase; letter-spacing: 0.1em; }
    .recipient { font-size: 40px; font-weight: 800; color: #1677F9; margin: 12px 0; }
    .desc { font-size: 15px; color: #475569; max-width: 640px; margin: 0 auto; line-height: 1.6; }
    .scheme { font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 12px; }
    .footer {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #cbd5e1;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      text-align: left;
      font-size: 12px;
      color: #475569;
    }
    .sig { text-align: center; min-width: 180px; }
    .sig-line { border-top: 1px solid #64748b; margin-top: 38px; padding-top: 6px; font-weight: 700; color: #0f172a; }
    .meta strong { color: #0f172a; display: block; font-size: 13px; margin-top: 2px; }
    @media print {
      body { background: #fff; }
      .cert { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="cert">
    <div class="inner-border">
      <div class="brand">MagangHub • Official Training Portal</div>
      <h1>CERTIFICATE OF COMPLETION</h1>
      <p class="subtitle">Issued as official proof of structured training program completion</p>
      <div class="given">Awarded To</div>
      <div class="recipient">${cert.participantName}</div>
      <p class="desc">Has successfully completed all learning materials, practical assignments, and final evaluations in the training program:</p>
      <div class="scheme">${cert.scheme}</div>
      <div class="footer">
        <div class="meta">
          <div>Certificate Number<strong>${cert.certificateNumber}</strong></div>
          <div style="margin-top:8px;">Issue Date<strong>${cert.issueDate}</strong></div>
        </div>
        <div class="sig">
          <div class="sig-line">Program Director, MagangHub</div>
          <div style="color:#64748b;margin-top:2px;">Official Training Portal</div>
        </div>
        <div class="meta" style="text-align:right;">
          <div>Verification Code<strong>${verificationCode}</strong></div>
          <div style="margin-top:8px;color:#059669;font-weight:700;">Status: Verified</div>
        </div>
      </div>
    </div>
  </div>
  <script>window.onload = function() { window.print(); };</script>
</body>
</html>`;

  const printWindow = window.open('', '_blank', 'width=1100,height=780');
  if (!printWindow) {
    toast.error('Pop-up blocked by browser. Please allow pop-ups to download or print PDF.');
    return;
  }
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

export function CertificatePreviewModal({
  certificate,
  onClose,
}: CertificatePreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const verificationCode =
    certificate.verificationCode ||
    `LVG-${certificate.certificateNumber.replace(/[^A-Z0-9]/gi, '').slice(-8)}`;

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(certificate.certificateNumber);
      toast.success('Certificate number copied to clipboard.');
    } catch {
      toast.info(`Certificate number: ${certificate.certificateNumber}`);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white text-[#171C2B] rounded-2xl border border-[#E7ECF3] max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white z-10 px-5 sm:px-6 py-4 border-b border-[#E7ECF3] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className={DASHBOARD_TOKENS.iconBoxSm}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className={DASHBOARD_TOKENS.sectionHeading}>
                Training Certificate Preview
              </h3>
              <p className={DASHBOARD_TOKENS.metaText}>
                No. {certificate.certificateNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyNumber}
              className={DASHBOARD_TOKENS.btnOutline}
            >
              <Copy className="w-3.5 h-3.5" /> Copy Number
            </button>
            <button
              type="button"
              onClick={() => printCertificatePdf(certificate)}
              className={DASHBOARD_TOKENS.btnPrimary}
            >
              <Printer className="w-3.5 h-3.5" /> Print / Download PDF
            </button>
            <button
              type="button"
              aria-label="Close preview"
              onClick={onClose}
              className="p-2 rounded-xl text-[#667085] hover:bg-[#F3F6FB] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-5 sm:p-6">
          <div className="bg-gradient-to-br from-[#EFF6FF] via-white to-[#F3F6FB] rounded-2xl border-4 border-[#1677F9] p-8 sm:p-10 relative overflow-hidden">
            {/* Corner ornaments */}
            <div className="absolute top-3 left-3 w-12 h-12 border-t-4 border-l-4 border-[#1677F9] rounded-tl-xl" />
            <div className="absolute top-3 right-3 w-12 h-12 border-t-4 border-r-4 border-[#1677F9] rounded-tr-xl" />
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-4 border-l-4 border-[#1677F9] rounded-bl-xl" />
            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-4 border-r-4 border-[#1677F9] rounded-br-xl" />

            <div className="border border-dashed border-[#1677F9]/30 rounded-xl p-6 sm:p-8 text-center space-y-5">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#1677F9] flex items-center justify-center shadow-md">
                  <Award className="w-9 h-9 text-white" />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677F9]">
                  MagangHub • Official Training Portal
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-[#171C2B]">
                  CERTIFICATE OF COMPLETION
                </h2>
                <p className="text-xs mt-1 text-[#667085]">
                  Issued as official proof of structured training program completion
                </p>
              </div>

              <div className="py-3 space-y-2">
                <p className="text-xs uppercase tracking-widest text-[#667085]">
                  Awarded To
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#1677F9]">
                  {certificate.participantName}
                </p>
                <p className="text-sm max-w-xl mx-auto pt-1 text-[#667085]">
                  Has successfully completed all learning materials, practical assignments, and final evaluations in:
                </p>
                <h3 className="text-lg sm:text-xl font-bold pt-1 text-[#171C2B]">
                  {certificate.scheme}
                </h3>
              </div>

              <div className="pt-5 border-t border-[#E7ECF3] grid grid-cols-1 sm:grid-cols-3 gap-6 text-left items-end">
                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-[#667085]">Certificate Number</span>
                    <p className="font-bold text-sm text-[#171C2B]">
                      {certificate.certificateNumber}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#667085]">Issue Date</span>
                    <p className="font-semibold text-[#171C2B]">
                      {certificate.issueDate}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="h-10 flex items-center justify-center italic font-semibold text-[#1677F9]/75 text-sm">
                    MagangHub Official
                  </div>
                  <div className="border-t border-[#98A2B3] pt-1.5">
                    <p className="text-xs font-bold text-[#171C2B]">
                      Program Director, MagangHub
                    </p>
                    <p className="text-[11px] text-[#667085]">
                      Official Training Portal
                    </p>
                  </div>
                </div>

                <div className="text-xs sm:text-right space-y-2">
                  <div>
                    <span className="text-[#667085]">Verification Code</span>
                    <p className="font-mono font-bold text-sm text-[#171C2B]">
                      {verificationCode}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 font-semibold text-[#16A34A]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Officially Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
