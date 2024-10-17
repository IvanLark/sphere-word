import { toast as react_toast } from 'react-toastify';

export function toast(content: string, type: 'info' | 'error' | 'warning' = 'info') {
	switch (type) {
		case 'info':
			react_toast.info(content, { position: "top-center", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, style: { width: 'fit-content' } })
			// !pauseOnHover要手动设置false
			break;
		case 'error':
			react_toast.error(content, { position: "top-center", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, style: { width: 'fit-content' } })
			break;
		case 'warning':
			react_toast.warn(content, { position: "top-center", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, style: { width: 'fit-content' } })
			break;
	}
}