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

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-black/60 rounded-xl border border-white/10 flex flex-col items-center justify-center mt-8">
      <div
        className="w-full h-40 flex items-center justify-center border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-white/60 transition"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={handleClick}
      >
        {fileName ? (
          <span className="text-white font-mono text-lg">{fileName}</span>
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
