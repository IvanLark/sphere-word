interface AiTooltipProps {
  onAiClick: () => void;
  onHighlightClick: () => void;
  checkHighLight: () => boolean;
  showAi: boolean;
  showHighlight: boolean;
  targetId: string;
}

export default function Tooltip ({ showAi, showHighlight, targetId, onAiClick, onHighlightClick, checkHighLight }: AiTooltipProps) {

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return (<></>);
  const targetRect = targetElement.getBoundingClientRect();

  const tooltipWidth = 90;
  const tooltipHeight = 35;

  const screenWidth = window.innerWidth;

  const tooltipTop = targetElement.offsetTop - tooltipHeight - 10;
  const tooltipBottomTop = targetElement.offsetTop + targetRect.height + 10;
  let tooltipLeft = targetRect.x + (targetRect.width / 2) - (tooltipWidth / 2);
  // 右边超出
  if (tooltipLeft + tooltipWidth > screenWidth) {
    tooltipLeft = targetRect.x - tooltipWidth;
  }
  // 左边超出
  if (tooltipLeft < 0) {
    tooltipLeft = 10;
  }

  return (<>
    <button onClick={onAiClick} id="ai-tooltip"
            className={`absolute top-[${Math.floor(tooltipTop)}px] left-[${Math.floor(tooltipLeft)}px] 
                        w-[${tooltipWidth}px] h-[${tooltipHeight}px]
                        bg-white bg-opacity-90 border-black text-black border-2 rounded-3xl text-[18px] font-bold shadow-md active:bg-black active:text-white
                        ${showAi ? 'visible' : 'hidden'}
                      `}
            style={{
              top: `${Math.floor(tooltipTop)}px`,
              left: `${Math.floor(tooltipLeft)}px`,
              width: `${tooltipWidth}px`,
              height: `${tooltipHeight}px`,
            }}>
      问问AI
    </button>

    <button onClick={onHighlightClick} id="highlight-tooltip"
            className={`absolute top-[${Math.floor(tooltipBottomTop)}px] left-[${Math.floor(tooltipLeft)}px] 
                        w-[${tooltipWidth}px] h-[${tooltipHeight}px]
                        bg-white bg-opacity-90 border-black text-black border-2 rounded-3xl text-[18px] font-bold shadow-md active:bg-black active:text-white
                        ${showHighlight ? 'visible' : 'hidden'}
                      `}
            style={{
              top: `${Math.floor(tooltipBottomTop)}px`,
              left: `${Math.floor(tooltipLeft)}px`,
              width: `${tooltipWidth}px`,
              height: `${tooltipHeight}px`,
            }}>
      { checkHighLight() ? '取消高亮' : '高亮单词' }
    </button>
  </>);
}