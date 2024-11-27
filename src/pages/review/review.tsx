import { Menu } from "@mui/icons-material";
import Header from "../../common/components/header.tsx";
import { useRequest } from "alova/client";
import { getReviewWords, reviewWord } from "../../api/methods/review.methods.ts";
import ReviewWordList from "./pages/review-word-list.tsx";
import ReviewWordSelect from "./pages/review-word-select.tsx";
import ReviewWordInfo from "./pages/review-word-info.tsx";
import { toast } from "react-toastify";
import useReviewState from "./hooks/use-review-state.ts";
import ReviewWordBlank from "./pages/review-word-blank.tsx";
import ScreenLoading from "../../common/components/loader/screen-loading.tsx";

export default function Review() {

	const {
		index, words, activePage, wordListWinOpen,
		setWords, nextPage, reverseWordListWinOpen
	} = useReviewState();

	const { data, loading, error } = useRequest(getReviewWords(), { force: true })
		.onSuccess(({ data }) => {
		setWords(prevState => {
			return prevState.concat(
				data.filter(i => {
					let isExisted = false;
					prevState.forEach(j => {
						console.log(`比较: ${i.word}, ${j.word}`)
						if (i.word === j.word) isExisted = true;
					});
					return !isExisted;
				})
			);
		});
		if (activePage === 'init' || activePage === 'blank') { nextPage(data); }
	});

	if (loading || data === undefined) {
		return <ScreenLoading/>;
	}
	if (error) {
		throw new Error('获取数据出错');
	}

	function handleSelect(word: string, rating: number) {
		reviewWord(word, rating).then(() => {
			nextPage(words);
		}).catch((error: Error) => {
			toast.error(`出错了，${error.message}`);
		});
	}

	function ReviewPage() {
		switch (activePage) {
			case 'blank':
				return <ReviewWordBlank />;
			case 'select':
				return <ReviewWordSelect wordData={words[index]} onSelected={handleSelect} />;
			case 'info':
				return <ReviewWordInfo word={words[index].word} onNext={() => nextPage(words)} />;
		}
	}

	return (
		<>
			{/* 顶部 */}
			<Header
				leadingBtn={
					<button title="剩余单词" className="btn-trans size-16 rounded-md border-r-2 border-black group"
						onClick={reverseWordListWinOpen}>
						<Menu style={{ fontSize: "2.5rem" }} />
					</button>
				}
				middleElement={words.length !== 0 ? `还剩${words.length-index}个单词` : '无剩余单词'}
			/>
			<ReviewPage />
			<ReviewWordList index={index} words={words} open={wordListWinOpen} onClose={reverseWordListWinOpen} />
		</>
	);
}