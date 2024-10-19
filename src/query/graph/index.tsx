import { Edge, Node } from "../types.ts";
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { useEffect } from "react";

/**
 * 单词图谱页面
 * @param history
 * @constructor
 */

interface History {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

interface QueryGraphProps {
  word: string;
  history: History;
  handleSkipWord: (newWord: string) => void;
}

export default function QueryGraph({ word, history, handleSkipWord }: QueryGraphProps) {
  const elements = [
    ...history.nodes.map(nodeItem => ({ data: nodeItem })),
    ...history.edges.map(edgeItem => ({ data: edgeItem }))
  ];
  const layoutData = {
    name: 'cola'
  };
  const styleData = [
    // 单词节点样式
    {
      selector: 'node[type="Word"]',
      style: {
        'shape': 'ellipse', // 圆形节点
        'background-color': 'white', // 白色背景
        'border-color': 'black', // 黑色边框
        'border-width': 3, // 边框宽度
        'color': 'black', // 标签颜色
        'text-valign': 'center', // 标签垂直居中
        'text-halign': 'center', // 标签水平居中
        'label': 'data(label)', // 使用节点的label属性作为标签
        'font-size': 15, // 设置字体大小为12px
        'padding': 10, // 设置节点内边距为10px
        'width': function (node) {
          // 动态计算节点的宽度
          const label = node.data('label');
          const fontSize = 15; // 字体大小
          const padding = 10; // 内边距
          const labelWidth = label.length * fontSize; // 简单估计标签宽度
          return labelWidth + padding * 2; // 加上内边距
        },
        'height': function () {
          // 动态计算节点的高度
          const fontSize = 15; // 字体大小
          const padding = 10; // 内边距
          const labelHeight = fontSize; // 标签高度为字体大小
          return labelHeight + padding * 2; // 加上内边距
        }
      }
    },
    // 边的样式，带有联系类型的文字
    {
      selector: 'edge',
      style: {
        'line-color': 'gray', // 边为灰色
        'target-arrow-color': 'gray', // 箭头为灰色
        'target-arrow-shape': 'triangle', // 箭头形状为三角形
        'color': 'black', // 标签颜色为黑色
        'label': 'data(label)', // 使用边的label属性作为标签
        'font-size': 15, // 设置字体大小为12px
        'text-background-color': 'white', // 标签背景为白色
        'text-background-opacity': 0.8, // 标签背景透明度
        'text-background-padding': '3px', // 标签背景内边距
        'text-background-shape': 'roundrectangle', // 标签背景形状为圆角矩形
        'curve-style': 'bezier', // 使用贝塞尔曲线样式
        'width': 2 // 边宽度为2px
      }
    }
  ];

  cytoscape.use(cola);

  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements, // 节点和边数据
      style: styleData, // 样式数据
      layout: layoutData, // 布局数据
      wheelSensitivity: 0.1, // 缩放灵敏度
      minZoom: 0.1, // 最小缩放
      maxZoom: 2 // 最大缩放
    });

    // 动态调整节点大小以适应标签长度
    cy.nodes().forEach(function (node) {
      const labelText = node.data('label');
      const fontSize = node.style('font-size');
      const labelWidth = labelText.length * fontSize * 0.6; // 假设一个字符的平均宽度大约是字体大小的0.6倍
      const labelHeight = fontSize * 1.5; // 假设标签的高度大约是字体大小的1.5倍

      node.style({
        'width': labelWidth + 'px',
        'height': labelHeight + 'px',
        'min-width': labelWidth + 'px',
        'min-height': labelHeight + 'px'
      });
    });

    // 设置选中单词为黑色背景白色字
    // 遍历每个节点并更新样式
    cy.nodes().forEach(function (node) {
      if (node.data('label') === word) {
        node.style({
          'background-color': 'black', // 黑色背景
          'color': 'white' // 白色字
        });
      }
    });

    // 监听节点点击事件
    cy.on('tap', 'node', function(event) {
      const node = event.target; // 获取被点击的节点
      handleSkipWord(node.data('key'));
    });
  })

  return (
    <div id='cy' className="w-screen h-screen fixed bg-white"></div>
  );
}