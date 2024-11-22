import HomeNaviTab, { HomeNaviTabProps } from './components/home-navi-tab.tsx';
import { useNavigate } from "react-router-dom";
import Icon from "../../../public/智臻.svg";

export default function Home() {
	const navigate = useNavigate();

	const tabs: HomeNaviTabProps[] = [
		{ title: '单词查询', icon: '🧐', onClick: () => navigate('/query') },
		{ title: '来阅读呀', icon: '📖', onClick: () => navigate('/read') },
		{ title: 'AI对话', icon: '🤗', onClick: () => navigate('/chat') },
		{ title: '单词复习', icon: '🤓', onClick: () => navigate('/review') },
		{ title: '退出登录', icon: '😭', onClick: () => { localStorage.clear(); sessionStorage.clear(); navigate('/auth'); } },
		{ title: '联系作者', icon: '🤭', onClick: () => window.location.assign('https://bw4bdu09z49.feishu.cn/docx/ZQxMdLOy1oweE3xalXrc25nwnZO?from=from_copylink') },
	];

	return (
		<div className="w-screen h-screen relative">
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
			 flex flex-col items-center gap-4">
				<h1 className="w-full text-center mb-1 text-4xl font-bold">
					<img src={Icon} alt="智臻" className="size-16 inline-block mr-2" />
					智臻
				</h1>
				{
					tabs.map((tab, index) =>
						<HomeNaviTab key={index} {...tab} />
					)
				}
			</div>
		</div>
	);
}