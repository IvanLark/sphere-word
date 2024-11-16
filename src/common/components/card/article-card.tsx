import { WordArticle } from "../../../api/types/word-data.types";
import { isPunct } from "../../utils/text-process";
import SingleWordCard from "./single-word-card";

const testWorArticle = {
	articleId: "4429",
	banner: "https://cdn.ai-reading.com/banner/b_ecd45d4e85123736019d49612c60a2d9.jpg",
	difficultyScore: 58,
	positions: [
		{
			paragraphIndex: 2,
			sentence: [
				"After",
				"they",
				"finished",
				"cleaning",
				",",
				"they",
				"made",
				"their",
				"playground",
				"look",
				"nice",
				"and",
				"pretty",
				".",
			],
			sentenceIndex: 1,
			wordIndex: 6,
		},
	],
	subtitle: "国王驾到",
	title: "The Coming of the King",
	topic: "故事",
	wordCount: 274,
};
function getWordTag(difficultyScore: number): string {
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
	if (difficultyScore >= 119 && difficultyScore <= 150)
		res.push("考研");
	if (difficultyScore >= 115 && difficultyScore <= 130)
		res.push("四六级");
	else if (difficultyScore >= 115 && difficultyScore <= 145)
		res.push("六级");
	else if (difficultyScore >= 100 && difficultyScore <= 130)
		res.push("四级");
	if (difficultyScore >= 90 && difficultyScore <= 120)
		res.push("高考");
	if (difficultyScore >= 60 && difficultyScore <= 100)
		res.push("高职A级");
	if (difficultyScore >= 40 && difficultyScore <= 95)
		res.push("高职B级");
	return res.join(" ");
}
export default function ArticleCard({ wordArticle }: { wordArticle: WordArticle }) {
	wordArticle = testWorArticle;
	const positionParagraph = wordArticle.positions.length > 0 ? wordArticle.positions[0].sentence.map((word, index) =>
		wordArticle.positions[0].wordIndex === index ? <span className="text-red-400">{isPunct(word) ? '' : ' '}{word} </span> :
			<span>{isPunct(word) ? '' : ' '}{word}</span>) :
		<span>"未能获取该单词在文章中的位置信息"</span>
	return (
		<div className="w-full p-2 my-2 bg-white rounded-lg shadow-md border-black border-2 flex flex-col gap-2">
			<img src={wordArticle.banner} alt="" className="w-full h-[calc(40vw)] object-cover" loading="lazy" />
			<h2 className="text-lg font-bold ">{wordArticle.title}</h2>
			<h2 className="text-lg font-bold ">{wordArticle.subtitle}</h2>
			<div className="flex flex-wrap ">
				<SingleWordCard word={wordArticle.topic} />
				<SingleWordCard word={getWordTag(wordArticle.difficultyScore)} />
				<SingleWordCard word={`${wordArticle.wordCount}词`} />
			</div>
			<div className="w-full -mx- mx-auto border-dashed border-black border-[1px]"></div>
			<p className="">{positionParagraph}</p>
		</div>
	)
}