// "use client";

// import jsPDF from "jspdf";
// import { QRCodeCanvas } from "qrcode.react";

// interface Report {
//   id: string;
//   jobNumber: string;
//   summaryNumber: string;
//   onBehalfOf: string;
//   description: string;
//   shapeCut: string;
//   totalEstWt: string;
//   clarity: string;
//   colour: string;
//   comments: string;
// }

// export default function ReportCard({
//   report,
//   onClose,
// }: {
//   report: Report;
//   onClose: () => void;
// }) {
//   const handlePrint = () => {
//     window.print();
//   };

//   const handleSave = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(12);
//     doc.text("IMPERIAL GEMOLOGICAL INSTITUTE OF INDIA", 14, 20);
//     doc.text(`Summary Number: ${report.summaryNumber}`, 14, 35);
//     doc.text(`Description: ${report.description}`, 14, 45);
//     doc.text(`Shape/Cut: ${report.shapeCut}`, 14, 55);
//     doc.text(`Total Est. Wt: ${report.totalEstWt}`, 14, 65);
//     doc.text(`Colour: ${report.colour}`, 14, 75);
//     doc.text(`Clarity: ${report.clarity}`, 14, 85);
//     doc.text(`Comments: ${report.comments}`, 14, 95);
//     doc.save(`${report.summaryNumber}.pdf`);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl relative">
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
//       >
//         ✕
//       </button>

//       {/* Success Message */}
//       <h2 className="text-xl font-semibold mb-6 text-center text-gray-900">
//         Congratulations Report{" "}
//         <span className="text-blue-600">#{report.summaryNumber}</span> is
//         successfully generated.
//       </h2>

//       {/* Card Header */}
//       <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-xl border-b border-gray-300 mb-6">
//         <h1 className="text-lg font-bold text-gray-900">
//           Imperial Gemological Institute of India
//         </h1>
//         <div className="text-right text-gray-800 space-y-1">
//           <p>
//             <strong>Summary #:</strong> {report.summaryNumber}
//           </p>
//           <p>
//             <strong>Job #:</strong> {report.jobNumber}
//           </p>
//         </div>
//       </div>

//       {/* Card Layout */}
//       <div className="border rounded-b-xl p-6 grid grid-cols-3 gap-6 items-start">
//         {/* Left Section (Details) */}
//         <div className="col-span-2 space-y-2 text-sm text-gray-800">
//           <p>
//             <strong className="text-gray-900">On Behalf of:</strong>{" "}
//             {report.onBehalfOf}
//           </p>
//           <p>
//             <strong className="text-gray-900">Description:</strong>{" "}
//             {report.description}
//           </p>
//           <p>
//             <strong className="text-gray-900">Shape/Cut:</strong>{" "}
//             {report.shapeCut}
//           </p>
//           <p>
//             <strong className="text-gray-900">Total Est. Wt:</strong>{" "}
//             {report.totalEstWt}
//           </p>
//           <p>
//             <strong className="text-gray-900">Colour:</strong> {report.colour}
//           </p>
//           <p>
//             <strong className="text-gray-900">Clarity:</strong> {report.clarity}
//           </p>
//           <p>
//             <strong className="text-gray-900">Comments:</strong>{" "}
//             {report.comments}
//           </p>
//         </div>

//         {/* Right Section (QR + Image) */}
//         <div className="flex flex-col items-center space-y-4">
//           <a
//             href="https://example.com"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <QRCodeCanvas value="https://example.com" size={120} />
//           </a>
//           <img
//             src="https://via.placeholder.com/120x120.png?text=Diamond"
//             alt="Placeholder"
//             className="w-28 h-28 object-cover rounded-lg border"
//           />
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-6 flex justify-between items-center">
//         <p className="text-xs text-gray-600 max-w-md">
//           IMPORTANT NOTICE: Grading & Identification of Origin as mounting
//           permits. This is a dummy placeholder text for certification note.
//         </p>

//         <div className="flex space-x-3">
//           <button
//             onClick={handlePrint}
//             className="px-4 py-2 bg-gray-200 rounded-lg shadow text-gray-800 hover:bg-gray-300"
//           >
//             🖨 Print
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//           >
//             💾 Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  imageUrl?: string; // 1. Added imageUrl to the interface
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
            padding: 0.5cm !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: hidden;
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
            font-size: 8pt !important;
            line-height: 1.1 !important;
          }
          .print-card img {
            max-width: 2cm !important;
          }
        }
      `}</style>

      <div className="print-card relative w-[900px] bg-white text-black rounded-xl shadow-xl mx-auto p-10 font-serif overflow-hidden card-bg">
        <button
          onClick={onClose}
          className="no-print absolute top-3 right-3 text-gray-700 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <img src="/logocolor.png" className="w-24 h-auto" alt="Logo" />
            <img src="/writeupblack.png" className="w-40 h-auto" alt="Logo" />
          </div>
          <QRCodeCanvas
            value={`https://yourdomain.com/verify/${report.summaryNumber}`}
            size={50}
          />
        </div>

        <div className="grid grid-cols-[100px_10px_1fr] gap-y-1 text-[10px] leading-tight">
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

        {/* 2. Updated to show the uploaded image or a placeholder if missing */}
        <img
          src={
            report.imageUrl ||
            "https://via.placeholder.com/140.png?text=NO+IMAGE"
          }
          className="absolute bottom-10 right-4 w-[80px] h-[80px] object-cover rounded shadow-sm"
          alt="Diamond"
        />

        <div className="mt-4 border-t border-gray-300 pt-1 text-[7px] text-gray-600 leading-none">
          IGL Terms Apply: www.igi.co.in/terms
        </div>

        <div className="no-print flex justify-end gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
          >
            🖨 Print
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            💾 Save
          </button>
        </div>
      </div>
    </>
  );
}
