import HomeNaviTabComponent, { HomeNaviTabProps } from './components/home-navi-tab.component.tsx';

export default function HomePage() {

	const tabs: HomeNaviTabProps[] = [
		{ title: '单词查询', icon: '🧐', path: '/query' },
		{ title: 'AI对话', icon: '🤗', path: '/chat' },
		{ title: '单词复习', icon: '🤓', path: '/review' }
	]

	return (
		<div className="w-screen h-screen relative">
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
			 flex flex-col items-center gap-4">
				{/* TODO 加个菜单标题 */}
				{
					tabs.map((tab, index) =>
						<HomeNaviTabComponent key={index} {...tab} />
					)
				}
			</div>
		</div>
	);
}