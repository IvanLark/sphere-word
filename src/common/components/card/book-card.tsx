export default function BookCard ({title, img, className = '', id, onClick}: {title: string; img: string, id: string, className?: string, onClick: () => void}) {
  return (
    <div className={`btn-white bg-white border-2 border-black text-black text-xl rounded-md shadow-md 
      active:scale-105 transition-transform duration-300 ${className}`} onClick={onClick} id={id}>
      <img alt="" className="w-full h-[calc(35vw)] object-cover" loading="lazy" src={img} />
      <p className="px-1 my-1">{title}</p>
    </div>
  );
}