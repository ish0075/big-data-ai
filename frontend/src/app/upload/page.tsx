'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setStatus('Uploading...');
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    setStatus(res.ok ? 'Upload successful' : 'Upload failed');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload CSV</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-dashed border-2 rounded p-4 text-center"
        >
          {file ? file.name : 'Drag & drop CSV here or click to select'}
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Upload
        </button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
}
