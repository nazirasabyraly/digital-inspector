import React, { useRef, useState } from "react";

interface UploadAreaProps {
  onFileChange: (file: File) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      onFileChange(e.target.files[0]);
    }
  };

  const handleChooseAnother = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-black/60 rounded-xl border border-white/10 flex flex-col items-center justify-center mt-8">
      <div
        className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-white/60 transition relative"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={handleClick}
      >
        {fileName ? (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center gap-3 mb-2 bg-black/60 border border-white/20 rounded-lg px-4 py-2 shadow-inner">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-indigo-400">
                <rect x="3" y="6" width="18" height="12" rx="3" fill="currentColor" />
                <rect x="7" y="10" width="10" height="4" rx="1" fill="#fff" />
              </svg>
              <span className="text-white font-mono text-lg truncate max-w-xs">{fileName}</span>
            </div>
            <button
              className="mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow hover:brightness-110 transition"
              onClick={handleChooseAnother}
              type="button"
            >
              Choose Another File
            </button>
          </div>
        ) : (
          <span className="text-white/70 font-mono">Drag & drop JPG, PNG, or PDF here</span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UploadArea;
