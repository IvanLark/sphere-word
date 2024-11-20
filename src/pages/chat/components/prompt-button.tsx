interface PromptButtonProps {
  text: string;
  onClick: () => void;
}

export default function PromptButton ({text, onClick}: PromptButtonProps) {
  return (
    <span onClick={onClick}
      className={`btn-scale btn-trans h-10 px-4 py-2 border-2 border-black rounded-md
      overflow-hidden text-nowrap flex items-center shrink-0 active:bg-black active:text-white`}
    >
      {text}
    </span>
  );
}