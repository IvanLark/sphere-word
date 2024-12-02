
interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {value: string, label: string}[];
  spanClassName?: string;
  selectClassName?: string;
}

export default function Select ({label, value, onChange, options, spanClassName = '', selectClassName = ''}: SelectProps) {
  return (
    <div className="flex flex-row gap-0 active:scale-105">
      <span className={`py-2 px-1 border-y-2 border-l-2 border-black text-[16px] rounded-l-md flex items-center justify-center ${spanClassName}`}>{label}</span>
      <select
        className={`block pl-2 pr-6 py-2 text-[16px] border-2 border-black rounded-r-md ${selectClassName}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="cursor-pointer select-none relative"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}