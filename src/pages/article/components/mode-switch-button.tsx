interface ModeSwitchButtonProps {
  text: string;
  onClick: () => void;
}

export default function ModeSwitchButton ({text, onClick}: ModeSwitchButtonProps) {
  return (
    <button title="SelectMode"
            className="btn-scale btn-white size-12 rounded-md border-2 border-black
                       flex items-center justify-center group pointer-events-auto"
            onClick={onClick} id="mode-switch-button">
      <div className="btn-scale-xl text-2xl">
        {text}
      </div>
    </button>
  );
}