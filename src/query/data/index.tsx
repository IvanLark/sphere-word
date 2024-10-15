import { Edge, Node } from "../types.ts";
import { useState } from "react";
import QueryDataCore from "./core";
import QueryDataRelation from "./relation";

interface QueryDataParams {
  word: string;
  handleSkipWord: (word: string, nodes: Array<Node>, edges: Array<Edge>) => void;
}

export default function QueryData({ word, handleSkipWord }: QueryDataParams) {
  const [pickedPage, setPickedPage] = useState('core');

  function showTabPag() {
    switch (pickedPage) {
      case 'core':
        return <QueryDataCore word={word}></QueryDataCore>;
      case 'relation':
        return <QueryDataRelation word={word}></QueryDataRelation>;
      default:
        return <></>;
    }
  }

  return (
    <>
      {/* <div className="w-screen h-[calc(100vh-280px)] bg-transparent snap-end pointer-events-none"></div> */}
      {/* // **snap占位div */}
      <div className="w-screen h-[45vh] bg-transparent snap-start pointer-events-none"></div>
      <div className="w-screen h-[200vh] relative bg-gray-100 snap-start">
        {/* // **divider */}
        <div className="w-screen h-20 relative"><div className="w-56 h-9 rounded-full bg-gray-200 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div></div>
        {/* // **tabs */}
        <div className="w-screen h-24">

        </div>
        <div>{word}</div>
        <ul>
          <li>单词详情</li>
          <li>单词关系</li>
          <li>阅读材料</li>
        </ul>
        {showTabPag()}
      </div>
    </>
  );
}