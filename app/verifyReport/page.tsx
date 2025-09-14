// import Header from "@/components/Header";
// import { useState } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firestore"; // Using your exported db
// import VerifyReportForm from "@/components/VerifyReportForm";
// import ReportDetails from "@/components/ReportDetails";

// interface Report {
//   summaryNumber: string;
//   title: string;
//   description: string;
// }

// export default function VerifyReport() {
//   const [summaryNumber, setSummaryNumber] = useState<string>("");
//   const [reportData, setReportData] = useState<Report | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");

//   const handleSearch = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const reportsRef = collection(db, "reports");
//       const q = query(reportsRef, where("summaryNumber", "==", summaryNumber));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const report = querySnapshot.docs[0].data() as Report;
//         setReportData(report);
//       } else {
//         setReportData(null);
//         setError("Report not found.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch report.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-black font-sans">
//       <Header />
//       <main className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Verify Report</h1>
//         <VerifyReportForm
//           summaryNumber={summaryNumber}
//           setSummaryNumber={setSummaryNumber}
//           handleSearch={handleSearch}
//           loading={loading}
//         />
//         {error && <p className="text-red-600 mt-4">{error}</p>}
//         {reportData && <ReportDetails report={reportData} />}
//       </main>
//     </div>
//   );
// }
