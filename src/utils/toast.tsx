import * as React from 'react';
import { useState } from 'react';
import { Info, Warning } from '@mui/icons-material';
import Error from '@mui/icons-material/Error';
const TOAST_TIMEOUT = 2000;
export type ToastProps = { content: string, type: 'info' | 'error' | 'warning' };

export let toast: (content: string, type: 'info' | 'error' | 'warning') => void;
function ToastWin({ content, type = 'info' }: ToastProps) {
	return (
		<div className="w-fit px-2 py-1 rounded-md bg-white shadow-lg text-xl">
			{type === 'info' ? <Info color='info' /> : type === 'error' ? <Error color='error' /> : <Warning color='warning' />}
			<span className="">{content}</span>
		</div>
	)
}
export default function ToastContainer() {
	const [toastMsgs, setToastMsgs] = useState<ToastProps[]>([]);
	toast = (content: string, type: 'info' | 'error' | 'warning') => {
		const newMsg = { content, type };
		// setToastMsgs([...toastMsgs, newMsg]);
		// setTimeout(() => { setToastMsgs([...toastMsgs, newMsg].slice(1)) }, TOAST_TIMEOUT)
		// !出现了由于msg更新不及时导致的留存bug

		// ！！！函数式更新！！！快忘了你！！！
		setToastMsgs(prev => {
			setTimeout(() => { setToastMsgs(prev => prev.slice(1)) }, TOAST_TIMEOUT)
			return [...prev, newMsg];
		});
	};

	return (
		<div className="w-full bottom-4 fixed flex gap-2 items-center flex-col-reverse">
			{[toastMsgs.map((msg, index) => <ToastWin key={index} {...msg} />)]}
		</div>
	)
}