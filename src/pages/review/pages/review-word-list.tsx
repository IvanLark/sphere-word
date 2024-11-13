import { ReviewWordData } from "../../../api/types/review.types.ts";

interface ReviewWordListProps {
  index: number;
  words: ReviewWordData[];
  onClose: () => void;
  open: boolean;
}

export default function ReviewWordList({ index, words, onClose, open }: ReviewWordListProps) {
  return (
    <div
      className={`w-full h-[calc(100%-4rem)] p-5 overflow-y-scroll fixed z-10 bottom-0 bg-white flex flex-col
      items-center transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}>
      {
        words.map((wordData, mapIndex) =>
          <button key={mapIndex} className={`btn-scale btn-trans w-full py-4 text-center rounded-lg
            ${index === mapIndex ? 'bg-black text-white hover:bg-gray-900 active:bg-gray-800' : ''}`}>
            {wordData.word}
          </button>
        )
      }
    </div>
  );
}