import * as React from "react";

interface ButtonItemProps {
  content: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

export function ButtonItem({ content, className, onClick }: ButtonItemProps) {
  return (
    <span
      className={`h-fit px-2 border-2 border-black rounded-full overflow-hidden shrink-0 transition-all duration-300
        ${onClick ? 'active:bg-black active:text-white' : ''} ${className}`}
      onClick={onClick}>
      {content}
    </span>
  );
}