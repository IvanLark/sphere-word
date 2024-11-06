import { Menu } from "@mui/icons-material";
import Header from "../../common/components/header.tsx";
import {useState} from "react";
import {useRequest} from "alova/client";
import {getReviewWords, reviewWord} from "../../api/methods/review.methods.ts";
import ReviewWordList from "./pages/review-word-list.tsx";
import {ReviewWordData} from "../../api/types/review.types.ts";
import ReviewWordSelect from "./pages/review-word-select.tsx";
import ReviewWordInfo from "./pages/review-word-info.tsx";
import {toast} from "react-toastify";

export default function Review() {

	const {loading, error} = useRequest(getReviewWords())
		.onSuccess(({ data }) => {
			setReviewWords(data);
			if (data.length === 0) {
				setReviewStatus(-1);
			} else {
				setCurWordData(data[0]);
				setReviewStatus(0);
			}
		});

	const defaultWordData = {
		word: 'make',
		due: 0,
		last: 0,
		reps: 0,
		review: {
			'轻松': { rating: 4, due: 0 },
			'还行': { rating: 3, due: 0 },
			'困难': { rating: 2, due: 0 },
			'忘记': { rating: 1, due: 0 }
		}
	} as ReviewWordData;

	const [curWordData, setCurWordData] = useState<ReviewWordData>(defaultWordData);
	const [reviewWords, setReviewWords] = useState<ReviewWordData[]>([]);
	const [reviewWordListOpen, setReviewWordListOpen] = useState(false);
	const [reviewStatus, setReviewStatus] = useState(0);

	function ReviewPage () {
		switch (reviewStatus) {
			case -1:
				return <div className="w-full h-full mx-auto my-auto">暂时没有需要复习的单词哦</div>;
			case 0:
				return <ReviewWordSelect wordData={curWordData} onSelected={handleSelect}/>;
			case 1:
				return <ReviewWordInfo word={curWordData.word} onNext={handleNext}/>;
		}
	}

	if (loading) {
		// TODO
		return (<>加载中...</>);
	}
	if (error) {
		// TODO
		return (<>出错了...</>);
	}

	function handleSelect (word: string, rating: number) {
		reviewWord(word, rating).then(() => {
			setReviewWords(prevState => prevState.slice(1));
			setReviewStatus(1);
		}).catch((error: Error) => {
			toast.error(`出错了，${error.message}`);
		})
	}

	function handleNext () {
		if (reviewWords.length === 0) {
			setCurWordData(defaultWordData);
			setReviewStatus(-1);
		} else {
			setCurWordData(reviewWords[0]);
			setReviewStatus(0);
		}
	}

	return (
		<>
			{/* 顶部 */}
			<Header
				leadingBtn={
					<button title="剩余单词" className="btn-trans size-16 rounded-md border-r-2 border-black group"
									onClick={() => { setReviewWordListOpen(!reviewWordListOpen) }}>
						<Menu style={{ fontSize: "2.5rem" }} />
					</button>
				}
				middleElement={`还剩${reviewWords.length}个单词`}
			/>
			<ReviewPage />
			<ReviewWordList open={reviewWordListOpen} reviewWords={reviewWords} onClose={() => { setReviewWordListOpen(false) }}/>
		</>
	);
}