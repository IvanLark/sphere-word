import HomeNaviTab, { HomeNaviTabProps } from './HomeNaviTab';
export default function Home() {
	const tabs: HomeNaviTabProps[] = [
		{ title: '单词查询', icon: '🧐', path: '/query' },
		{ title: 'AI对话', icon: '🤗', path: '/chat' },
		{ title: '登录注册', icon: '🤗', path: '/Login' },
		{ title: '单词复习', icon: '🤗', path: '/Review' },
		{ title: '来阅读呀', icon: '😚', path: '/home', disabled: true },
		{ title: '听力练习', icon: '👂', path: '/home', disabled: true },
		{ title: '口语练习', icon: '🗣', path: '/home', disabled: true },
		{ title: '用户中心', icon: '🧑', path: '/home', disabled: true },
	]
	return (
		<div className="w-screen h-screen relative">
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
			 flex flex-col items-center gap-4">
				{tabs.map((tab, index) => <HomeNaviTab key={index} {...tab} />)}
			</div>
		</div>
	);
}