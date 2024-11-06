interface PromptButtonProps {
  text: string;
  onClick: () => void;
}

export default function PromptButton ({text, onClick}: PromptButtonProps) {
  return (
    <span onClick={onClick}
      className={`btn-scale btn-trans h-fit px-4 py-2 border-2 border-black rounded-md
      overflow-hidden text-nowrap shrink-0 active:bg-black active:text-white`}
    >
      {text}
    </span>
  );
}