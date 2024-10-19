interface ListItemProps {
  index: number;
  content: string | JSX.Element;
}

export default function ListItem({index, content}: ListItemProps): JSX.Element {
  return (
    <p className={`px-2 py-1 border-black text-lg 
      ${index === 0 ? 'border-y-2' : 'border-b-2'}`}>
      {content}
    </p>
  );
}