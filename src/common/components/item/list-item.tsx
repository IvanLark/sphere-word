interface ListItemProps {
  index: number;
  content: string | JSX.Element;
}

export default function ListItem({index, content}: ListItemProps): JSX.Element {
  return (
    <p className={`px-2 py-2 border-black text-[16px] 
      ${index === 0 ? 'border-y-2' : 'border-b-2'}`}>
      {content}
    </p>
  );
}