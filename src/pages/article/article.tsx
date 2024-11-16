import { useState } from "react";
import { getArticle } from "../../api/methods/article.methods";
import { Article as ArticleType } from "../../api/types/article.types";
import { WordArticle } from "../../api/types/word-data.types";
import SingleWordCard from "../../common/components/card/single-word-card";
import Header from "../../common/components/header";
import { useLocation } from "react-router-dom";
import { More, Refresh } from "@mui/icons-material";
import { getWordTag, isPunct } from "../../common/utils/text-process";

export default function Article() {
  const { articleId, position }: { articleId: string; position: string } = useLocation().state;
  const [article, setArticle] = useState<ArticleType>();
  getArticle(articleId).then((data) => { setArticle(data) }).catch((error) => { throw error; });
  const articleContent = article?.text.map((paragraph, p_index) => paragraph.map((sentence, s_index) => sentence.map((word, w_index) => <span id={`${p_index}-${s_index}-${w_index}`} className={`w-fit`}>{isPunct(word) ? '' : ' '}{word}</span>))).reduce((prev, curr) => [...prev, [<div className="w-full h-3"></div>], ...curr])
  // .join('');
  return <>
    <Header trailingBtn={<button title="Menu" className="btn-trans size-16 rounded-md border-l-2 border-black group">
      <div className="btn-scale-xl" onClick={() => {
      }}>
        {/* < style={{ fontSize: "2.5rem" }} /> */}
      </div>
    </button>
    } />
    {article ?
      <div className="w-full min-h-[calc(100vh-4rem)] p-8 my-4 bg-white rounded-lg shadow-md flex flex-col gap-2">
        <h2 className="text-2xl font-bold ">{article.title}</h2>
        <h2 className="text-2xl font-bold ">{article.subtitle}</h2>
        <div className="flex flex-wrap gap-2">
          <SingleWordCard word={article.topic} />
          <SingleWordCard word={getWordTag(article.difficultyScore)} />
          <SingleWordCard word={`${article.wordCount}词`} />
        </div>
        <img src={article.banner} alt="" className="w-full h-[calc(40vw) object-cover" loading="lazy" />
        {/* <p className="">{article.text.map((</p> */}
        <div className="">
          <span className="bg-lime-500 text-white"> hight-light-word</span>
          {articleContent}
        </div>
      </div> :
      <div className="w-full min-h-[calc(100vh-4rem)] relative">
        {/* //!这两个类名必须分开不然transform冲突 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><Refresh className="anim-rotate" style={{ fontSize: "10rem" }} /></div>
      </div>
    }
  </>
}