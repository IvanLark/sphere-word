import { Close, HomeOutlined, SearchOutlined } from '@mui/icons-material';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../constants.ts";
import { toast } from "../utils/toast.tsx";

interface ChatHeaderProps {
	word: string;
	handleSkipWord: (newWord: string) => void;
}

export default function QueryHeader({ word, handleSkipWord }: ChatHeaderProps) {
	const navigate = useNavigate();

	const [searchText, setSearchText] = useState('');
	const [searchInputBoxOpen, setSearchInputBoxOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	//let blurInputBoxCloseTimer: NodeJS.Timeout | null = null;

	function handleSearchButtonClick() {
		if (!searchInputBoxOpen) { setSearchInputBoxOpen(true); inputRef.current?.focus(); }
		else if (searchText.length === 0) setSearchInputBoxOpen(false);
		else {
			const client = axios.create({
				baseURL: BASE_URL,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			setSearchText('');
			client.get(`/word/${searchText}/core`).then(() => {
				setSearchInputBoxOpen(false);
				handleSkipWord(searchText);
			}).catch(() => {
				toast('不好意思，词库里没有这个词', 'error');
			})
		}
	}
	return (
		<>
			<div className="w-full h-16 p-2 fixed bg-transparent flex gap-2 overflow-hidden">
				{/* 搜索按钮 */}
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black
													 flex items-center justify-center group"
					onClick={handleSearchButtonClick}>
					{
						searchInputBoxOpen && searchText.length === 0 ?
							<Close style={{ fontSize: "40px" }} /> : <SearchOutlined style={{ fontSize: "40px" }} />
					}
				</button>
				{/* 搜索框 */}
				<div className="flex-1 text-3xl flex items-center">
					<input ref={inputRef} type="text" placeholder="搜索单词..." className={`h-full border-black rounded-md duration-300 ${searchInputBoxOpen ? 'w-full px-2 border-2' : 'w-0'}`} style={{ transitionProperty: 'width,padding ', }} value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						onBlur={() => setSearchInputBoxOpen(false)}
						onFocus={() => { inputRef.current?.select(); }}
						onKeyDown={(event) => { if (event.key === 'Enter') { handleSearchButtonClick(); } }} />
					<span className="flex-1  text-center overflow-hidden">
						{word}
					</span>
				</div>
				{/* 菜单按钮 */}
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black
													 flex items-center justify-center group"
					onClick={() => navigate('/')}>
					<HomeOutlined style={{ fontSize: "40px" }} />
				</button>
			</div>
			<div className="w-full h-16"></div>
		</>
	);
}