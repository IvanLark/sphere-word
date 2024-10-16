import { Mic, Star, StarOutline } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import * as React from 'react';
type WordChangeTypes = '复数' | '现在分词' | '第三人称单数' | '过去分词' | '过去式'
interface WordProps {
	word: string;
	pron: { ukPron: string, usPron: string }
	meanings: string;
	// td to implement
	tags: { basic: string[] };
	exchange: { [key in WordChangeTypes]: string }

	favourite: boolean;
}
export function Word({ word, pron, meanings, tags, exchange, favourite: not }: WordProps) {
	// td for test, to delete
	const [favourite, setFavourite] = React.useState(false);
	return (
		<div className="bg-white p-4 flex-1 flex flex-col gap2 snap-end">
			<div className="flex items-center">
				<span className="text-6xl font-bold flex-1 font-sans">{word}</span>
				<button className={`btn-trans btn-scale px-3 py-1 m-2 text-lg rounded-full border-2 border-black transition-all duration-300 ${favourite ? 'bg-black text-white hover:bg-gray-800' : ''}`} onClick={() => setFavourite(!favourite)}>{favourite ? <Star style={{ width: '25px', height: '25px' }} /> : <StarOutline style={{ width: '25px', height: '25px' }} />}收藏</button>
			</div>
			<div className="flex items-center gap-8 mt- ml-">
				<WordPronTabBuilder title="英" pron={pron.ukPron} onClick={() => {/** //td to implement */ }} />
				<WordPronTabBuilder title="美" pron={pron.usPron} onClick={() => {/** //td to implement */ }} />
			</div>
			<span className="font-bold">{meanings}</span>
			{/* <span className="ml-3 text-lg ">【{tags.basic.slice(0, 3).join(', ')}】</span> */}
			<div className="mt-2 flex gap-2 text-black">
				{tags.basic.slice(0, 3).map((tag, index) => <span key={index} className="px-2 text-lg font-bold rounded-md border-2 border-black">{tag}</span>)}
			</div>
			<div className="mt-2 flex flex-wrap gap-2 text-sm">
				{Object.entries(exchange).map(([key, value]) => key + value).join(' | ')}
			</div>
		</div>

	)
}
// !!包装了一下这个以便map和拓展
function WordPronTabBuilder({ title, pron, onClick }: { title: string, pron: string, onClick: () => void }) {
	return <span className=" text-lg font-bold">{`${title} [${pron}]`}
		<Tooltip title='点击播放发音' arrow >
			{/* // td @IvanLark 这里MUI内暂时找不到合适的Icon你看看自己加个svg或者就用这个得了 */}
			<button className='btn-scale-xl size-12' onClick={onClick}><Mic style={{ width: '35px', height: '35px' }} /></button>
		</Tooltip>
	</span>

}