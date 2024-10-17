import * as React from 'react';
export default function WordCard({ word, className, onClick }: { word: string, className?: string, onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void }) {
	// !注意不能取名class……
	return (
		<span className={`px-2 border-2 border-black rounded-full overflow-hidden shrink-0 ${className}`} onClick={onClick}>{word}</span>
	)
}