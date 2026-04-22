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
            padding: 0.4cm !important; /* Slightly reduced padding */
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
            font-size: 7.5pt !important; /* Scaled down for PVC fit */
            line-height: 1.1 !important;
          }

          /* Ensure logo header fits side-by-side in print */
          .header-container {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
          }
        }
      `}</style>

      <div className="print-card relative w-[900px] bg-white text-black rounded-xl shadow-xl mx-auto p-10 font-serif overflow-hidden card-bg">
        <button
          onClick={onClose}
          className="no-print absolute top-3 right-3 text-gray-700 hover:text-black text-xl z-10"
        >
          ✕
        </button>

        {/* Header Section: Logo and Text side-by-side */}
        <div className="header-container flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img src="/logocolor.png" className="w-10 h-auto" alt="Logo" />
            <img
              src="/writeupblack.png"
              className="w-48 h-auto"
              alt="Imperial Gemological Institute"
            />
          </div>
          <QRCodeCanvas
            value={`https://yourdomain.com/verify/${report.summaryNumber}`}
            size={45}
          />
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-[90px_10px_1fr] gap-y-1 text-[10px] leading-tight">
          <p className="font-bold">SUMMARY NO.</p>
          <p>:</p>
          <p>{report.summaryNumber}</p>
          <p className="font-bold">DESCRIPTION</p>
          <p>:</p>
          <p className="text-[9px]">{report.description}</p>
          <p className="font-bold">SHAPE/CUT</p>
          <p>:</p>
          <p>{report.shapeCut}</p>
          <p className="font-bold">TOTAL WT.</p>
          <p>:</p>
          <p>{report.totalEstWt}</p>
          <p className="font-bold">COLOUR</p>
          <p>:</p>
          <p>{report.colour}</p>
          <p className="font-bold">CLARITY</p>
          <p>:</p>
          <p>{report.clarity}</p>
        </div>

        {/* Diamond Image */}
        <img
          src={
            report.imageUrl ||
            "https://via.placeholder.com/140.png?text=NO+IMAGE"
          }
          className="absolute bottom-8 right-4 w-[75px] h-[75px] object-cover rounded shadow-sm border border-gray-100"
          alt="Diamond"
        />

        {/* Footer */}
        <div className="absolute bottom-3 left-4 right-4 border-t border-gray-300 pt-1 text-[6.5px] text-gray-600 leading-none">
          IMPORTANT NOTICE: This report is subject to IGI's Terms & Conditions.
          Verify at www.igi.co.in/terms
        </div>

        {/* Action Buttons */}
        <div className="no-print flex justify-end gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors"
          >
            🖨 Print
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            💾 Save
          </button>
        </div>
      </div>
    </>
  );
}
