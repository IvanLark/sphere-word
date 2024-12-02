import { useNavigate } from "react-router-dom";
import { getDifficultyTag, isPunct } from "../../../pages/article/utils/text-process.util.ts";
import SingleWordCard from "./single-word-card";
import {ArticleFace} from "../../../api/types/article.types.ts";
import {PositionItem} from "../../../api/types/word-data.types.ts";

interface ArticleCardProps {
	articleFace: ArticleFace;
	keep?: boolean;
}

export default function ArticleCard({ articleFace, keep = false }: ArticleCardProps) {
	const navigate = useNavigate();

	let timeTag = undefined;
	if (articleFace.time) {
		const date = new Date(articleFace.time * 1000);  // 将秒级时间戳转换为毫秒
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1);  // 月份从 0 开始
		const day = String(date.getDate());
		timeTag = `${year}年${month}月${day}日`;
	}

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
		<div
			className="btn-trans btn-scale-sm w-full p-2 my-2 bg-white rounded-lg shadow-md border-black border-2 flex flex-col gap-2 hover:shadow-lg"
			onClick={() => {
				navigate('/article', {
					state: {
						type: keep !== undefined && keep ? 'keep' : 'id',
						article: articleFace.articleId,
						positions: articleFace.positions
					}
				})
			}}>
			{
				articleFace.banner &&
				<img src={articleFace.banner} alt="" className="w-full h-[calc(35vw)] object-cover" loading="lazy"/>
			}
			<h2 className="text-lg font-bold ">{articleFace.title}</h2>
			{
				articleFace.subtitle &&
				<h2 className="text-lg font-bold ">{articleFace.subtitle}</h2>
			}
			{
				(articleFace.topic || articleFace.difficultyScore || articleFace.wordCount) &&
				<div className="flex flex-wrap gap-2">
					{ articleFace.topic && <SingleWordCard word={articleFace.topic}/> }
					{ articleFace.difficultyScore && <SingleWordCard word={getDifficultyTag(articleFace.difficultyScore)}/> }
					{ articleFace.wordCount && <SingleWordCard word={`${articleFace.wordCount}词`}/> }
					{ timeTag && <SingleWordCard word={timeTag}/> }
				</div>
			}
			{
				articleFace.positions &&
				<ExampleSentence position={articleFace.positions[0]}/>
			}
		</div>
	);
}