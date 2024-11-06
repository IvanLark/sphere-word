import React, { useState } from "react";
import Icon from "../../../public/智臻.svg";
import ContinuousTabs from "../../common/components/tabs/continuous-tabs.tsx";
import Input from "../../common/components/input.tsx";
import {toast} from "../../common/utils/toast.util.tsx";
import {useNavigate} from "react-router-dom";
import {UserAuthData} from "../../api/types/auth.types.ts";
import {login, signup} from "../../api/methods/auth.methods.ts";

export default function Auth() {

	const initUserData: UserAuthData = {
		'username': '',
		'password': '',
		'againPassword': '',
		'isBYR': false,
		'studentId': '',
		'studentName': '',
		'classId': '',
	};

	const [userData, setUserData] = useState<UserAuthData>(initUserData);

	const navigate = useNavigate();

	function handleLogin () {
		login(userData).then(response => {
			localStorage.setItem('token', response);
			localStorage.setItem('tokenCreateTime', String(new Date().getTime()));
			toast.info('登录成功');
			navigate('/');
		}).catch(error => {
			toast.error(`登录失败: ${error.response.data.msg}`);
		}).finally(() => {
			setUserData(initUserData);
		});
	}

	function handleSignUp () {
		// 参数校验
		if (userData.password !== userData.againPassword) {
			toast.error('两次输入密码不同');
			return;
		}
		signup(userData).then(response => {
			localStorage.setItem('token', response);
			localStorage.setItem('tokenCreateTime', String(new Date().getTime()));
			toast.info('注册成功');
			navigate('/');
		}).catch((error: Error) => {
			toast.error(`注册失败: ${error.message}`);
		}).finally(() => {
			setUserData(initUserData);
		});
	}

	const pageTabs = {
		'登录': 'login',
		'注册': 'signup'
	};

	return (
		<div className="w-screen h-screen bg-white relative px-10 select-none">
			<div className="w-full max-w-[300px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<div className="flex flex-col gap-5 items-center">
					{/* 标题 */}
					<h1 className="w-full text-center mb-10 text-4xl font-bold">
						<img src={Icon} alt="智臻" className="size-16 inline-block mr-2" />
						智臻
					</h1>
					{/* 登录、注册页面 */}
					<ContinuousTabs tabs={pageTabs} isLoading={false}>
						{ (value) =>
							<form className="flex flex-col gap-4 items-center" action="" onSubmit={
								(e: React.FormEvent<HTMLFormElement>)=> {
									e.preventDefault();
									if (value === 'login') {
										handleLogin();
									} else if (value === 'signup') {
										handleSignUp();
									}
								}
							}>
								<Input label="用户名" type="text" required={true} value={userData.username}
											 onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
								<Input label="密码" type="password" required={true} value={userData.password}
											 onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
								{
									value === 'signup' &&
									<>
										<Input label="密码" type="password" required={true} value={userData.againPassword}
													 onChange={(e) => setUserData({ ...userData, againPassword: e.target.value })} />
										<div className="w-full flex items-center">
											{/* // TODO 麻了对checkbox不熟，你看看这里怎么改点击标签也能选中 */}
											<input title="isBYS" type="checkbox" className="size-6" checked={userData.isBYR}
														 onChange={(e) => setUserData({ ...userData, isBYR: e.target.checked })} />
											<label htmlFor="isBYS"> 我是北邮人 </label>
										</div>
										<div className={`w-full flex flex-col gap-5 items-center overflow-hidden transition-all duration-300 ${userData.isBYR ? 'h-40' : 'h-0'}`}>
											<Input label="姓名" type="text" required={true} value={userData.studentName}
														 onChange={(e) => setUserData({ ...userData, studentName: e.target.value })} />
											<Input label="学号" type="text" required={true} value={userData.studentId}
														 onChange={(e) => setUserData({ ...userData, studentId: e.target.value })} />
											<Input label="班级" type="text" required={true} value={userData.classId}
														 onChange={(e) => setUserData({ ...userData, classId: e.target.value })} />
										</div>
									</>
								}
								<input type="submit" value="确认" className="btn-scale btn-black btn- px-20 py-2 mx-auto rounded-md" />
							</form>
						}
					</ContinuousTabs>
				</div>
			</div>
		</div>
	);
}
