import React from "react";

interface RadioProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Radio ({ label, value, onChange }: RadioProps) {
  return (
    <div className="w-fit h-12 flex items-center rounded-md border-2 border-black self-start">
      {/* label */}
      <div className="w-20 py-2 h-full text-center text-lg border-r-2 border-black">
        {label}
      </div>
      {/* input */}
      <div className=" h-12 relative flex items-center">
        <div
          className={`w-16 h-full bg-black pointer-events-none absolute top-0 transition-all duration-300 ${value ? 'left-16' : 'left-0'}`}></div>
        <span className={`w-16 h-full py-3 relative text-center ${value ? '' : 'text-white'}`}
              onClick={() => onChange(false)}>否</span>
        <span className={`w-16 h-full py-3 relative text-center ${value ? 'text-white' : ''}`}
              onClick={() => onChange(true)}>是</span>
      </div>
    </div>
  );
}