import { KeyboardArrowRight } from '@mui/icons-material';
import { Skeleton } from '@mui/material';

interface DataCardProps {
	title?: string;
	showMoreButton?: boolean;
	isLoading?: boolean;
	children: JSX.Element|JSX.Element[];
	className?: string;
}

export default function DataCard({title, showMoreButton = false, isLoading = false, children, className }: DataCardProps) {
	return (
		isLoading ?
		<Skeleton variant='rectangular' animation='wave' height={200} /> :
		<div className={`bg-white rounded-md p-2 pb-2.5 border-2 border-black ${className ? className : ''}`}>
			{/* 顶部 */}
			{ title &&
				<div className="w-full h-full py-0.5 flex items-center">
					{/* 标题 */}
					<div className="flex-1">
						{<h2 className="text-[18px] font-bold">{title}</h2>}
					</div>
					{/* 更多 */}
					{
						showMoreButton &&
						<button className="h-full px-4 ">
							更多
							<KeyboardArrowRight style={{width: '28px', height: '28px'}}/>
						</button>
					}
				</div>
			}
			{/* 内容 */}
			{children}
		</div>
	)
}