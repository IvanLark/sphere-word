import {SelectMode} from "../hooks/use-article-state.ts";

interface SelectModeWinProps {
  show: boolean;
  selectMode: SelectMode;
  changeSelectMode: (mode: SelectMode) => void;
}

export default function SelectModeWin({ show, selectMode, changeSelectMode }: SelectModeWinProps) {
  return (
    // TODO 这里开启动画莫名其妙丢了
    <div id="select-mode-win"
      className={`w-40 px-2 fixed right-0 top-[3.8rem] overflow-hidden transition-all duration-300 ${show ? '' : 'h-0'}`}>
      {/* SelectWin */}
      <div
        className="h-[152px] text-2xl bg-white rounded-md border-black border-2 overflow-hidden backdrop-blur-sm bg-opacity-50">
        <p className="w-full h-8 text-center text-xl border-b-2 border-b-black">选择模式</p>
        <button
          className={`btn-scale w-full h-10 text-center transition-all duration-300
                        ${selectMode === '词' ? 'bg-black text-white' : 'btn-trans bg-white text-black'}`}
          onClick={() => changeSelectMode('词')}>
          选择单词
        </button>
        <button
          className={`btn-scale w-full h-10 text-center transition-all duration-300
                        ${selectMode === '句' ? 'bg-black text-white' : 'btn-trans bg-white text-black'}`}
          onClick={() => changeSelectMode('句')}>
          选择句子
        </button>
        <button
          className={`btn-scale w-full h-10 text-center transition-all duration-300
                        ${selectMode === '段' ? 'bg-black text-white' : 'btn-trans bg-white text-black'}`}
          onClick={() => changeSelectMode('段')}>
          选择段落
        </button>
      </div>
    </div>
  );
}