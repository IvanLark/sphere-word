import { WordArticle } from "../../api/types/word-data.types";
import SingleWordCard from "../../common/components/card/single-word-card";
import Header from "../../common/components/header";

export default function Article({ wordArticle }: { wordArticle: WordArticle }) {
  // const article =
  return (
    <>
      <Header />
      <div className="w-full min-h-screen p-2 my-2 bg-white rounded-lg shadow-md border-black border-2">
        <img src={wordArticle.banner} alt="" className="" />
        <h2 className="text-lg font-bold ">{wordArticle.title}</h2>
        <h2 className="text-lg font-bold ">{wordArticle.subtitle}</h2>
        <div className="flex flex-wrap">
          <SingleWordCard word={wordArticle.topic} />
          <SingleWordCard word={wordArticle.banner} />
          <SingleWordCard word={`${wordArticle.wordCount}词`} />
        </div>
        <div className="w-full -mx-2 border-collapse border-black border-[1px]"></div>
        <p className="">{ }</p>
      </div>
    </>
  );
}