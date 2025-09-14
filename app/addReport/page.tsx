"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";
import ReportCard from "@/components/ReportCard";
import Header from "@/components/Header";

export default function AddReportPage() {
  const [form, setForm] = useState({
    jobNumber: "",
    summaryNumber: "",
    onBehalfOf: "",
    description: "",
    shapeCut: "",
    totalEstWt: "",
    clarity: "",
    colour: "",
    comments: "",
  });

  const [newReport, setNewReport] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveReport = async (status: "draft" | "published") => {
    const reportData = { ...form, status };
    const docRef = await addDoc(collection(db, "reports"), reportData);
    setNewReport({ id: docRef.id, ...reportData });

    // reset form
    setForm({
      jobNumber: "",
      summaryNumber: "",
      onBehalfOf: "",
      description: "",
      shapeCut: "",
      totalEstWt: "",
      clarity: "",
      colour: "",
      comments: "",
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl">
          {/* Title */}
          <h1 className="text-2xl font-semibold mb-8 text-gray-800">
            Add New Report
          </h1>

          {/* Two-column layout */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left column - form fields */}
            <div className="col-span-2 space-y-5">
              {Object.entries({
                jobNumber: "JOB Number",
                summaryNumber: "SUMMARY Number",
                onBehalfOf: "On Behalf of",
                description: "Description",
                shapeCut: "Shape Cut",
                totalEstWt: "Total Est. Wt.",
                colour: "Colour",
                clarity: "Clarity",
                comments: "Comments",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center">
                  <label className="w-40 text-gray-700 font-medium">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={(form as any)[key]}
                    onChange={handleChange}
                    className="flex-1 border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Right column - upload + buttons */}
            <div className="flex flex-col items-center space-y-6">
              {/* Upload Box */}
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 flex flex-col justify-center items-center rounded-lg text-sm text-gray-500">
                <span className="mb-2">📎</span>
                Upload Image <br /> 512px × 512px
              </div>

              {/* Buttons */}
              <button
                type="button"
                onClick={() => saveReport("draft")}
                className="w-40 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800"
              >
                Save Report
              </button>
              <button
                type="button"
                onClick={() => saveReport("published")}
                className="w-40 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Publish Report
              </button>
              <button
                type="button"
                className="w-40 py-2 border border-red-600 text-red-600 rounded-lg shadow hover:bg-red-50"
              >
                Trash Report
              </button>
            </div>
          </div>
        </div>

        {/* Popup Report Card */}
        {newReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <ReportCard report={newReport} onClose={() => setNewReport(null)} />
          </div>
        )}
      </div>
    </>
  );
}
