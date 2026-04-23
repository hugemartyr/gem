'use client';

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firestore";
import jsPDF from "jspdf";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import ReportCard from "@/components/ReportCard";

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
  status: string;
  imageUrl?: string;
}

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const pageSize = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      const querySnapshot = await getDocs(collection(db, "reports"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Report[];
      setReports(data);
    };
    fetchReports();
  }, []);

  // Filter Logic
  const filteredReports = reports.filter(
    (r) =>
      r.jobNumber?.toLowerCase().includes(search.toLowerCase()) ||
      r.summaryNumber?.toLowerCase().includes(search.toLowerCase()) ||
      r.onBehalfOf?.toLowerCase().includes(search.toLowerCase()),
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Job Number",
      "Summary Number",
      "On Behalf Of",
      "Description",
      "Shape Cut",
      "Total Est Wt",
      "Clarity",
      "Colour",
      "Comments",
    ];
    const rows = filteredReports.map((r) => [
      r.jobNumber,
      r.summaryNumber,
      r.onBehalfOf,
      r.description,
      r.shapeCut,
      r.totalEstWt,
      r.clarity,
      r.colour,
      r.comments,
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export PDF (List View)
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Reports Export", 14, 16);
    let y = 30;
    filteredReports.forEach((r, index) => {
      doc.text(
        `${index + 1}. ${r.jobNumber} | ${r.summaryNumber} | ${r.onBehalfOf}`,
        14,
        y,
      );
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save("reports_list.pdf");
  };

  const handleExport = (type: string) => {
    if (type === "CSV") exportCSV();
    if (type === "PDF") exportPDF();
  };

  // Specific Report Print Handler
  const handlePrintCard = (report: Report) => {
    setActiveReport(report);
    // Short delay to allow React to render the ReportCard before the print dialog opens
    setTimeout(() => {
      window.print();
      setActiveReport(null);
    }, 150);
  };

  return (
    <div className="min-h-screen admin-bg bg-gray-50">
      <Header />

      {/* Global CSS for Print Handling */}
      <style jsx global>{`
        @media print {
          /* Hide the dashboard UI during print */
          .no-print-zone,
          .no-print,
          header {
            display: none !important;
          }

          /* Reset the parent wrapper so it doesn't interfere */
          .admin-bg {
            background: none !important;
            background-image: none !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: auto !important;
          }

          /* Show the print card container */
          .print-only-container {
            display: block !important;
            position: absolute;
            top: 0;
            left: 0;
            width: 8.5cm;
            height: 5.4cm;
            z-index: 9999;
          }

          .print-only-container .print-card {
            position: absolute;
            top: 0;
            left: 0;
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
        }
        @media screen {
          .print-only-container {
            display: none; /* Hide the card from standard dashboard view */
          }
        }
      `}</style>

      <div className="p-6 no-print-zone">
        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Admin Dashboard
          </h1>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center space-x-2"
              onClick={() => router.push("/addReport")}
            >
              <span>+ Add New Report</span>
            </button>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
              onClick={() => router.push("/verifyReport")}
            >
              Verify Report
            </button>
          </div>
        </div>

        {/* Search & Export Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 px-4 py-2.5 rounded-lg text-gray-900 cursor-pointer hover:bg-white"
            onChange={(e) => handleExport(e.target.value)}
          >
            <option>Export As</option>
            <option value="CSV">CSV</option>
            <option value="PDF">PDF List</option>
          </select>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Summary Number</th>
                <th className="px-6 py-4">On Behalf Of</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedReports.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {r.summaryNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{r.onBehalfOf}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        r.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                      onClick={() => handlePrintCard(r)}
                    >
                      <span className="mr-1">🖨</span> Print Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* The Hidden Card Container - This is what actually prints */}
      {activeReport && (
        <div className="print-only-container">
          <ReportCard
            report={activeReport}
            onClose={() => setActiveReport(null)}
          />
        </div>
      )}
    </div>
  );
}
