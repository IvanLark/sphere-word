export default function ConfirmButton ({onClick}: {onClick: () => void}) {
  return (
    <div className="btn-trans btn-scale-sm w-full py-2 px-3 my-2 bg-white rounded-lg shadow-md border-black
        border-2 flex items-center justify-center hover:shadow-lg text-2xl font-bold"
         onClick={onClick}>
      确认
    </div>
  );
}