interface AiTooltipProps {
  onClick: () => void;
  show: boolean;
  targetId: string;
  scrollY: number;
}

export default function AiTooltip ({ show, targetId, scrollY, onClick }: AiTooltipProps) {

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return (<></>);
  const targetRect = targetElement.getBoundingClientRect();

  const tooltipWidth = 100;
  const tooltipHeight = 40;

  const screenWidth = window.innerWidth;

  const tooltipTop = targetRect.y - tooltipHeight - 10 + scrollY;
  let tooltipLeft = targetRect.x + (targetRect.width / 2) - (tooltipWidth / 2);
  // 右边超出
  if (tooltipLeft + tooltipWidth > screenWidth) {
    tooltipLeft = targetRect.x - tooltipWidth;
  }
  // 左边超出
  if (tooltipLeft < 0) {
    tooltipLeft = 10;
  }

  return (
    <button onClick={onClick} id="ai-tooltip"
            className={`absolute top-[${Math.floor(tooltipTop)}px] left-[${Math.floor(tooltipLeft)}px] 
                        w-[${tooltipWidth}px] h-[${tooltipHeight}px]
                        text-black bg-white border-black border-4 rounded-md text-2xl active:bg-black active:text-white
                        ${ show ? 'visible' : 'hidden' }
                      `}
            style={{
              top: `${Math.floor(tooltipTop)}px`,
              left: `${Math.floor(tooltipLeft)}px`,
              width: `${tooltipWidth}px`,
              height: `${tooltipHeight}px`,
            }}>
      问问AI
    </button>
  );
}