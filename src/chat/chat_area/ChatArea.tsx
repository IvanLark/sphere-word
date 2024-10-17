import * as React from 'react';
import ChatContentBubble from './ChatContentBub';
interface ChatAreaProps {
	chatContent: { ques: string, ans: string }[]
}
export default function ChatArea() {
	return (
		<div className="max-h-[100vh-192px] p-4 flex flex-col items-end gap-4">
			<ChatContentBubble type='user' message='make在生活中有哪些使用场景？' />
			<ChatContentBubble type='ai' message={`"Make" 这个单词在英语中是一个非常常用的动词，它有多种含义和使用场景，以下是一些常见的例子：
1. 制造或创造：
* "I'm making a cake."（我正在做蛋糕。）
* "They make cars in this factory."（这家工厂生产汽车。）

2. 迫使或导致：
* "The noise makes me nervous."（噪音让我感到紧张。）
* "The weather made us stay indoors."（天气让我们不得不待在室内。）

3. 成为或变成：
* "This will make you feel better."（这会让你感觉好一些。）
* "The experience made him a better person."（这段经历让他成为了一个更好的人。）

"Make" 的用法非常灵活，可以根据上下文变化出许多不同的含义。`} />
			<ChatContentBubble type='user' message='make在生活中有哪些使用场景？' />
			<ChatContentBubble type='ai' message={`"Make" 这个单词在英语中是一个非常常用的动词，它有多种含义和使用场景，以下是一些常见的例子：
1. 制造或创造：
* "I'm making a cake."（我正在做蛋糕。）
* "They make cars in this factory."（这家工厂生产汽车。）

2. 迫使或导致：
* "The noise makes me nervous."（噪音让我感到紧张。）
* "The weather made us stay indoors."（天气让我们不得不待在室内。）

3. 成为或变成：
* "This will make you feel better."（这会让你感觉好一些。）
* "The experience made him a better person."（这段经历让他成为了一个更好的人。）

"Make" 的用法非常灵活，可以根据上下文变化出许多不同的含义。`} />
			<ChatContentBubble type='user' message='make在生活中有哪些使用场景？' />
			<ChatContentBubble type='ai' message={`"Make" 这个单词在英语中是一个非常常用的动词，它有多种含义和使用场景，以下是一些常见的例子：
1. 制造或创造：
* "I'm making a cake."（我正在做蛋糕。）
* "They make cars in this factory."（这家工厂生产汽车。）

2. 迫使或导致：
* "The noise makes me nervous."（噪音让我感到紧张。）
* "The weather made us stay indoors."（天气让我们不得不待在室内。）

3. 成为或变成：
* "This will make you feel better."（这会让你感觉好一些。）
* "The experience made him a better person."（这段经历让他成为了一个更好的人。）

"Make" 的用法非常灵活，可以根据上下文变化出许多不同的含义。`} />
			<ChatContentBubble type='user' message='make在生活中有哪些使用场景？' />
			<ChatContentBubble type='ai' message={`"Make" 这个单词在英语中是一个非常常用的动词，它有多种含义和使用场景，以下是一些常见的例子：
1. 制造或创造：
* "I'm making a cake."（我正在做蛋糕。）
* "They make cars in this factory."（这家工厂生产汽车。）

2. 迫使或导致：
* "The noise makes me nervous."（噪音让我感到紧张。）
* "The weather made us stay indoors."（天气让我们不得不待在室内。）

3. 成为或变成：
* "This will make you feel better."（这会让你感觉好一些。）
* "The experience made him a better person."（这段经历让他成为了一个更好的人。）

"Make" 的用法非常灵活，可以根据上下文变化出许多不同的含义。`} />
		</div>
	)
}