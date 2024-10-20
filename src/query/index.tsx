import { useState } from "react";
import QueryGraph from "./graph";
import QueryData from "./data";
import { Edge, Node } from "./types.ts";
import QueryHeader from "./QueryHeader.tsx";

/**
 * 单词查询页面
 * @constructor
 */
export default function Query() {
  // 当前查询单词
  const [curWord, setCurWord] = useState<string>('make');
  // 历史查询单词
  const [history, setHistory] = useState<{ nodes: Array<Node>, edges: Array<Edge> }>({
    nodes: [{ id: getNodeId('Word', 'make'), key: 'make', type: 'Word', label: 'make' }], edges: []
  });

  function getNodeId(nodeType: string, nodeKey: string): string {
    return `${nodeType}@${nodeKey}`;
  }

  // 添加节点和边
  function addNodesAndEdges(nodes: Array<Node>, edges: Array<Edge>) {
    const newNodes: Array<Node> = [];
    const newEdges: Array<Edge> = [];
    nodes.forEach((node) => {
      let isExisted = false;
      history.nodes.forEach(nodeItem => {
        if (nodeItem.id === node.id) isExisted = true;
      })
      // 节点不存在则添加节点
      if (!isExisted) newNodes.push(node);
    })
    edges.forEach((edge) => {
      const edgeId1 = `${edge.source}&${edge.target}`;
      const edgeId2 = `${edge.target}&${edge.source}`;
      let isExisted = false;
      history.edges.forEach(edgeItem => {
        if (edgeItem.id === edgeId1 || edgeItem.id === edgeId2) isExisted = true;
      });
      edge.id = edgeId1;
      // 边不存在则添加边
      if (!isExisted) newEdges.push(edge);
    })
    setHistory({
      nodes: [
        ...history.nodes,
        ...newNodes
      ],
      edges: [
        ...history.edges,
        ...newEdges
      ]
    });
  }

  // 处理单词数据页面中点击单词事件
  function handleSkipWordFromRelation(newWord: string, relationType: string, relationLabel: string = relationType): void {
    // 添加nodes和edge
    addNodesAndEdges([{
      id: getNodeId('Word', newWord),
      key: newWord,
      type: 'Word',
      label: newWord
    } as Node], [{
      id: '',
      type: relationType,
      label: relationLabel,
      source: getNodeId('Word', curWord),
      target: getNodeId('Word', newWord)
    } as Edge])
    // 设置当前查询单词
    setCurWord(newWord);
  }

  function handleSkipWord(newWord: string) {
    // 添加nodes和edge
    addNodesAndEdges([{
      id: getNodeId('Word', newWord),
      key: newWord,
      type: 'Word',
      label: newWord
    } as Node], [])
    // 设置当前查询单词
    setCurWord(newWord);
  }

  // 单词查询页面
  return (
    <div className="w-screen h-[calc(100vh-64px)] ">
      <QueryHeader word={curWord} handleSkipWord={handleSkipWord}></QueryHeader>
      <QueryGraph word={curWord} history={history} handleSkipWord={handleSkipWord}></QueryGraph>
      {/* <div className="w-screen h-[calc(100vh-64px)] fixed bg-gradient-to-tr from-yellow-400 to-yellow-200"><div className="w-screen text-center text-5xl">QueryGraph</div><button className="btn-scale btn-grey px-4 py-2 m-auto">Test Click</button></div> */}
      <QueryData word={curWord} handleSkipWord={handleSkipWordFromRelation}></QueryData>
    </div>
  );
}