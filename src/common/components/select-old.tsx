import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";

interface SelectProps <T> {
	label: string;
	options: Record<string, T>;
	onChange: (value: T) => void;
	className?: string;
	width?: number;
	labelWidth?: number;
}
export default function SelectOld <T> ({ label, options, onChange, className, width = 400, labelWidth = 100 }: SelectProps<T>) {

	const [index, setIndex] = useState(0);
	const [selectWinOpen, setSelectWinOpen] = useState(false);

	function SelectHeader({ label, value }: { label: string, value: string }) {
		return <div className={`w-full h-14 p-3 relative shrink-0 border-b-2 border-black`} onClick={() => setSelectWinOpen(!selectWinOpen)}>
			{value}
			{/* //!加不了旋转动画…… */}
			<span className={`absolute right-3 transition-transform duration-300 ${selectWinOpen ? "rotate-180" : "rotate-0"}`}>
				<ExpandMore className={`!size-8`} />
			</span>
		</div>
	}

	function SelectItems({ label, selected, border = true, onclick }: { label: string, selected: boolean, border?: boolean, onclick: () => void }) {
		return <div className={`w-full h-14 p-2 shrink-0 ${border && "border-b-2"} border-black transition-all duration-300 ${selected ? "bg-black text-white" : ""}`} onClick={onclick}>{label}</div>
	}

	return (
		<div className="relative">
			<div className={`h-14 relative rounded-md  border-2 border-black text-xl overflow-hidden transition-all duration-300 ${selectWinOpen ? 'rounded-tl-none' : 'rounded-l-none'} ${className}`}
					 style={{ width: width - labelWidth, height: selectWinOpen ? `${Object.keys(options).length * 3.5 + 3.5}rem` : '3.5rem', marginLeft: labelWidth }} >
				<SelectHeader label={label} value={Object.keys(options)[index]} />
				<div className="w-full h-14 flex flex-col">
					{Object.entries(options).map(([key, value], i) => <SelectItems label={key} selected={i === index} onclick={() => { setIndex(i); onChange(value); setSelectWinOpen(false); }} />)}
				</div>
			</div>
			<div className="h-14 p-3 -mr-3 rounded-md rounded-r-none border-2 border-r-0 border-black absolute top-0 left-0" style={{ width: labelWidth }}>{label}</div>
		</div>
	)
}