import { Add, ArrowForward, Close, HomeOutlined, Remove, SearchOutlined } from '@mui/icons-material';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../constants.ts";
import { toast } from "../utils/toast.tsx";
import {Result} from "../types.ts";

interface ChatHeaderProps {
	word: string;
	handleSkipWord: (newWord: string) => void;
}

export default function QueryHeader({ word, handleSkipWord }: ChatHeaderProps) {
	const navigate = useNavigate();

	interface SearchData {
		searchText: string;
		searchInputBoxOpen: boolean;
		autoCompleteList: string[];
	}
	const initSearchData = {
		searchText: '',
		searchInputBoxOpen: false,
		autoCompleteList: []
	};
	const [searchData, setSearchData] = useState<SearchData>(initSearchData);
	function closeSearch () { setSearchData(initSearchData); }
	function openSearch () { setSearchData({ ...initSearchData, searchInputBoxOpen: true }); }
	function updateSearchText(text: string) {
		setSearchData(prev => ({ ...prev, searchText: text }));
	}
	function updateAutoCompleteList(wordList: string[]) {
		setSearchData(prev => ({ ...prev, autoCompleteList: wordList }));
	}

	// 输入框
	const inputRef = useRef<HTMLInputElement>(null);

	const client = axios.create({
		baseURL: BASE_URL,
		headers: {
			'Content-Type': 'application/json'
		}
	})

	// 点击搜索按钮事件
	function handleSearchButtonClick() {
		// 未打开则打开并聚焦
		if (!searchData.searchInputBoxOpen) { openSearch(); inputRef.current?.focus(); }
		// 已打开未输入则关闭
		else if (searchData.searchText.length === 0) { closeSearch(); }
		// 已打开已输入则搜索
		else {
			client.get(`/search/check/${searchData.searchText}`).then(() => {
				handleSkipWord(searchData.searchText);
			}).catch(() => {
				toast.error('不好意思，词库里没有这个词');
			}).finally(() => { closeSearch(); });
		}
	}

	// 输入变化事件
	function handleSearchInputChange(content: string) {
		updateSearchText(content.trim());
		// 实现 auto complete
		if (content.length !== 0) {
			client.get<Result<Array<string>>>(`/search/auto_complete/${content.trim()}`)
				.then(response => {
					updateAutoCompleteList(response.data.data);
				})
		} else {
			updateAutoCompleteList([]);
		}
	}

	return (
		<>
			<div className={`w-full  p-2 fixed z-10 bg-transparent flex gap-2 overflow-hidden ${searchData.searchInputBoxOpen ? '' : 'h-16'}`}>
				{/* 搜索按钮 */}
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black
													 flex items-center justify-center group"
					onClick={handleSearchButtonClick}>
					{
						searchData.searchInputBoxOpen && searchData.searchText.length === 0 ?
							<Close style={{ fontSize: "2.5rem" }} /> : <SearchOutlined style={{ fontSize: "2.5rem" }} />
					}
				</button>
				{/* 搜索框 */}
				<div className="flex-1 text-3xl flex items-start bg-white">
					<div className={`border-black rounded-md shadow-md overflow-hidden duration-300 ${searchData.searchInputBoxOpen ? 'w-full px-2 border-2' : 'w-0'}`}
							 style={{ transitionProperty: 'width,padding ' }}>
						<input ref={inputRef} type="text" placeholder="搜索单词..." className={`w-full h-full bg-transparent outline-none`} value={searchData.searchText}
							onChange={(e) => { handleSearchInputChange(e.target.value); }}
							onBlur={() => { if (searchData.searchInputBoxOpen) setTimeout(() => closeSearch(), 200); }}
							onFocus={() => { inputRef.current?.select(); }}
							onKeyDown={(event) => { if (event.key === 'Enter') { handleSearchButtonClick(); } }}
						/>
						{/* auto complete */}
						{
							searchData.searchInputBoxOpen && searchData.autoCompleteList.map((completedWord, index) =>
								<div className={`btn-white w-full p-2 border-t-2 border-black flex ${index === 0 ? 'border-x-' : ''}`}
										 onClick={() => {
											 handleSkipWord(completedWord);
											 closeSearch();
										 }}
										 key={index}>
									<span className='flex-1'>{completedWord}</span>
									<ArrowForward fontSize='large' />
								</div>
							)
						}
					</div>
					{/* 当前选中单词 */}
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
			{/* 三个按钮 */}
			<div className="w-full h-16"></div>
			<div className="fixed bottom-[400px] left-2 z-10">
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black text-2xl font-bold"
								onClick={() => navigate('/chat', { state: { objectsType: '单词', objects: [word] } })}>
					AI
				</button>
			</div>
			<div className="fixed bottom-[400px] right-2 z-10 flex flex-col gap-2">
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black text-2xl font-bold"
								onClick={() => {/** td to implement */ }}>
					<Add style={{ fontSize: '3rem' }} />
				</button>
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black text-2xl font-bold"
								onClick={() => {/** td to implement */ }}>
					<Remove style={{ fontSize: '3rem' }} />
				</button>
			</div>
		</>
	);
}