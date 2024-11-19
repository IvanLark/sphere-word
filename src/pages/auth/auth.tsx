import React, { useState } from "react";
import Icon from "../../../public/智臻.svg";
import ContinuousTabs from "../../common/components/tabs/continuous-tabs.tsx";
import Input from "../../common/components/input.tsx";
import { toast } from "../../common/utils/toast.util.tsx";
import { useNavigate } from "react-router-dom";
import { UserSignUpData } from "../../api/types/auth.types.ts";
import { login, signup } from "../../api/methods/auth.methods.ts";
import Radio from "../../common/components/radio.tsx";

export default function Auth() {

	const initUserData = {
		'username': '',
		'password': '',
		'againPassword': '',
		'userRole': 0,
		'schoolRole': 0,
		'schoolName': '',
		'className': '',
		'name': '',
		'sid': ''
	};

	const [userData, setUserData] = useState(initUserData);

	const navigate = useNavigate();

	function handleLogin() {
		login(userData.username, userData.password).then(response => {
			sessionStorage.setItem('login', 'true');
			localStorage.setItem('token', response);
			localStorage.setItem('tokenCreateTime', String(new Date().getTime()));
			toast.info('登录成功');
			setUserData(initUserData);
			navigate('/');
		}).catch(error => {
			toast.error(`登录失败: ${error.message}`);
		});
	}

	function handleSignUp() {
		// 参数校验
		if (userData.password !== userData.againPassword) {
			toast.error('两次输入密码不同');
			return;
		}
		const userSignUpData = {
			username: userData.username,
			password: userData.password,
			role: userData.role,
			schoolName: userData.schoolName,
			className: userData.className,
			name: userData.name,
			sid: userData.sid
		} as UserSignUpData;
		signup(userSignUpData).then(response => {
			sessionStorage.setItem('login', 'true');
			localStorage.setItem('token', response);
			localStorage.setItem('tokenCreateTime', String(new Date().getTime()));
			toast.info('注册成功');
			setUserData(initUserData);
			navigate('/');
		}).catch((error: Error) => {
			toast.error(`注册失败: ${error.message}`);
		});
	}

	const pageTabs = {
		'登录': 'login',
		'注册': 'signup'
	};

	const userRoleOptions = {
		'用户': 0,
		'北邮': 1,
		'他校': 2
	}

	const schoolRoleOptions = {
		'学生': 0,
		'老师': 1
	}

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
						{(value) =>
							<form className={`flex flex-col gap-4 items-center`}
										action="" onSubmit={
								(e: React.FormEvent<HTMLFormElement>) => {
									e.preventDefault();
									if (value === 'login') {
										handleLogin();
									} else if (value === 'signup') {
										handleSignUp();
									}
								}
							}>
								<Input label="用户名" type="text" required={true} value={userData.username} placeholder="请输入用户名"
									onChange={(value) => setUserData({ ...userData, username: value })} />
								<Input label="密码" type="password" required={true} value={userData.password} placeholder="请输入密码"
									onChange={(value) => setUserData({ ...userData, password: value })} />
								{
									value === 'signup' &&
									<>
										<Input label="密码" type="password" required={true} value={userData.againPassword} placeholder="请再次输入密码"
											onChange={(value) => setUserData({ ...userData, againPassword: value })} />
										{/* <div className="w-full flex items-center">
											// dTODO 麻了对checkbox不熟，你看看这里怎么改点击标签也能选中
											<input title="isBYS" type="checkbox" className="size-6" checked={userData.isBYR}
												onChange={(value) => setUserData({ ...userData, isBYR: value })} />
											<label htmlFor="isBYS"> 我是北邮人 </label>
										</div> */}
										<Radio<number> label="角色" value={userData.userRole} options={userRoleOptions}
													 onChange={ (value) => setUserData({ ...userData, userRole: value }) } />
										<div className={`w-full flex flex-col gap-5 items-center overflow-hidden transition-all duration-300 ${userData.userRole !== 0 ? 'h-64' : 'h-0'}`}>
											<Radio<number> label="身份" value={userData.schoolRole} options={schoolRoleOptions}
																		 onChange={ (value) => setUserData({ ...userData, schoolRole: value }) } />
											{
												userData.userRole === 2 &&
												<Input label="学校" type="text" required={userData.userRole === 2} value={userData.schoolName}
															 placeholder="请输入你所在的学校名称" onChange={(value) => setUserData({ ...userData, schoolName: value })} />
											}
											<Input label={userData.schoolRole === 0 ? "班级" : "部门"} type="text" required={userData.userRole !== 0} value={userData.className}
														 placeholder="请输入你所在的班级或部门" onChange={(value) => setUserData({ ...userData, className: value })} />
											<Input label="姓名" type="text" required={userData.userRole !== 0} value={userData.name}
														 placeholder="请输入你的真实名称" onChange={(value) => setUserData({ ...userData, name: value })} />
											<Input label={userData.schoolRole === 0 ? "学号" : "工号"} type="text" required={userData.userRole !== 0} value={userData.sid}
														 placeholder="请输入你的学号或工号" onChange={(value) => setUserData({ ...userData, sid: value })} />

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
