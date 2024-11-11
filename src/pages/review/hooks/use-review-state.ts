import {useEffect, useState} from "react";
import {ReviewWordData} from "../../../api/types/review.types.ts";

export default function useReviewState() {

  type ReviewPageKey = 'select'|'info'|'blank'|'init';

  const storedIndex = sessionStorage.getItem('review:index');
  const initIndex = storedIndex ? Number(storedIndex) : -1;
  const [index, setIndex] = useState<number>(initIndex);
  const storedWords = sessionStorage.getItem('review:words');
  const initWords = storedWords ? JSON.parse(storedWords) : [];
  const [words, setWords] = useState<ReviewWordData[]>(initWords);
  const initActivePage = sessionStorage.getItem('review:active-page') as ReviewPageKey || 'init';
  const [activePage, setActivePage] = useState<ReviewPageKey>(initActivePage);
  const [wordListWinOpen, setWordListWinOpen] = useState<boolean>(false);

  useEffect(() => {
    sessionStorage.setItem('review:index', String(index));
    sessionStorage.setItem('review:words', JSON.stringify(words));
    sessionStorage.setItem('review:active-page', activePage);
  }, [words, activePage]);

  function reverseWordListWinOpen () {
    setWordListWinOpen(prevState => !prevState);
  }

  function nextPage (curWords: ReviewWordData[]) {
    if (activePage === 'select') {
      setActivePage('info');
    }
    else {
      if ( index !== curWords.length - 1 ) {
        setIndex(prevState => prevState + 1);
        setActivePage('select');
      } else {
        setActivePage('blank');
        setWords([]);
        setIndex(-1);
      }
    }
  }

  return {
    index, words, activePage, wordListWinOpen,
    setWords, nextPage, reverseWordListWinOpen
  };

}