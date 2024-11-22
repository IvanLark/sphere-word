import { WordArticle } from "../../../../../api/types/word-data.types.ts";
import ArticleCard from "../../../../../common/components/card/article-card.tsx";

interface QueryDataArticleProps {
  data: Array<WordArticle>;
}

export default function QueryDataArticle({ data }: QueryDataArticleProps) {
  return (
    <div className="w-full rounded-b-xl bg-white p-2 flex flex-col gap-4">
      {data.map((wordArticle, index) => <ArticleCard key={index} articleFace={wordArticle}/>)}
    </div>
  );
}

/*
<div className="w-full h-full min-h-[calc(100vh-500px)] relative">
  <span
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl text-center w-fit">
    Ops, <br/>这个单词暂时还没有文章哦😥
  </span>
</div>
*/