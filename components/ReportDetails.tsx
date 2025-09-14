interface Report {
  summaryNumber: string;
  title: string;
  description: string;
}

interface ReportDetailsProps {
  report: Report;
}

export default function ReportDetails({ report }: ReportDetailsProps) {
  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Report Summary</h2>
      <p>
        <strong>Summary Number:</strong> {report.summaryNumber}
      </p>
      <p>
        <strong>Title:</strong> {report.title}
      </p>
      <p>
        <strong>Description:</strong> {report.description}
      </p>
    </div>
  );
}
