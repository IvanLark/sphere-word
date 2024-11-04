import { useEffect, useState } from "react";
import QueryGraph from "./pages/graph/query-graph.page.tsx";
import QueryDataPage from "./pages/data/query-data.page.tsx";
import { Edge, Node } from "../../api/word/word-data.types.ts";
import QueryHeader from "./pages/query-header.page.tsx";
import { toastUtil } from "../../common/utils/toast.util.tsx";
import {checkWordExisted} from "../../api/word/word-search.methods.ts";

/**
 * 单词查询页面
 * @constructor
 */
export default function Query() {
  // 当前查询单词
  const storedCurWord = sessionStorage.getItem('QueryCurWord');
  const initCurWord = storedCurWord ? storedCurWord : 'make';
  const [curWord, setCurWord] = useState<string>(initCurWord);

  // 历史查询单词
  const storedHistory = sessionStorage.getItem('QueryHistory');
  const initHistory = storedHistory ? JSON.parse(storedHistory) : {
    nodes: [{ id: getNodeId('Word', 'make'), key: 'make', type: 'Word', label: 'make' }], edges: []
  };
  const [history, setHistory] = useState<{ nodes: Array<Node>, edges: Array<Edge> }>(initHistory);

  useEffect(() => {
    sessionStorage.setItem('QueryHistory', JSON.stringify(history));
    sessionStorage.setItem('QueryCurWord', curWord);
  }, [curWord, history]);

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
  function handleSkipWord(newWord: string, relationType: string, relationLabel: string = relationType): void {
    checkWordExisted(newWord).then(() => {
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
      // 选中新单词
      setCurWord(newWord);
      scrollBackToTop();
    }).catch(() => {
      toastUtil.error('不好意思，词库里没有这个词');
    });
  }

  function scrollBackToTop() {
    document.getElementById('scroll-container-start')!.scrollIntoView({ behavior: 'smooth' });
  }

  // 单词查询页面
  return (
    <div className="w-screen h-[calc(100vh-4rem)]">
      <QueryHeader word={curWord} handleSkipWord={handleSkipWord}></QueryHeader>
      <QueryGraph word={curWord} history={history}
                  handleSkipWord={(newWord) => { setCurWord(newWord); scrollBackToTop(); }}></QueryGraph>
      <QueryDataPage word={curWord} handleSkipWord={handleSkipWord}></QueryDataPage>
    </div>
  );
}