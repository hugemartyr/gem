"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firestore";
import jsPDF from "jspdf";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

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
}

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
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

  // Filter
  const filteredReports = reports.filter(
    (r) =>
      r.jobNumber?.toLowerCase().includes(search.toLowerCase()) ||
      r.summaryNumber?.toLowerCase().includes(search.toLowerCase()) ||
      r.onBehalfOf?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 🔹 Export CSV
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

  // 🔹 Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Reports Export", 14, 16);

    let y = 30;
    filteredReports.forEach((r, index) => {
      doc.text(
        `${index + 1}. ${r.jobNumber} | ${r.summaryNumber} | ${
          r.onBehalfOf
        } | ${r.description} | ${r.shapeCut} | ${r.totalEstWt} | ${
          r.clarity
        } | ${r.colour} | ${r.comments}`,
        14,
        y
      );
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("reports.pdf");
  };

  const handleExport = (type: string) => {
    if (type === "CSV") exportCSV();
    if (type === "PDF") exportPDF();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      <div className="p-6">
        {/* Title + Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Admin Dashboard
          </h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            onClick={() => router.push("/addReport")}
          >
            <span>+</span>
            <span>Add New Report</span>
          </button>
        </div>

        {/* Search + Export */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <select
            className="border border-gray-300 px-4 py-2.5 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:bg-gray-50"
            onChange={(e) => handleExport(e.target.value)}
          >
            <option>Export As</option>
            <option value="CSV">CSV</option>
            <option value="PDF">PDF</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm text-left text-gray-900">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="px-4 py-3">Summary Number</th>
                <th className="px-4 py-3">On Behalf Of</th>

                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReports.map((r) => (
                <tr key={r.id} className="border-t text-gray-900">
                  <td className="px-4 py-2">{r.summaryNumber}</td>
                  <td className="px-4 py-2">{r.onBehalfOf}</td>

                  <td className="px-4 py-2">{r.status}</td>
                  <td className="px-4 py-2">
                    <button className="flex items-center text-blue-700 hover:underline">
                      🖨 Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
