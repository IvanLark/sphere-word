import React from "react";

interface InputProps {
  label: string;
  type: 'text' | 'number' | 'password';
  required: boolean;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Input({ label, type, required, value, placeholder, onChange }: InputProps) {
  return (
    <div className="w-full pr-2 flex items-center rounded-md border-2 border-black">
      {/* label */}
      <div className="w-20 py-1 h-full text-center text-lg border-r-2 border-black">
        {label}
      </div>
      {/* input */}
      <input title={label} type={type} required={required} value={value as string} onChange={(event) => onChange(event.target.value)}
        className=" flex-1 pl-2 text-lg rounded-md" placeholder={placeholder} />
    </div>
  );
}