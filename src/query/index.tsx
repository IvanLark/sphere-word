import { useState } from "react";
import QueryGraph from "./graph";
import QueryData from "./data";
import { Edge, Node } from "./types.ts";

export default function Query() {
  // 当前查询单词
  const [curWord, setCurWord] = useState<string>('');
  // 历史查询单词
  const [history, setHistory] = useState<{ nodes: Array<Node>, edges: Array<Edge> }>({
    nodes: [], edges: []
  });

  // 添加节点
  function addNode(node: Node): string {
    node.id = `${node.type}@${node.key}`;
    let isExisted = false;
    history.nodes.forEach(nodeItem => {
      if (nodeItem.id === node.id) isExisted = true;
    })
    // 节点不存在则添加节点
    if (!isExisted) {
      setHistory({
        nodes: [...history.nodes, node],
        edges: history.edges
      });
    }
    return node.id;
  }

  // 添加边
  function addEdge(edge: Edge): void {
    const edgeId1 = `${edge.source}&${edge.target}`;
    const edgeId2 = `${edge.target}&${edge.source}`;
    let isExisted = false;
    history.edges.forEach(edgeItem => {
      if (edgeItem.id === edgeId1 || edgeItem.id === edgeId2) isExisted = true;
    });
    edge.id = `${edge.source}&${edge.target}`;
    // 边不存在则添加边
    if (!isExisted) {
      setHistory({
        nodes: history.nodes,
        edges: [...history.edges, edge]
      })
    }
  }

  // 处理单词数据页面中点击单词事件
  function handleSkipWord(word: string, nodes: Array<Node>, edges: Array<Edge>): void {
    // 设置当前查询单词
    setCurWord(word);
    // 添加nodes和edges
    nodes.forEach((nodeItem) => {
      addNode(nodeItem);
    })
    edges.forEach((edgeItem) => {
      addEdge(edgeItem);
    })
  }

  // 单词查询页面
  return (
    <div className="w-screen h-[calc(100vh-200px)] snap-y snap-mandatory overflow-y-auto">
      {/* //!不能用h-full没有具体数值无法snap */}
      {/* <QueryGraph history={history}></QueryGraph> */}
      <div className="w-screen h-[calc(100vh-200px)] fixed bg-gradient-to-tr from-yellow-400 to-yellow-200"><div className="w-screen text-center text-5xl">QueryGraph</div><button className="btn-scale btn-grey px-4 py-2 m-auto">Test Click</button></div>
      <QueryData word={curWord} handleSkipWord={handleSkipWord}></QueryData>
    </div>
  );
}