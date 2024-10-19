import ChatContentBubble from './ChatContentBub';
import {ChatMessage} from "../types.ts";

export default function ChatArea({ messages }: { messages: Array<ChatMessage> }) {
	return (
		<div className="max-h-[100vh-192px] p-4 flex flex-col items-end gap-4">
			{
				messages.map((message) =>
					<ChatContentBubble type={message.role} message={message.content} />
				)
			}
		</div>
	)
}