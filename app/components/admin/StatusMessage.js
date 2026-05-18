"use client";

export default function StatusMessage({ message, error }) {
  return (
    <>
      {message && (
        <div className="mb-4 p-3 bg-green-500/20 text-green-400 rounded-lg">{message}</div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg">{error}</div>
      )}
    </>
  );
}