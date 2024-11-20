
interface PromptObjectButtonProps {
  word: string;
  onClick: () => void;
}

export default function PromptObjectButton ({word, onClick}: PromptObjectButtonProps) {
  return (
    <span className='text-[16px] px-2 border-2 border-black rounded-md shrink-0 active:bg-black active:text-white'
          onClick={onClick}>
      {word}
      {/*<button title="delete" className="btn-scale btn-trans size-6 ml-2 rounded-full"
              onClick={() => setPromptTabElements(promptTabElements.filter(w => w !== word))}>
        <Close />
      </button>*/}
    </span>
  );
}