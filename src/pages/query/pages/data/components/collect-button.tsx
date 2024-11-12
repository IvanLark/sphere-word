import { Star, StarOutline } from "@mui/icons-material";

interface CollectButtonProps {
  isCollected: boolean;
  onClick: () => void;
}

export default function CollectButton({ isCollected, onClick }: CollectButtonProps) {
  return (
    <button
      className={`
						btn-trans btn-scale h-fit px-3 py-1 m-2 text-lg text-nowrap rounded-full
						border-2 border-black shrink-0 transition-all duration-300
						${isCollected ? 'bg-black text-white hover:bg-gray-800' : ''}
					`}
      onClick={onClick}>
      {
        isCollected ?
          <Star style={{ width: '25px', height: '25px' }} /> :
          <StarOutline style={{ width: '25px', height: '25px' }} />
      }
      收藏
    </button>
  );
}