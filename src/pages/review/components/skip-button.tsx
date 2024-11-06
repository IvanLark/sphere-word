import { ArrowRight } from "@mui/icons-material";

export default function SkipButton ({onClick}: {onClick: () => void}) {
  return (
    <button
      className={`
        btn-trans btn-scale px-3 py-1 m-2 text-lg rounded-full
        border-2 border-black transition-all duration-300
      `}
      onClick={onClick}>
      跳转至查询 <ArrowRight style={{width: '25px', height: '25px'}}/>
    </button>
  );
}