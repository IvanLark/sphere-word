export function isWord(text: string): boolean {
	return /^[a-zA-Z-]+$/.test(text);
}

export function isPunct(text: string): boolean {
	return /^[.,!?;:]$/.test(text);
}

export function getDifficultyTag(difficultyScore: number): string {
	// 高考(90-120DR)
	// 四级(100-130DR)
	// 六级(115-145DR)
	// 考研(119-150DR)
	// 专四(115-140DR)
	// 专八(125-150DR)
	// 高职A级(60-100DR)
	// 高职B级(40-95DR)
	// 根据上面的数据，可以得出以下的分类，注意可能包含多个tag
	// TODO 优化分类算法
	const res = [];
	if (difficultyScore >= 125 && difficultyScore <= 150)
		res.push("专八");
	if (difficultyScore >= 115 && difficultyScore <= 140)
		res.push("专四");
	if (difficultyScore >= 119 && difficultyScore <= 150)
		res.push("考研");
	if (difficultyScore >= 115 && difficultyScore <= 145)
		res.push("六级");
	if (difficultyScore >= 100 && difficultyScore <= 130)
		res.push("四级");
	if (difficultyScore >= 90 && difficultyScore <= 120)
		res.push("高考");
	if (difficultyScore >= 60 && difficultyScore <= 100)
		res.push("初中");
	if (difficultyScore >= 40 && difficultyScore <= 95)
		res.push("小学");
	return res.join("&");
}
