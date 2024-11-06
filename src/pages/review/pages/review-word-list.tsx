import {ReviewWordData} from "../../../api/types/review.types.ts";

interface ReviewWordListProps {
  reviewWords: ReviewWordData[];
  onClose: () => void;
  open: boolean;
}

export default function ReviewWordList ({reviewWords, onClose, open}: ReviewWordListProps) {
  return (
    <div
      className={`w-full max-h-[calc(100vh-4rem)] p-5 overflow-y-scroll fixed z-10 bottom-0 bg-white flex flex-col 
      items-center transition-all duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}>
      <h2 className="w-full text-xl font-bold text-center mb-2">剩余单词</h2>
      {
        reviewWords.map((wordData, index) =>
          <button key={index} className="btn-scale btn-trans w-full py-4 text-center rounded-lg">
            {wordData.word}
          </button>
        )
      }
    </div>
  );
}