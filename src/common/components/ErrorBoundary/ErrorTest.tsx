export default function ErrorTest() {
	let a: number[] = [1, 2, 3];
	// @ts-expect-error undefined
	a = undefined;
	// 两种错误抛出均可实现
	throw new Error('Test Error');
	return a.map(x => <div>{x}</div>);
}