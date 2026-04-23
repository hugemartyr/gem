"use client";

import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

interface Report {
  id: string;
  jobNumber: string;
  summaryNumber: string;
  onBehalfOf: string;
  description: string;
  shapeCut: string;
  totalEstWt: string;
  clarity: string;
  colour: string;
  comments: string;
  imageUrl?: string;
}

export default function ReportCard({
  report,
  onClose,
}: {
  report: Report;
  onClose: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("IMPERIAL GEMOLOGICAL INSTITUTE OF INDIA", 14, 20);
    doc.text(`Summary Number: ${report.summaryNumber}`, 14, 35);
    doc.text(`Description: ${report.description}`, 14, 45);
    doc.text(`Shape/Cut: ${report.shapeCut}`, 14, 55);
    doc.text(`Total Est. Wt: ${report.totalEstWt}`, 14, 65);
    doc.text(`Colour: ${report.colour}`, 14, 75);
    doc.text(`Clarity: ${report.clarity}`, 14, 85);
    doc.text(`Comments: ${report.comments}`, 14, 95);
    doc.save(`${report.summaryNumber}.pdf`);
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-card,
          .print-card * {
            visibility: visible;
          }

          .print-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 8.5cm !important;
            height: 5.4cm !important;
            padding: 0.3cm 0.35cm !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: hidden;
            background-color: white !important;
          }

          @page {
            size: 8.5cm 5.4cm;
            margin: 0;
          }

          .no-print {
            display: none !important;
          }

          .print-card p,
          .print-card div {
            font-size: 6.5pt !important;
            line-height: 1.15 !important;
          }

          .print-card .card-header-logo {
            height: 14px !important;
          }

          .print-card .card-header-writeup {
            width: 100px !important;
          }

          .print-card .card-qr canvas {
            width: 32px !important;
            height: 32px !important;
          }

          .print-card .card-diamond-img {
            width: 55px !important;
            height: 55px !important;
            bottom: 18px !important;
            right: 8px !important;
          }

          .print-card .card-footer {
            font-size: 5pt !important;
            bottom: 4px !important;
            left: 8px !important;
            right: 8px !important;
          }

          /* Ensure logo header fits side-by-side in print */
          .header-container {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            margin-bottom: 4px !important;
          }
        }
      `}</style>

      <div className="print-card relative bg-white text-black rounded-xl shadow-xl mx-auto font-serif overflow-hidden card-bg"
        style={{ width: "8.5cm", height: "5.4cm", padding: "0.3cm 0.35cm" }}
      >
        <button
          onClick={onClose}
          className="no-print absolute top-1 right-1.5 text-gray-700 hover:text-black text-sm z-10"
        >
          ✕
        </button>

        {/* Header Section: Logo and Text side-by-side */}
        <div className="header-container flex justify-between items-center mb-1.5">
          <div className="flex items-center gap-1.5">
            <img src="/logocolor.png" className="card-header-logo h-[18px] w-auto" alt="Logo" />
            <img
              src="/writeupblack.png"
              className="card-header-writeup w-[110px] h-auto"
              alt="Imperial Gemological Institute"
            />
          </div>
          <div className="card-qr">
            <QRCodeCanvas
              value={`https://yourdomain.com/verify/${report.summaryNumber}`}
              size={36}
            />
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-[68px_8px_1fr] gap-y-[2px] text-[7pt] leading-snug">
          <p className="font-bold uppercase tracking-tight">Summary No.</p>
          <p>:</p>
          <p>{report.summaryNumber}</p>
          <p className="font-bold uppercase tracking-tight">Description</p>
          <p>:</p>
          <p className="text-[6.5pt]">{report.description}</p>
          <p className="font-bold uppercase tracking-tight">Shape/Cut</p>
          <p>:</p>
          <p>{report.shapeCut}</p>
          <p className="font-bold uppercase tracking-tight">Total Wt.</p>
          <p>:</p>
          <p>{report.totalEstWt}</p>
          <p className="font-bold uppercase tracking-tight">Colour</p>
          <p>:</p>
          <p>{report.colour}</p>
          <p className="font-bold uppercase tracking-tight">Clarity</p>
          <p>:</p>
          <p>{report.clarity}</p>
        </div>

        {/* Diamond Image */}
        <img
          src={
            report.imageUrl ||
            "https://via.placeholder.com/140.png?text=NO+IMAGE"
          }
          className="card-diamond-img absolute bottom-[18px] right-[10px] w-[58px] h-[58px] object-cover rounded shadow-sm border border-gray-200"
          alt="Diamond"
        />

        {/* Footer */}
        <div className="card-footer absolute bottom-[5px] left-[10px] right-[10px] border-t border-gray-300 pt-[2px] text-[5pt] text-gray-500 leading-none">
          IMPORTANT NOTICE: This report is subject to IGI&apos;s Terms &amp; Conditions.
          Verify at www.igi.co.in/terms
        </div>

        {/* Action Buttons */}
        <div className="no-print flex justify-end gap-2 mt-3">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-gray-200 rounded-lg text-xs hover:bg-gray-300 transition-colors"
          >
            🖨 Print
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors"
          >
            💾 Save
          </button>
        </div>
      </div>
    </>
  );
}
