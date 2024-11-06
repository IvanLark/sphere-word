import { useNavigate } from 'react-router-dom';
import { toast } from '../../../common/utils/toast.util.tsx';

export type HomeNaviTabProps = {
	title: string;
	icon: string;
	path: string;
	disabled?: boolean;
}

export default function HomeNaviTab({ title, icon, path, disabled }: HomeNaviTabProps) {
	const navigate = useNavigate();
	return (
		<button className="btn-scale btn-white w-80 p-4 rounded-xl border-2 border-black relative text-5xl font-bold"
						onClick={() => { if (disabled) { toast.error('暂不支持该功能！'); return; } navigate(path); }}>
			<span className="relative mr-10 -top-2">{title}</span>
			<span className="absolute right-4 bottom-2">{icon}</span>
		</button>
	)
}