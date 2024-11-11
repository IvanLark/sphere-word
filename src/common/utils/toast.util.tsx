import { useState } from 'react';
import { Info, Warning } from '@mui/icons-material';
import Error from '@mui/icons-material/Error';

export let toast: {
	info: (content: string) => void,
	error: (content: string) => void,
	warning: (content: string) => void
}

export default function ToastContainer() {
	type ToastMsg = { icon: JSX.Element, content: string };
	const [toastMsgs, setToastMsgs] = useState<ToastMsg[]>([]);

	const TOAST_TIMEOUT = 2000;

	function addToastMsg(msg: ToastMsg) {
		setToastMsgs(prev => {
			// 删掉队列第一个
			setTimeout(() => { setToastMsgs(prev => prev.slice(1)) }, TOAST_TIMEOUT)
			// 更新
			return [...prev, msg];
		});
	}

	toast = {
		info: (content: string) =>
			addToastMsg({ icon: <Info color='info'/>, content: content } as ToastMsg),
		error: (content: string) =>
			addToastMsg({ icon: <Error color='error'/>, content: content } as ToastMsg),
		warning: (content: string) =>
			addToastMsg({ icon: <Warning color='warning'/>, content: content } as ToastMsg)
	};

	return (
		<div className="w-full bottom-8 fixed flex gap-2 items-center flex-col-reverse z-50">
			{
				toastMsgs.map((msg, index) =>
					<div key={index} className="w-fit px-2 py-1 rounded-md bg-white shadow-lg text-2xl">
						{msg.icon}
						<span className="">{msg.content}</span>
					</div>
				)
			}
		</div>
	);
}