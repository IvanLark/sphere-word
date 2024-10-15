import * as React from 'react';

interface AccordionProps {
	title: string;
	child: JSX.Element;
	titleClass: string;
	childClass: string;
}

export default function Accordion({ title, child, titleClass = "bg-teal-500 text-white", childClass = "bg-gray-100" }: AccordionProps) {
	// !对不起以为这个React.HtmlHTMLAttributes<HTMLDivElement>.className?是类型……
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<div className={`w-full rounded-3xl overflow-hidden ${childClass}`}
				 onClick={() => { if (!isOpen) setIsOpen(true) }}>
			<p className={`w-full p-4 pb-2 relative text-2xl font-bold rounded-3xl overflow-hidden ${titleClass} `}
				 onClick={() => setIsOpen(!isOpen)}>
				{title}
				<span className={`absolute right-8 text-3xl font-bold transition-transform ${isOpen ? '-rotate-90' : ''}`}>&lt;</span>
			</p>
			<div className={` px-4 p-4 text-ellipsis transition-all duration-300 ${isOpen ? 'max-h-screen' : ' max-h-28'}`}>{child}</div>
			{/* <child className={`text-ellipsis transition-all ${isOpen ? '' : 'max-h-6'} ${childClass}`} /> */}
			{/* //td @IvanLark 因为用了child无法使用text-ellipsis，所以擅自主张加了这种效果，看看如何 */}
			<div className={`w-full h-16 relative z-10 bg-gradient-to-t from-black to-transparent 
			transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-50'}`}>
				<span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>还有更多内容</span>
			</div>
		</div>
	)
}