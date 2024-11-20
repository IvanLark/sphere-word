export default function SingleWordCard({ word }: { word: string }) {
	return (
		<span className="px-2 font-bold rounded-md border-2 border-black"
					style={{ fontSize: '16px' }}>
			{word}
		</span>
	)
}