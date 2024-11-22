import { useNavigate } from 'react-router-dom';
import { toast } from '../../../common/utils/toast.util.tsx';

export type HomeNaviTabProps = {
	title: string;
	icon: string;
	onClick: () => void;
	disabled?: boolean;
}

export default function HomeNaviTab({ title, icon, onClick, disabled }: HomeNaviTabProps) {
	return (
		<button className="btn-scale btn-white w-64 p-2 rounded-xl border-2 border-black relative text-3xl font-bold"
			onClick={() => { if (disabled) { toast.error('暂不支持该功能！'); return; } onClick(); }}>
			<span className="relative mr-10">{title}</span>
			<span className="absolute right-4 text-4xl">{icon}</span>
		</button>
	)
}