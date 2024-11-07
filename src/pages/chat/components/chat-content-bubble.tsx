import Markdown from 'react-markdown';

interface ChatContentBubbleProps {
	type: string;
	message: string;
}

export default function ChatContentBubble({ type, message }: ChatContentBubbleProps) {
	return (
		<Markdown className={` p-4 rounded-md border-2 border-black select-text text-wrap whitespace-pre-wrap
		 	${type === 'user' ? 'w-fit rounded-br-none bg-black text-white' : 'w-full rounded-bl-none bg-white'}`}>
			{message}
		</Markdown>
	)
}