import React from "react";

interface RadioProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  options: Record<string, number>;
}

export default function Radio({ label, value, onChange, options }: RadioProps) {

  return (
    <div className="w-fit h-10 flex items-center rounded-md border-2 border-black self-start">
      {/* label */}
      <div className="w-20 py-1 h-full text-center text-lg border-r-2 border-black">
        {label}
      </div>
      {/* input */}
      <div className=" h-full relative flex items-center">
        <div className={`w-20 h-full bg-black pointer-events-none absolute top-0 transition-all duration-300`} style={{ left: `${value * 5}rem` }}></div>
        {
          Object.entries(options).map(([optionName, optionValue], index) =>
            <span className={`w-20 h-full px-2 py-1 relative text-center ${optionValue === value ? 'text-white' : ''}`}
              onClick={() => onChange(optionValue)} key={index}>
              {optionName}
            </span>
          )
        }
      </div>
    </div>
  );
}