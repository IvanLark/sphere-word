import Markdown from 'react-markdown';

interface ChatContentBubbleProps {
	type: string;
	message: string;
}

export default function ChatContentBubble({ type, message }: ChatContentBubbleProps) {
	return (
		<Markdown className={`
			px-2.5 py-1.5 rounded-md border-2 border-black leading-loose select-text text-wrap text-justify shadow-md
		 	${type === 'user' ? 'w-fit rounded-br-none bg-gray-700 text-white' : 'w-full rounded-bl-none bg-white'}`}>
			{message}
		</Markdown>
	)
}