import * as React from 'react';
export default function WordCard({ word, className }: { word: string, className?: string }) {
	// !注意不能取名class……
	return (
		<span className={`px-2 border-2 border-black rounded-full shrink-0 ${className}`}>{word}</span>
	)
}