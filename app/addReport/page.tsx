"use client";

import { useState, useRef } from "react"; // Added useRef
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";
import ReportCard from "@/components/ReportCard";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { uploadImageAction } from "./actions"; // Import the new action

export default function AddReportPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null); // For triggering upload

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Show preview in the box
    }
  };

  const saveReport = async (status: "draft" | "published") => {
    try {
      let imageUrl = "";

      // 1. Upload to public/uploads if a file exists
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const uploadedPath = await uploadImageAction(formData);
        if (uploadedPath) imageUrl = uploadedPath;
      }

      // 2. Add image URL to the Firestore data
      const reportData = { ...form, status, imageUrl };
      const docRef = await addDoc(collection(db, "reports"), reportData);

      setNewReport({ id: docRef.id, ...reportData });

      // Reset states
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
      setSelectedFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error saving report:", error);
      alert("Failed to save report.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen admin-bg bg-gray-100 flex justify-center items-start py-10">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl">
          <h1 className="text-2xl font-semibold mb-8 text-gray-800">
            Add New Report
          </h1>

          <div className="grid grid-cols-3 gap-8">
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

            <div className="flex flex-col items-center space-y-6">
              {/* Updated Upload Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-40 h-40 border-2 border-dashed border-gray-300 flex flex-col justify-center items-center rounded-lg text-sm text-gray-500 cursor-pointer overflow-hidden relative"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span className="mb-2">📎</span>
                    Upload Image <br /> 512px × 512px
                  </>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

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
                onClick={() => router.push("/admin")}
              >
                Trash Report
              </button>
            </div>
          </div>
        </div>

        {newReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <ReportCard
              report={newReport}
              onClose={() => router.push("/admin")}
            />
          </div>
        )}
      </div>
    </>
  );
}
