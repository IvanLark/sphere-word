import { useNavigate } from "react-router-dom";
import { getDifficultyTag, isPunct } from "../../../pages/article/utils/text-process.util.ts";
import SingleWordCard from "./single-word-card";
import {ArticleFace} from "../../../api/types/article.types.ts";
import {PositionItem} from "../../../api/types/word-data.types.ts";

export default function ArticleCard({ articleFace }: { articleFace: ArticleFace }) {
	const navigate = useNavigate();

	function ExampleSentence ({position}: { position: PositionItem }) {
		return (
			<>
				<div className="w-full -mx- mx-auto my-1 border-dashed border-black border-[1px]"/>
				<p className="">
					{
						position.sentence.map((word, index) =>
							<span className={position.wordIndex === index ? "text-red-400 font-bold text-[18px]" : ""} key={index}>
								{isPunct(word) ? '' : ' '}{word}
							</span>
						)
					}
				</p>
			</>
		);
	}

	return (
		<div className="btn-trans btn-scale-sm w-full p-2 my-2 bg-white rounded-lg shadow-md border-black border-2 flex flex-col gap-2 hover:shadow-lg"
				 onClick={() => { navigate('/article', { state: { type: 'id', article: articleFace.articleId, positions: articleFace.positions } }) }}>
			<img src={articleFace.banner} alt="" className="w-full h-[calc(35vw)] object-cover" loading="lazy" />
			<h2 className="text-lg font-bold ">{articleFace.title}</h2>
			<h2 className="text-lg font-bold ">{articleFace.subtitle}</h2>
			<div className="flex flex-wrap gap-2">
				<SingleWordCard word={articleFace.topic} />
				<SingleWordCard word={getDifficultyTag(articleFace.difficultyScore)} />
				<SingleWordCard word={`${articleFace.wordCount}词`} />
			</div>
			{
				articleFace.positions &&
				<ExampleSentence position={articleFace.positions[0]} />
			}
		</div>
	);
}