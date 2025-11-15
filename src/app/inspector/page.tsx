"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BoundingBoxCanvas from "@/components/BoundingBoxCanvas";
import UploadArea from "@/components/UploadArea";

const mockResults = {
  signatures: [{ bbox: [60, 40, 320, 120] }],
  stamps: [{ bbox: [400, 60, 480, 140] }],
  qr_codes: [{ bbox: [500, 400, 580, 480] }],
};

export default function InspectorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [results, setResults] = useState<typeof mockResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({ signatures: true, stamps: true, qr_codes: true });

  const processedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results && processedRef.current) {
      processedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  const handleFileChange = (f: File) => {
    setFile(f);
    setImageUrl(URL.createObjectURL(f));
    setResults(null);
  };

  const runInspection = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1200);
  };

  const getBoxes = () => {
    if (!results) return [];
    const boxes: { bbox: [number, number, number, number]; label: string; color: string }[] = [];
    if (show.signatures)
      boxes.push(...results.signatures
        .filter(b => Array.isArray(b.bbox) && b.bbox.length === 4)
        .map(b => ({ bbox: [b.bbox[0], b.bbox[1], b.bbox[2], b.bbox[3]] as [number, number, number, number], label: "Signature", color: "#22c55e" })));
    if (show.stamps)
      boxes.push(...results.stamps
        .filter(b => Array.isArray(b.bbox) && b.bbox.length === 4)
        .map(b => ({ bbox: [b.bbox[0], b.bbox[1], b.bbox[2], b.bbox[3]] as [number, number, number, number], label: "Stamp/Seal", color: "#2563eb" })));
    if (show.qr_codes)
      boxes.push(...results.qr_codes
        .filter(b => Array.isArray(b.bbox) && b.bbox.length === 4)
        .map(b => ({ bbox: [b.bbox[0], b.bbox[1], b.bbox[2], b.bbox[3]] as [number, number, number, number], label: "QR Code", color: "#eab308" })));
    return boxes;
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans relative pb-12 overflow-x-hidden overflow-y-auto">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-32">
        <h1 className="text-3xl font-bold mb-2 tracking-wide">Document Processor</h1>
        <p className="text-white/60 mb-6">Upload a document and detect elements using YOLO</p>
        <div className="bg-black/70 border border-white/10 rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center">
          <UploadArea onFileChange={handleFileChange} />
          <button
            className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:brightness-110 transition"
            onClick={runInspection}
            disabled={!file || loading}
          >
            {loading ? "Processing..." : "Process Document"}
          </button>
          {results && (
            <div className="mt-4 w-full text-center bg-white/10 rounded-lg py-2 text-white font-medium">
              Detections found: {getBoxes().length}
            </div>
          )}
        </div>
        {results && (
          <div ref={processedRef} className="w-full max-w-2xl mt-8 bg-black/70 rounded-xl shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Processed Document</h2>
            <div className="mb-4 flex gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={show.signatures} onChange={e => setShow(s => ({ ...s, signatures: e.target.checked }))} />
                <span className="text-green-400">Signatures</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={show.stamps} onChange={e => setShow(s => ({ ...s, stamps: e.target.checked }))} />
                <span className="text-blue-400">Stamps/Seals</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={show.qr_codes} onChange={e => setShow(s => ({ ...s, qr_codes: e.target.checked }))} />
                <span className="text-yellow-400">QR Codes</span>
              </label>
            </div>
            {imageUrl && (
              <div className="w-full flex flex-col items-center mb-6">
                <div className="bg-black/80 border border-white/20 rounded-xl shadow-lg p-4 flex flex-col items-center w-full max-w-md">
                  <div className="flex items-center gap-3 mb-2">
                    <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="text-indigo-400">
                      <rect x="3" y="6" width="18" height="12" rx="3" fill="currentColor" />
                      <rect x="7" y="10" width="10" height="4" rx="1" fill="#fff" />
                    </svg>
                    <span className="text-white font-mono text-lg truncate max-w-xs">Preview</span>
                  </div>
                  <div className="w-full h-48 bg-gradient-to-br from-black via-gray-900 to-indigo-900 rounded-lg flex items-center justify-center">
                    <span className="text-white/40 font-mono text-xl">{file?.name || "No file selected"}</span>
                  </div>
                </div>
              </div>
            )}
            {imageUrl && <BoundingBoxCanvas imageUrl={imageUrl} boxes={getBoxes()} />}
            <button className="mt-6 w-full py-3 rounded-lg bg-green-600 text-white font-bold text-lg shadow-lg hover:brightness-110 transition">
              Download Processed Image
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
