import { Edge, Node } from "../types.ts";
import cytoscape, { NodeSingular } from 'cytoscape';

interface History {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

export default function QueryGraph({ history }: { history: History }) {
  const elements = [
    ...history.nodes.map(nodeItem => ({ data: nodeItem })),
    ...history.edges.map(edgeItem => ({ data: edgeItem }))
  ];
  const layoutData = {
    name: 'concentric',
    concentric: (node: NodeSingular) => {
      // 假设每个节点都有一个 'level' 属性，用于确定节点的位置
      return -node.data('level');
    },
    levelWidth: function (nodes: cytoscape.CollectionReturnValue) {
      // 默认宽度的两倍
      return nodes.maxDegree(false) / 6; // 例如，这里将每一层的宽度设置为最大度数的两倍
    },
    padding: 40,
    fit: true, // 如果设置为 true，则将视口适配到图形。
    nodeDimensionsIncludeLabels: true, // 如果设置为 true，则在计算节点的布局时包含标签的尺寸。
    avoidOverlap: true, // 如果设置为 true，则防止节点重叠。
    animate: true, // 开启动画
    animationDuration: 500, // 动画的持续时间
  };
  const styleData = [
    // 单词节点样式
    {
      selector: 'node[type="Word"]',
      style: {
        'label': 'data(label)',
        'background-color': '#66ccff',
        'font-size': '14px',
        'color': '#000',
        'width': '60px',
        'height': '60px',
        'shape': 'ellipse'
      }
    },
    // 话题节点样式
    {
      selector: 'node[type="Topic"]',
      style: {
        'label': 'data(label)',
        'background-color': '#ffccff',
        'font-size': '14px',
        'color': '#000',
        'width': '60px',
        'height': '60px',
        'shape': 'ellipse'
      }
    },
    // 母词/词根节点样式
    {
      selector: 'node[type="Mother"]',
      style: {
        'label': 'data(label)',
        'background-color': '#cccccc',
        'font-size': '14px',
        'color': '#000',
        'width': '60px',
        'height': '60px',
        'shape': 'ellipse'
      }
    },
    // 前缀节点样式
    {
      selector: 'node[type="Prefix"]',
      style: {
        'label': 'data(label)',
        'background-color': '#cccccc',
        'font-size': '12px',
        'color': '#000',
        'width': '40px',
        'height': '40px',
        'shape': 'ellipse'
      }
    },
    // 后缀节点样式
    {
      selector: 'node[type="Postfix"]',
      style: {
        'label': 'data(label)',
        'background-color': '#cccccc',
        'font-size': '12px',
        'color': '#000',
        'width': '40px',
        'height': '40px',
        'shape': 'ellipse'
      }
    },
    // 边的样式，带有联系类型的文字
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#999',
        'target-arrow-color': '#999',
        'target-arrow-shape': 'triangle',
        'text-background-color': '#fff',
        'text-background-opacity': 0.8,
        'text-background-padding': '3px',
        'font-size': '12px'
      }
    }
  ];

  const cy = cytoscape({
    container: document.getElementById('cy'),
    elements, // 节点和边数据
    style: styleData, // 样式数据
    layout: layoutData, // 布局数据
    wheelSensitivity: 0.1, // 缩放灵敏度
    minZoom: 0.1, // 最小缩放
    maxZoom: 2 // 最大缩放
  });

  return (
    <div id='cy'></div>
  );
}