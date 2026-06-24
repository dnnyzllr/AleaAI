'use client';

import { useRef } from 'react';

export default function UploadDropzone({
  onSelect,
  disabled = false,
}: {
  onSelect: (file: File) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) onSelect(file);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => {
        if (!disabled) inputRef.current?.click();
      }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[18px] border border-dashed border-white/[0.18] bg-white/[0.025] px-8 py-14 transition-colors hover:border-mint/40 hover:bg-mint/[0.025] ${disabled ? 'pointer-events-none opacity-50' : ''}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          if (disabled) return;
          const file = e.target.files?.[0];
          if (file) onSelect(file);
        }}
      />
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-white/[0.14] bg-white/[0.04]">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="text-mid"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <div className="text-center">
        <div className="mb-1 text-[15px] font-semibold">Drop a Kalshi screenshot</div>
        <div className="text-sm text-mid">PNG, JPG or WebP · any size</div>
      </div>
    </div>
  );
}
