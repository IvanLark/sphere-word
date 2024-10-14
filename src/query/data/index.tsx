import {Edge, Node} from "../types.ts";
import {useState} from "react";
import QueryDataCore from "./core";
import QueryDataRelation from "./relation";

interface QueryDataParams {
  word: string;
  handleSkipWord: (word: string, nodes: Array<Node>, edges: Array<Edge>) => void;
}

export default function QueryData({word, handleSkipWord}: QueryDataParams) {
  const [pickedPage, setPickedPage] = useState('core');

  function showTabPag() {
    switch(pickedPage) {
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
      <div>{word}</div>
      <ul>
        <li>单词详情</li>
        <li>单词关系</li>
        <li>阅读材料</li>
      </ul>
      { showTabPag() }
    </>
  );
}