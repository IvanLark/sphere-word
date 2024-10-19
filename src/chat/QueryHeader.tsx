import { ArrowBack, Close, HomeOutlined, SearchOutlined } from '@mui/icons-material';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
interface ChatHeaderProps {
	word: string;
}
export default function QueryHeader({ word }: ChatHeaderProps) {
	const navigate = useNavigate();

	const [seatchText, setSearchText] = useState('');
	const [searchInputBoxOpen, setSearchInputBoxOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	let blurInputBoxCloseTimer: NodeJS.Timeout | null = null;
	function search() {
		// td to implement search logic
	}
	function handleSearchButtonClick() {
		if (!searchInputBoxOpen) { setSearchInputBoxOpen(true); inputRef.current?.focus(); }
		else if (seatchText.length === 0) setSearchInputBoxOpen(false);
		else {
			search();
		}
	}
	return (
		<>
			<div className="w-full h-16 p-2 fixed bg-transparent flex gap-2 overflow-hidden">
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black flex items-center justify-center group" onClick={handleSearchButtonClick}>{searchInputBoxOpen && seatchText.length === 0 ? <Close style={{ fontSize: "40px" }} /> : <SearchOutlined style={{ fontSize: "40px" }} />}</button>
				<div className="flex-1 text-3xl flex items-center">
					<input ref={inputRef} type="text" placeholder="搜索单词..." className={`h-full border-black rounded-md duration-300 ${searchInputBoxOpen ? 'w-full px-2 border-2' : 'w-0'}`} style={{ transitionProperty: 'width,padding ', }} value={seatchText}
						onChange={(e) => setSearchText(e.target.value)}
						onBlur={() => setSearchInputBoxOpen(false)}
						onFocus={() => { inputRef.current?.select(); }}
						onKeyDown={(event) => { if (event.key === 'Enter') { search(); } }} />
					<span className="flex-1  text-center overflow-hidden">
						{word}
					</span>
				</div>
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black flex items-center justify-center group" onClick={() => navigate('/home')}><HomeOutlined style={{ fontSize: "40px" }} /></button>
			</div>
			<div className="w-full h-16"></div>
		</>

	)
}