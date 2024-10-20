import { Add, ArrowForward, Close, HomeOutlined, Remove, SearchOutlined } from '@mui/icons-material';
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

	const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

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
				toast.error('不好意思，词库里没有这个词');
			})
		}
	}
	function handleSearchInputChange(content: string) {
		setSearchText(content);

		// td to implement
		setAutoCompleteList([...content])
	}

	return (
		<>
			<div className={`w-full  p-2 fixed z-10 bg-transparent flex gap-2 overflow-hidden ${searchInputBoxOpen ? '' : 'h-16'}`}>
				{/* 搜索按钮 */}
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black
													 flex items-center justify-center group"
					onClick={handleSearchButtonClick}>
					{
						searchInputBoxOpen && searchText.length === 0 ?
							<Close style={{ fontSize: "2.5rem" }} /> : <SearchOutlined style={{ fontSize: "2.5rem" }} />
					}
				</button>
				{/* 搜索框 */}
				<div className="flex-1 text-3xl flex items-start bg-white">
					<div className={`border-black rounded-md shadow-md overflow-hidden duration-300 ${searchInputBoxOpen ? 'w-full px-2 border-2' : 'w-0'}`} style={{ transitionProperty: 'width,padding ', }}>
						<input ref={inputRef} type="text" placeholder="搜索单词..." className={`w-full h-full bg-transparent outline-none`} value={searchText}
							onChange={(e) => handleSearchInputChange(e.target.value)}
							onBlur={() => setSearchInputBoxOpen(false)}
							onFocus={() => { inputRef.current?.select(); }}
							onKeyDown={(event) => { if (event.key === 'Enter') { handleSearchButtonClick(); } }} />
						{(searchInputBoxOpen ? autoCompleteList : []).slice(0, 5).map((word, index) =>
							<div className={`btn-white w-full p-2 border-t-2 border-black flex ${index === 0 ? 'border-x-' : ''}`} onClick={() => {/** to implement */ }}>
								<span className='flex-1'>{word}</span>
								<ArrowForward fontSize='1rem' />
							</div>)}
					</div>
					<span className="h-fit flex-1  text-center overflow-hidden">
						{word}
					</span>
				</div>
				{/* 菜单按钮 */}
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black
													 flex items-center justify-center group"
					onClick={() => navigate('/')}>
					<HomeOutlined style={{ fontSize: "2.5rem" }} />
				</button>
			</div>
			<div className="w-full h-16"></div>
			<div className="fixed bottom-[400px] left-2 z-10">
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black text-2xl font-bold" onClick={() => navigate('/chat')}>AI</button>
			</div>
			<div className="fixed bottom-[400px] right-2 z-10 flex flex-col gap-2">
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black text-2xl font-bold" onClick={() => {/** td to implement */ }}><Add style={{ fontSize: '3rem' }} /></button>
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black text-2xl font-bold" onClick={() => {/** td to implement */ }}><Remove style={{ fontSize: '3rem' }} /></button>
			</div>
		</>
	);
}