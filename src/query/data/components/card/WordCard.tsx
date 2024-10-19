import { Mic, Star, StarOutline } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import SkeletonBuilder from '../loader/SkeletonBuilder.tsx';
import { WordCore } from "../../../types.ts";

interface WordCardProps {
	word: string;
	data: WordCore | undefined;
	isCollected: boolean;
	isLoading: boolean;
}

export function WordCard({ word, data, isCollected, isLoading }: WordCardProps) {
	return (
		<div className="bg-white p-4 flex-1 flex flex-col gap2 snap-end">
			<div className="flex items-center text-nowrap">
				<span className={`font-bold flex-1 shrink ${word.length > 10 ? 'text-4xl' : 'text-6xl'}`}>{word}</span>
				<button
					className={`
						btn-trans btn-scale px-3 py-1 m-2 text-lg rounded-full
						border-2 border-black transition-all duration-300
						${isCollected ? 'bg-black text-white hover:bg-gray-800' : ''}
					`}
					onClick={() => {/* TODO */ }}>
					{
						isCollected ?
							<Star style={{ width: '25px', height: '25px' }} /> :
							<StarOutline style={{ width: '25px', height: '25px' }} />
					}
					收藏
				</button>
			</div>
			<SkeletonBuilder loading={isLoading}>
				{/* 发音 */}
				<div className="flex items-center gap-2	">
					<PronBuilder title="英" pron={data?.pron.ukPron}
						onClick={() => { new Audio(`http://dict.youdao.com/dictvoice?type=1&audio=${word}`).play(); }}
					/>
					<PronBuilder title="美" pron={data?.pron.usPron}
						onClick={() => { new Audio(`http://dict.youdao.com/dictvoice?type=0&audio=${word}`).play(); }}
					/>
				</div>
				{/* 意思 */}
				<span className="font-bold">{data?.simpleMeaning}</span>
				{/* 标签 */}
				{/* <span className="ml-3 text-lg ">【{tags.basic.slice(0, 3).join(', ')}】</span> */}
				<div className="mt-2 flex gap-2 text-black">
					{data?.tags.basic.slice(0, 3).map((tag, index) =>
						<span key={index} className="px-2 text-lg font-bold rounded-md border-2 border-black">
							{tag}
						</span>
					)}
				</div>
				{/* 变形 */}
				<div className="mt-2 flex flex-wrap gap-2 text-sm">
					{data && Object.entries(data?.exchange)
						.map(([key, value]) => key + value)
						.join(' | ')
					}
				</div>
			</SkeletonBuilder>
		</div>
	);
}

interface PronBuilderProps {
	title: string;
	pron?: string;
	onClick: () => void;
}

// !!包装了一下这个以便map和拓展
function PronBuilder({ title, pron, onClick }: PronBuilderProps) {
	return <div className=" text-lg font-bold text-nowrap">{`${title} [${pron}]`}
		<Tooltip title='点击播放发音' arrow>
			{/* // td @IvanLark 这里MUI内暂时找不到合适的Icon你看看自己加个svg或者就用这个得了 */}
			{/* //@ts-expect-error no title*/}
			<button className='btn-scale-xl size-12' onClick={onClick}>
				<Mic style={{ width: '35px', height: '35px' }} />
			</button>
		</Tooltip>
	</div>;
}