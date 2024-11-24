import { Mic } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import SkeletonBuilder from '../loader/skeleton-builder.tsx';
import { WordCore } from "../../../api/types/word-data.types.ts";

interface WordCardProps {
	word: string;
	data: WordCore | undefined;
	button?: JSX.Element;
	isLoading?: boolean;
}

export function WordCard({ word, data, button, isLoading = false }: WordCardProps) {
	let ukPron = undefined;
	let usPron = undefined;
	if (data && data.pron && data.pron.ukPron) ukPron = data.pron.ukPron;
	if (data && data.pron && data.pron.usPron) usPron = data.pron.usPron;

	return (
		<div className="bg-white p-4 flex-1 flex flex-col gap2 snap-end">
			<div className="max-w-full flex items-center text-wrap">
				<span className={`font-bold flex-1 shrink 
					${word.length > 7 ? ( word.length > 9 ? 'text-3xl' : 'text-4xl' ) : 'text-5xl'}
				`}>
					{word}
				</span>
				{button}
			</div>
			<SkeletonBuilder loading={isLoading}>
				{/* 发音 */}
				<div className="flex flex-wrap items-center gap2">
					<PronItem title="英" pron={ukPron}
										onClick={() => {
											new Audio(`http://dict.youdao.com/dictvoice?type=1&audio=${word}`).play();
										}}
					/>
					<PronItem title="美" pron={usPron}
										onClick={() => {
											new Audio(`http://dict.youdao.com/dictvoice?type=0&audio=${word}`).play();
										}}
					/>
				</div>
				{/* 意思 */}
				{
					data && data?.simpleMeaning &&
					<span className="font-bold text-[21px] my-1.5">{data.simpleMeaning}</span>
				}
				{/* 标签 */}
				{/* <span className="ml-3 text-lg ">【{tags.basic.slice(0, 3).join(', ')}】</span> */}
				{
					data && data?.tags && data.tags?.basic &&
					<div className="mt-2 flex gap-2 text-black">
						{data.tags.basic.slice(0, 3).map((tag, index) =>
							<span key={index} className="px-2 text-[16px] font-bold rounded-md border-2 border-black">
								{tag}
							</span>
						)}
					</div>
				}
				{/* 变形 */}
				{
					data && data?.exchange &&
					<div className="mt-4 flex flex-wrap gap-2 text-[15px]">
						{Object.entries(data.exchange)
							.map(([key, value]) => key + ' ' + value)
							.join(' | ')
						}
					</div>
				}
			</SkeletonBuilder>
		</div>
	);
}

interface PronBuilderProps {
	title: string;
	pron?: string | undefined;
	onClick: () => void;
}

function PronItem({title, pron, onClick}: PronBuilderProps) {
	return <div className=" text-[15px] font-bold text-nowrap">{`${title}${pron ? ` [${pron}]` : ''}`}
		<Tooltip title='点击播放发音' arrow>
			{/* //@ts-expect-error no title*/}
			<button className='btn-scale-xl size-12' onClick={onClick}>
				<Mic style={{width: '30px', height: '30px'}}/>
			</button>
		</Tooltip>
	</div>;
}