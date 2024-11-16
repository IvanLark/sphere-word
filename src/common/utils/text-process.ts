export function isPunct(char: string): boolean {
	return /[.,!?;:]/.test(char);
}