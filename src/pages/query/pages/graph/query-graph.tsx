import { Edge, Node } from "../../../../api/types/word-data.types.ts";
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import dagre from 'cytoscape-dagre';
import elk from 'cytoscape-elk';
import React, {useEffect, useState} from "react";

/**
 * 单词图谱页面
 * @param history
 * @constructor
 */

interface History {
  nodes: Array<{data: Node}>;
  edges: Array<{data: Edge}>;
}

interface QueryGraphProps {
  word: string;
  handleSkipWord: (newWord: string) => void;
  onLayoutStop: (data: History) => void;
}

type LayoutType = 'cola' | 'dagre' | 'radial' | 'layered' | 'mrtree' | 'stress';

export default function QueryGraph({ word, handleSkipWord, onLayoutStop }: QueryGraphProps) {

  const data = JSON.parse(sessionStorage.getItem('query:graph:elements') as string) as History;

  const elements = [
    ...data.nodes,
    ...data.edges
  ];

  const styleData = [
    // 单词节点样式
    {
      selector: 'node[type="Word"]',
      style: {
        'shape': 'ellipse' as cytoscape.Css.NodeShape, // 圆形节点
        'background-color': 'white', // 白色背景
        'border-color': 'black', // 黑色边框
        'border-width': 3, // 边框宽度
        'color': 'black', // 标签颜色
        'text-valign': 'center' as "center" | "top" | "bottom", // 标签垂直居中
        'text-halign': 'center' as "center" | "left" | "right", // 标签水平居中
        'label': 'data(label)', // 使用节点的label属性作为标签
        'font-size': 15, // 设置字体大小为12px
        'padding': 10, // 设置节点内边距为10px
        'width': function (node: cytoscape.NodeSingular) {
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
        'text-background-shape': 'roundrectangle' as "rectangle" | "roundrectangle", // 标签背景形状为圆角矩形
        'curve-style': 'bezier', // 使用贝塞尔曲线样式
        'width': 2 // 边宽度为2px
      }
    }
  ];

  const layoutOptions = [
    {value: 'cola', label: 'cola'},
    {value: 'dagre', label: 'dagre'},
    {value: 'radial', label: 'radial'},
    {value: 'layered', label: 'layered'},
    {value: 'mrtree', label: 'mrtree'},
    {value: 'stress', label: 'stress'}
  ]

  const [layoutType, setLayoutType] = useState<LayoutType>('dagre');

  const [showSelectLayout, setShowSelectLayout] = useState<boolean>(false);

  function handleClickOutside (event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      if (showSelectLayout && !event.target.closest('#select-layout-win') && !event.target.closest('#select-layout-button') && !event.target.closest('#select-layout-select')) {
        setShowSelectLayout(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function select (cy: cytoscape.Core) {
    // 设置选中单词为黑色背景白色字
    // 遍历每个节点并更新样式
    cy.nodes().forEach(function (node) {
      if (node.data('label') === word) {
        node.style({
          'background-color': 'black', // 黑色背景
          'color': 'white' // 白色字
        });
        cy.zoom(1)
        cy.center(node);
      }
    });
  }

  if (layoutType === 'cola') {
    cytoscape.use(cola);
  } else if (layoutType === 'dagre') {
    cytoscape.use( dagre );
  } else {
    cytoscape.use( elk );
  }


  const colaLayout = {
    name: 'cola',
    nodeSpacing: 30, // 节点间最小距离
    animate: false, // 禁止动画
    ungrabifyWhileSimulating: true, // 在布局运行时禁止拖动节点
    nodeDimensionsIncludeLabels: true, // 在计算节点空间时包括标签
    avoidOverlap: true, // 避免节点重叠
    convergenceThreshold: 0.005, // 布局收敛的阈值。较低的阈值可以提高布局质量，但可能会增加计算时间
    centerGraph: true,
  };

  const stressLayout = {
    name: 'elk',
    animate: false,
    elk: {
      algorithm: 'stress',
      desiredEdgeLength: 180.0
    }
  }

  const mrtreeLayout = {
    name: 'elk',
    animate: false,
    elk: {
      algorithm: 'mrtree',
      'elk.spacing.nodeNode': 100,
      'elk.spacing.edgeNode': 200
    }
  }

  const layeredLayout = {
    name: 'elk',
    animate: false,
    elk: {
      algorithm: 'layered',
      'elk.spacing.nodeNode': 50,
      'elk.spacing.edgeNode': 50,
      'elk.direction': 'RIGHT',
      'nodePlacement.strategy': 'LINEAR_SEGMENTS',
      'elk.spacing.edgeLabel': 4,
      'spacing.edgeNodeBetweenLayers': 30
    }
  }

  const radialLayout = {
    name: 'elk',
    animate: false,
    elk: {
      algorithm: 'radial',
      'elk.spacing.nodeNode': 10,
      radius: 150
    }
  }

  const dagreLayout = {
    name: 'dagre',
    animate: false,
    rankSep: 80
  }

  let layout = undefined;
  switch (layoutType) {
    case 'cola': {
      layout = colaLayout;
      break;
    }
    case 'dagre': {
      layout = dagreLayout;
      break;
    }
    case 'radial': {
      layout = radialLayout;
      break;
    }
    case 'layered': {
      layout = layeredLayout;
      break;
    }
    case 'mrtree': {
      layout = mrtreeLayout;
      break;
    }
    case 'stress': {
      layout = stressLayout;
      break;
    }
    default: {
      layout = dagreLayout;
    }
  }

  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements, // 节点和边数据
      style: styleData, // 样式数据
      layout: {
        stop: () => {
          if (layoutType !== 'cola' && layoutType !== 'dagre') select(cy);
        },
        ...layout
      }, // 布局数据
      wheelSensitivity: 0.1, // 缩放灵敏度
      minZoom: 0.1, // 最小缩放
      maxZoom: 3 // 最大缩放
    });

    if (layoutType === 'cola' || layoutType === 'dagre') select(cy);


    setTimeout(() => {
      const cyJson = cy.json() as {elements: History};
      onLayoutStop(cyJson.elements);
    }, 1500)

    // 监听节点点击事件
    cy.on('tap', 'node', function (event) {
      const node = event.target; // 获取被点击的节点
      handleSkipWord(node.data('key'));
    });

  })

  return (<>
    <div id='cy' className="w-screen h-[calc(100vh-300px)] fixed bg-white"></div>

    <div id="select-layout-win"
      className="flex flex-row gap-0 active:scale-105 fixed top-[65px] right-2 z-10 transition-all duration-300">
      {
        !showSelectLayout ?
          <button id="select-layout-button"
            className="btn-scale btn-white size-12 rounded-md border-2 border-black text-xl font-bold"
            onClick={() => setShowSelectLayout(true)}>
            布局
          </button> :
          <select
            id="select-layout-select"
            className={`block pl-2 pr-2 py-2 text-xl border-2 border-black rounded-md`}
            value={layoutType}
            onChange={(event) => {
              setLayoutType(event.target.value as LayoutType);
              setShowSelectLayout(false);
            }}
            onBlur={() => setShowSelectLayout(false)}
          >
            {layoutOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="cursor-pointer select-none relative"
              >
                {option.label}
              </option>
            ))}
          </select>
      }
    </div>
  </>);
}