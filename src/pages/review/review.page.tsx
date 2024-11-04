import { Menu, Mic } from "@mui/icons-material";
import Header from "../../common/components/header.component.tsx";
import {useState} from "react";

const wordMemorySituation: { title: string, color: string, onclick: () => void }[] = [
	// TODO to implement navigate
	{ title: '轻松', color: '#E0F9B5', onclick: () => { } },
	{ title: '还行', color: '#A5DEE5', onclick: () => { } },
	{ title: '困难', color: '#FCE38A', onclick: () => { } },
	{ title: '忘记', color: '#FF8383', onclick: () => { } },
]

export default function Review() {
	const [loading, setLoading] = useState(true);
	const [curWord, setCurWord] = useState('');
	const [reviewWords, setReviewWords] = useState<Array<string>>([]);
	const [remainingWordsWinOpen, setRemainingWordsWinOpen] = useState(false);

	function handleWordClick(word: string) {
		setCurWord(word)
		// TODO to implement
	}

	return (
		loading ? <></> :
		<>
			{/* 顶部 */}
			<Header leadingBtn={
				<button title="剩余单词" className="btn-trans size-16 rounded-md border-r-2 border-black group" onClick={() => { setRemainingWordsWinOpen(!remainingWordsWinOpen) }}
				><Menu style={{ fontSize: "2.5rem" }} /></button>
			} middleElement={`还剩${reviewWords.length}个单词`}
			/>
			<div className="w-full h-[calc(100vh-4rem)] flex flex-col">
				<div className="flex flex-1 flex-col gap-4 items-center justify-center">
					<h2 className="text-7xl font-bold">{curWord}</h2>
					{/* // TODO 这里text不敢防太大，具体你那边看看效果再自己调调 */}
					<div className="flex gap-4">
						<button className="btn-scale btn-trans px-8 py-1 text-lg text-center rounded-xl border-2 border-black">英<Mic /></button>
						<button className="btn-scale btn-trans px-8 py-1 text-lg text-center rounded-xl border-2 border-black">美<Mic /></button>
					</div>
				</div>
				<div className="w-fit h-44 p-4 mx-auto grid grid-cols-2 grid-rows-2 gap-5 place-items-center ">
					{wordMemorySituation.map((situation, index) => <button key={index} className={`btn-scale btn-common-hover w-fit px-12 py-2 text-2xl text-nowrap rounded-lg bg-[${situation.color}`} style={{ backgroundColor: situation.color }} onClick={situation.onclick} >{situation.title}</button>)}
				</div>
			</div>
			<RemainingWordsWin remainingWordsWinOpen={remainingWordsWinOpen} remainingWords={reviewWords} handleWordClick={handleWordClick} onClose={() => { setRemainingWordsWinOpen(false) }} />
		</>
	)
}
function RemainingWordsWin({ remainingWordsWinOpen, remainingWords, handleWordClick, onClose }: { remainingWordsWinOpen: boolean, remainingWords: string[], handleWordClick: (word: string) => void, onClose: () => void }) {
	return (
		<div className={`w-full max-h-[calc(100vh-4rem)] p-5 overflow-y-scroll fixed z-10 bottom-0 bg-white flex flex-col items-center transition-all duration-300 ${remainingWordsWinOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={onClose}>
			<h2 className="w-full text-xl font-bold text-center mb-2">剩余单词</h2>
			{remainingWords.map((word, index) => <button key={index} className="btn-scale btn-trans w-full py-4 text-center rounded-lg" onClick={() => { handleWordClick(word) }}>{word}</button>)}
		</div>
	)
}