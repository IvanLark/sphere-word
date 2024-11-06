import React from "react";

interface InputProps {
  label: string;
  type: 'text' | 'number' | 'password';
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, type, required, value, onChange }: InputProps) {
  return (
    <div className="w-full pr-2 flex items-center rounded-md border-2 border-black">
      {/* label */}
      <div className="w-20 py-2 h-full text-center text-lg border-r-2 border-black">
        {label}
      </div>
      {/* input */}
      <input title={label} type={type} required={required} value={value} onChange={onChange}
             className=" flex-1 pl-2 text-lg rounded-md" />
    </div>
  );
}