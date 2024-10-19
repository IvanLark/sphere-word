import { useState } from "react";
import QueryGraph from "./graph";
import QueryData from "./data";
import { Edge, Node } from "./types.ts";

/**
 * 单词查询页面
 * @constructor
 */
export default function Query() {
  // 当前查询单词
  const [curWord, setCurWord] = useState<string>('make');
  // 历史查询单词
  const [history, setHistory] = useState<{ nodes: Array<Node>, edges: Array<Edge> }>({
    nodes: [], edges: []
  });

  function getNodeId(nodeType: string, nodeKey: string): string {
    return `${nodeType}@${nodeKey}`;
  }

  // 添加节点
  function addNode(node: Node): string {
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
  function handleSkipWord(newWord: string, relationType: string, relationLabel: string = relationType): void {
    // 添加nodes和edge
    const newWordId = addNode({
      id: getNodeId('Word', newWord),
      key: newWord,
      type: 'Word',
      label: newWord
    } as Node);
    addEdge({
      id: '',
      type: relationType,
      label: relationLabel,
      source: newWordId,
      target: getNodeId('Word', curWord)
    } as Edge);
    // 设置当前查询单词
    setCurWord(newWord);
  }

  // 单词查询页面
  return (
    <div className="w-screen h-[calc(100vh-100px)] ">
      {/* <QueryGraph history={history}></QueryGraph> */}
      <div className="w-screen h-[calc(100vh-100px)] fixed bg-gradient-to-tr from-yellow-400 to-yellow-200"><div className="w-screen text-center text-5xl">QueryGraph</div><button className="btn-scale btn-grey px-4 py-2 m-auto">Test Click</button></div>
      <QueryData word={curWord} handleSkipWord={handleSkipWord}></QueryData>
    </div>
  );
}