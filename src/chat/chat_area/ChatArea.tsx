import ChatContentBubble from './ChatContentBub';
import { ChatMessage } from "../types.ts";

export default function ChatArea({ messages }: { messages: Array<ChatMessage> }) {
	return (
		<div className="max-h-[calc(100vh-140px)] p-4 flex flex-col items-end gap-4">
			{
				messages.map((message, index) =>
					<ChatContentBubble key={index} type={message.role} message={message.content} />
				)
			}
		</div>
	)
}