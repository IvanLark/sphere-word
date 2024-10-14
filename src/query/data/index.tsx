import {Outlet} from "react-router-dom";
import {Edge, Node} from "../types.ts";

interface QueryDataParams {
  word: string;
  handleSkipWord: (word: string, nodes: Array<Node>, edges: Array<Edge>) => void;
}

export default function QueryData({word, handleSkipWord}: QueryDataParams) {
  return (
    <>
      <div>{word}</div>
      <ul>
        <li>单词详情</li>
        <li>单词关系</li>
        <li>阅读材料</li>
      </ul>
      <Outlet/>
    </>
  );
}