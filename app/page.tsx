"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to the Home Page</h2>
      <button
        onClick={() => router.push("/admin")}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Go to Admin Page
      </button>

      <button
        onClick={() => router.push("/verifyReport")}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Verify Report
      </button>
    </div>
  );
}
