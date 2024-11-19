interface ModeSwitchButtonProps {
  text: string;
  onClick: () => void;
}

export default function ModeSwitchButton ({text, onClick}: ModeSwitchButtonProps) {
  return (
    <button title="SelectMode" className="btn-trans size-16 rounded-md border-l-2 border-black group"
            onClick={onClick} id="mode-switch-button">
      <div className="btn-scale-xl text-2xl">
        {text}
      </div>
    </button>
  );
}