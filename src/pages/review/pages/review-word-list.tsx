import { ReviewWordData } from "../../../api/types/review.types.ts";

interface ReviewWordListProps {
  index: number;
  words: ReviewWordData[];
  onClose: () => void;
  open: boolean;
}

export default function ReviewWordList({ index, words, onClose, open }: ReviewWordListProps) {
  return (
    // TODO 这里设置了transition-opacity高度变化也有动画()
    <div
      className={`w-full max- h-[calc(100vh-4rem)] p-5 overflow-y-scroll fixed z-10 bottom-0 bg-white flex flex-col
      items-center transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}>
      <h2 className="w-full text-xl font-bold text-center mb-2">剩余单词</h2>
      {
        words.map((wordData, mapIndex) =>
          <button key={mapIndex} className={`btn-scale btn-trans w-full py-4 text-center rounded-lg 
            ${index === mapIndex ? 'bg-black text-white' : ''}`}>
            {wordData.word}
          </button>
        )
      }
    </div>
  );
}