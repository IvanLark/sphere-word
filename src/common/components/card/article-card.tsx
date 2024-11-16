import { useNavigate } from "react-router-dom";
import { WordArticle } from "../../../api/types/word-data.types";
import { getWordTag, isPunct } from "../../utils/text-process";
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
export default function ArticleCard({ wordArticle }: { wordArticle: WordArticle }) {
	// TODO to delete
	wordArticle = testWorArticle;
	const navigate = useNavigate();
	const positionParagraph = wordArticle.positions.length > 0 ? wordArticle.positions[0].sentence.map((word, index) =>
		wordArticle.positions[0].wordIndex === index ? <span className="text-red-400">{isPunct(word) ? '' : ' '}{word} </span> :
			<span>{isPunct(word) ? '' : ' '}{word}</span>) :
		<span>"未能获取该单词在文章中的位置信息"</span>
	return (
		<div className="btn-trans btn-scale-sm w-full p-2 my-2 bg-white rounded-lg shadow-md border-black border-2 flex flex-col gap-2 hover:shadow-lg" onClick={() => { navigate('/article', { state: { articleId: wordArticle.articleId, position: wordArticle.positions } }) }}>
			<img src={wordArticle.banner} alt="" className="w-full h-[calc(40vw)] object-cover" loading="lazy" />
			<h2 className="text-lg font-bold ">{wordArticle.title}</h2>
			<h2 className="text-lg font-bold ">{wordArticle.subtitle}</h2>
			<div className="flex flex-wrap gap-2">
				<SingleWordCard word={wordArticle.topic} />
				<SingleWordCard word={getWordTag(wordArticle.difficultyScore)} />
				<SingleWordCard word={`${wordArticle.wordCount}词`} />
			</div>
			<div className="w-full -mx- mx-auto border-dashed border-black border-[1px]"></div>
			<p className="">{positionParagraph}</p>
		</div>
	)
}