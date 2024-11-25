interface AiTooltipProps {
  onAiClick: () => void;
  onHighlightClick: () => void;
  onQueryClick: () => void;
  onVoiceClick: () => void;
  checkHighLight: () => boolean;
  showAi: boolean;
  showHighlight: boolean;
  showQuery: boolean;
  showVoice: boolean;
  targetId: string;
}

export default function Tooltip ({ showAi, showHighlight, showQuery, showVoice, targetId, onAiClick, onHighlightClick, onQueryClick, onVoiceClick, checkHighLight }: AiTooltipProps) {

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return (<></>);
  const targetRect = targetElement.getBoundingClientRect();

  const tooltipWidth = 90;
  const tooltipHeight = 35;

  const screenWidth = window.innerWidth;

  const aiTooltipTop = targetElement.offsetTop - tooltipHeight - 10;
  const queryTooltipTop = targetElement.offsetTop + targetRect.height + 10;
  const highlightTooltipTop = targetElement.offsetTop + (targetRect.height / 2) - (tooltipHeight / 2);
  let tooltipLeft = targetRect.x + (targetRect.width / 2) - (tooltipWidth / 2);
  // 右边超出
  if (tooltipLeft + tooltipWidth > screenWidth) {
    tooltipLeft = targetRect.x - tooltipWidth;
  }
  // 左边超出
  if (tooltipLeft < 0) {
    tooltipLeft = 10;
  }

  let highlightTooltipLeft = targetRect.x + targetRect.width + 12;
  if (highlightTooltipLeft + tooltipWidth > screenWidth) {
    highlightTooltipLeft = targetRect.x - 12 - tooltipWidth;
  }

  return (<>
    <button onClick={onAiClick} id="ai-tooltip"
            className={`absolute top-[${Math.floor(aiTooltipTop)}px] left-[${Math.floor(tooltipLeft)}px] 
                        w-[${tooltipWidth}px] h-[${tooltipHeight}px]
                        bg-white bg-opacity-90 border-black text-black border-2 rounded-3xl text-[18px] font-bold shadow-md active:bg-black active:text-white
                        ${showAi ? 'visible' : 'hidden'}
                      `}
            style={{
              top: `${Math.floor(aiTooltipTop)}px`,
              left: `${Math.floor(tooltipLeft)}px`,
              width: `${tooltipWidth}px`,
              height: `${tooltipHeight}px`,
            }}>
      问问AI
    </button>

    <button onClick={onHighlightClick} id="highlight-tooltip"
            className={`absolute top-[${Math.floor(highlightTooltipTop)}px] left-[${Math.floor(highlightTooltipLeft)}px] 
                        w-[${tooltipWidth}px] h-[${tooltipHeight}px]
                        bg-white bg-opacity-90 border-black text-black border-2 rounded-3xl text-[18px] font-bold shadow-md active:bg-black active:text-white
                        ${showHighlight ? 'visible' : 'hidden'}
                      `}
            style={{
              top: `${Math.floor(highlightTooltipTop)}px`,
              left: `${Math.floor(highlightTooltipLeft)}px`,
              width: `${tooltipWidth}px`,
              height: `${tooltipHeight}px`,
            }}>
      {checkHighLight() ? '取消高亮' : '高亮单词'}
    </button>

    <button onClick={onQueryClick} id="highlight-tooltip"
            className={`absolute top-[${Math.floor(queryTooltipTop)}px] left-[${Math.floor(tooltipLeft)}px] 
                        w-[${tooltipWidth}px] h-[${tooltipHeight}px]
                        bg-white bg-opacity-90 border-black text-black border-2 rounded-3xl text-[18px] font-bold shadow-md active:bg-black active:text-white
                        ${showQuery ? 'visible' : 'hidden'}
                      `}
            style={{
              top: `${Math.floor(queryTooltipTop)}px`,
              left: `${Math.floor(tooltipLeft)}px`,
              width: `${tooltipWidth}px`,
              height: `${tooltipHeight}px`,
            }}>
      跳转查询
    </button>

    <button onClick={onVoiceClick} id="highlight-tooltip"
            className={`absolute top-[${Math.floor(queryTooltipTop)}px] left-[${Math.floor(tooltipLeft)}px] 
                        w-[${tooltipWidth}px] h-[${tooltipHeight}px]
                        bg-white bg-opacity-90 border-black text-black border-2 rounded-3xl text-[18px] font-bold shadow-md active:bg-black active:text-white
                        ${showVoice ? 'visible' : 'hidden'}
                      `}
            style={{
              top: `${Math.floor(queryTooltipTop)}px`,
              left: `${Math.floor(tooltipLeft)}px`,
              width: `${tooltipWidth}px`,
              height: `${tooltipHeight}px`,
            }}>
      播放发音
    </button>
  </>);
}