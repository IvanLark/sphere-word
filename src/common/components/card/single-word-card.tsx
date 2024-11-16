export default function SingleWordCard({ word }: { word: string }) {
	return (
		<span className="px-2 text-lg font-bold rounded-md border-2 border-black">
			{word}
		</span>
	)
}