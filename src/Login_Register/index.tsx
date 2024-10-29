import { useState } from "react"
import Icon from "../assets/img/智臻.svg"
import Tabs from "../components/Tabs";
export type UserData = {
	'username': string,
	'password': string,
	'isBYR': boolean,
	'studentId': string,
	'studentName': string,
	'classId': string,
}
const defaultUserData: UserData = {
	'username': '',
	'password': '',
	'isBYR': false,
	'studentId': '',
	'studentName': '',
	'classId': '',
}

export default function LRScaffold() {
	const [loginPageIndex, setLoginPageIndex] = useState(0)
	const [userDatas, setUserDatas] = useState<UserData>(defaultUserData);
	function onSubmit(e) {
		e.preventDefault()
	}
	return (
		<div className="w-screen h-screen bg-white relative px-10 select-none">
			<div className="w-full max-w-[300px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<form action="" className="flex flex-col gap-5 items-center" onSubmit={onSubmit}>
					<h1 className="w-full text-center mb-10 text-4xl font-bold"><img src={Icon} alt="智臻" className="size-16 inline-block mr-2" />智臻</h1>
					<div className="w-full border-2 border-black rounded-md">
						<Tabs tabs={['注册', '登录']} tabIndex={loginPageIndex} setTabIndex={setLoginPageIndex} />
					</div>
					<Input label="用户名" type="text" required={true} value={userDatas.username} onChange={(e) => setUserDatas({ ...userDatas, username: e.target.value })} />
					<Input label="密码" type="password" required={true} value={userDatas.password} onChange={(e) => setUserDatas({ ...userDatas, password: e.target.value })} />
					{loginPageIndex === 0 && <>
						<div className="w-full flex items-center">
							{/* // TODO 麻了对checkbox不熟，你看看这里怎么改点击标签也能选中 */}
							<input title="isBYS" type="checkbox" className="size-6" checked={userDatas.isBYR} onChange={(e) => setUserDatas({ ...userDatas, isBYR: e.target.checked })} />
							<label htmlFor="isBYS">我是北邮人</label>
						</div>
						<div className={`w-full flex flex-col gap-5 items-center overflow-hidden transition-all duration-300 ${userDatas.isBYR ? 'h-56' : 'h-0'}`}>
							<Input label="姓名" type="text" required={true} value={userDatas.studentName} onChange={(e) => setUserDatas({ ...userDatas, studentName: e.target.value })} />
							<Input label="学号" type="text" required={true} value={userDatas.studentId} onChange={(e) => setUserDatas({ ...userDatas, studentId: e.target.value })} />
							<Input label="班级" type="text" required={true} value={userDatas.classId} onChange={(e) => setUserDatas({ ...userDatas, classId: e.target.value })} />
						</div>
					</>}
					<input type="submit" value="确认" className="btn-scale btn-black btn- px-20 py-2 mx-auto rounded-md" />
				</form>
			</div>
		</div>
	)
}
function Input({ label, type, required, value, onChange }: { label: string, type: 'text' | 'number' | 'password', required: boolean, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
	return (
		<div className="w-full pr-2 flex items-center rounded-md border-2 border-black">
			<div className="w-20 py-2 h-full text-center text-lg border-r-2 border-black">{label}</div>
			<input title={label} type={type} required={required} value={value} onChange={onChange} className=" flex-1 pl-2 text-lg rounded-md" />
			{/* onError={(e) => (e.target as HTMLInputElement).setCustomValidity('必填项不能为空')} */}
			{/* // !？？？这里为什么设置了一个py就会导致两个都有py了？ */}
		</div>
	)
}