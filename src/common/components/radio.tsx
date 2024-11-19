import React from "react";

interface RadioProps <T> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Record<string, T>;
}

export default function Radio <T> ({ label, value, onChange, options }: RadioProps<T>) {

  return (
    <div className="w-fit h-12 flex items-center rounded-md border-2 border-black self-start">
      {/* label */}
      <div className="w-20 py-2 h-full text-center text-lg border-r-2 border-black">
        {label}
      </div>
      {/* input */}
      <div className=" h-12 relative flex items-center">
        {/* <div className={`w-16 h-full bg-black pointer-events-none absolute top-0 transition-all duration-300 ${value ? 'left-16' : 'left-0'}`}></div> */}
        {
          Object.entries(options).map(([optionName, optionValue], index) =>
            <span className={`w-20 h-full px-2 py-3 relative text-center ${optionValue === value ? 'text-white bg-black' : ''}`}
                  onClick={() => onChange(optionValue)} key={index}>
              {optionName}
            </span>
          )
        }
      </div>
    </div>
  );
}