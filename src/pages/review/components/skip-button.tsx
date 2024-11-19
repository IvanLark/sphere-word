import { ArrowForward } from "@mui/icons-material";

export default function SkipButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className={`
						btn-trans btn-scale h-fit px-3 py-1 m-2 text-lg text-nowrap rounded-full
						border-2 border-black shrink-0 transition-all duration-300
      `}
      onClick={onClick}>
      查询 <ArrowForward style={{ width: '25px', height: '25px' }} />
    </button>
  );
}