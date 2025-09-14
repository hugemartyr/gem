interface VerifyReportFormProps {
  summaryNumber: string;
  setSummaryNumber: (value: string) => void;
  handleSearch: () => void;
  loading: boolean;
}

export default function VerifyReportForm({
  summaryNumber,
  setSummaryNumber,
  handleSearch,
  loading,
}: VerifyReportFormProps) {
  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Enter Summary Number"
        value={summaryNumber}
        onChange={(e) => setSummaryNumber(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
