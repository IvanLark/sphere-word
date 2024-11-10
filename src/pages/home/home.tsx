import HomeNaviTab, { HomeNaviTabProps } from './components/home-navi-tab.tsx';

export default function Home() {

	const tabs: HomeNaviTabProps[] = [
		{ title: '单词查询', icon: '🧐', path: '/query' },
		{ title: 'AI对话', icon: '🤗', path: '/chat' },
		{ title: '单词复习', icon: '🤓', path: '/review' },
		{ title: '错误页面', icon: '❌', path: '/error-test' },
		{ title: '测试页面', icon: '🥳', path: '/test' }
	]

	return (
		<div className="w-screen h-screen relative">
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
			 flex flex-col items-center gap-4">
				{/* TODO 加个菜单标题 */}
				{
					tabs.map((tab, index) =>
						<HomeNaviTab key={index} {...tab} />
					)
				}
			</div>
		</div>
	);
}