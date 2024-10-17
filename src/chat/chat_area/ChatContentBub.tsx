import * as React from 'react';
import Markdown from 'react-markdown';
interface ChatContentBubbleProps {
	type: 'user' | 'ai',
	message: string,
}
export default function ChatContentBubble({ type, message }: ChatContentBubbleProps) {
	return (
		<Markdown className={` p-4 rounded-md border-2 border-black select-text ${type === 'user' ? 'w-fit rounded-br-none bg-black text-white' : 'w-full rounded-bl-none bg-white'}`}>{message}</Markdown>
	)
}