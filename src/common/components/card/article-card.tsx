import { useNavigate } from "react-router-dom";
import { WordArticle } from "../../../api/types/word-data.types";
import { getDifficultyTag, isPunct } from "../../../pages/article/utils/text-process.util.ts";
import SingleWordCard from "./single-word-card";

export default function ArticleCard({ wordArticle }: { wordArticle: WordArticle }) {
	const navigate = useNavigate();

	const exampleSentence = wordArticle.positions[0].sentence.map((word, index) =>
		<span className={wordArticle.positions[0].wordIndex === index ? "text-red-400 font-bold text-[18px]" : ""} key={index}>
			{isPunct(word) ? '' : ' '}{word}
		</span>
	);

	return (
		<div className="btn-trans btn-scale-sm w-full p-2 my-2 bg-white rounded-lg shadow-md border-black border-2 flex flex-col gap-2 hover:shadow-lg"
				 onClick={() => { navigate('/article', { state: { articleId: wordArticle.articleId, positions: wordArticle.positions } }) }}>
			<img src={wordArticle.banner} alt="" className="w-full h-[calc(35vw)] object-cover" loading="lazy" />
			<h2 className="text-lg font-bold ">{wordArticle.title}</h2>
			<h2 className="text-lg font-bold ">{wordArticle.subtitle}</h2>
			<div className="flex flex-wrap gap-2">
				<SingleWordCard word={wordArticle.topic} />
				<SingleWordCard word={getDifficultyTag(wordArticle.difficultyScore)} />
				<SingleWordCard word={`${wordArticle.wordCount}词`} />
			</div>
			<div className="w-full -mx- mx-auto my-1 border-dashed border-black border-[1px]" />
			<p className="">{exampleSentence}</p>
		</div>
	);
}