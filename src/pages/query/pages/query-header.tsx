import { ArrowForward, Close, SearchOutlined } from '@mui/icons-material';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "../../../common/utils/toast.util.tsx";
import { checkWordExisted, getCnAutoComplete, getWordAutoComplete } from "../../../api/methods/word-search.methods.ts";
import isPureEn from "../../../common/utils/is-pure-en.util.ts";
import isPureCn from "../../../common/utils/is-pure-cn.util.ts";

interface ChatHeaderProps {
	word: string;
	handleSkipWord: (newWord: string, relationType: string, relationLabel?: string) => void;
	leftBtnIcon: React.ReactNode;
	leftBtnOnClick: () => void;
}

export default function QueryHeader({ word, handleSkipWord, leftBtnOnClick, leftBtnIcon }: ChatHeaderProps) {
	const navigate = useNavigate();

	// 数据模型
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

	// 数据操作
	function closeSearch() {
		setSearchData(initSearchData);
	}
	function openSearch() {
		setSearchData({ ...initSearchData, searchInputBoxOpen: true });
	}
	function updateSearchText(text: string) {
		setSearchData(prev => ({ ...prev, searchText: text }));
	}
	function updateAutoCompleteList(wordList: string[]) {
		setSearchData(prev => ({ ...prev, autoCompleteList: wordList }));
	}

	// 输入框
	const inputRef = useRef<HTMLInputElement>(null);

	// 点击搜索按钮事件
	function handleSearchButtonClick() {
		// 未打开则打开并聚焦
		if (!searchData.searchInputBoxOpen) { openSearch(); inputRef.current?.focus(); }
		// 已打开未输入则关闭
		else if (searchData.searchText.length === 0) { closeSearch(); }
		// 已打开已输入则搜索
		else {
			if (isPureEn(searchData.searchText)) {
				checkWordExisted(searchData.searchText).then(() => {
					handleSkipWord(searchData.searchText, '查询', '查询');
				}).catch(() => {
					toast.error('不好意思，词库里没有这个词');
				}).finally(() => { closeSearch(); });
			} else if (isPureCn(searchData.searchText)) {
				getCnAutoComplete(searchData.searchText).then(response => {
					updateAutoCompleteList(response);
				})
			} else {
				toast.error('只能输入纯英文或纯中文');
			}
		}
	}

	// 输入变化事件
	function handleSearchInputChange(content: string) {
		updateSearchText(content.trim());
		// 实现 auto complete
		if (content.length !== 0) {
			getWordAutoComplete(content.trim()).then(response => {
				updateAutoCompleteList(response);
			})
		} else {
			updateAutoCompleteList([]);
		}
	}

	return (
		<>
			<div className={`w-full  p-2 fixed z-10 bg-white flex gap-2 overflow-hidden
											${searchData.searchInputBoxOpen ? '' : 'h-16'}`}>
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
					<div className={`border-black rounded-md shadow-md overflow-hidden duration-300
													${searchData.searchInputBoxOpen ? 'w-full px-2 border-2' : 'w-0'}`}
						style={{ transitionProperty: 'width,padding ' }}>
						<input ref={inputRef} type="text" placeholder="搜索单词..."
							className={`w-full h-full bg-transparent outline-none`}
							value={searchData.searchText}
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
										handleSkipWord(completedWord, '查询', '查询');
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
					{/* //!阴阳差错实现了，这里如果加了动画进出曲线不同会导致Home按钮抽搐，不用动画用回flex-1就可极大缓解 */}
					<span className={`h-full flex text-center items-center justify-center overflow-hidden ${word.length > 14 ? 'text-2xl' : ''}
								${searchData.searchInputBoxOpen ? 'w-0' : 'border-black border-2 rounded-md w-[calc(100vw-7.5rem)] '}`}>
						{word}
					</span>
				</div>
				{/* 菜单按钮 */}
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black
													 flex items-center justify-center group"
					onClick={leftBtnOnClick}>
					{leftBtnIcon}
				</button>
			</div>
			{/* 三个按钮 */}
			{/* <div className="w-full h-16"></div> */}
			<div className="fixed top-[65px] left-2 z-10">
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black text-2xl font-bold"
					onClick={() => navigate('/chat', { state: { objectsType: '单词', objects: [word] } })}>
					AI
				</button>
			</div>
			{/*<div className="fixed bottom-[400px] right-2 z-10 flex flex-col gap-2">
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black text-2xl font-bold"
								onClick={() => {}}>
					<Add style={{ fontSize: '3rem' }} />
				</button>
				<button className="btn-scale btn-white size-12 rounded-md border-2 border-black text-2xl font-bold"
								onClick={() => {}}>
					<Remove style={{ fontSize: '3rem' }} />
				</button>
			</div>*/}
		</>
	);
}