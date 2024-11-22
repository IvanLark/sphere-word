import { Mic } from "@mui/icons-material";
import { ReviewWordData } from "../../../api/types/review.types.ts";
import {useEffect} from "react";

interface ReviewWordSelectProps {
  wordData: ReviewWordData;
  onSelected: (word: string, rating: number) => void;
}

export default function ReviewWordSelect({ wordData, onSelected }: ReviewWordSelectProps) {

  const colorMap = {
    '轻松': '#E0F9B5',
    '还行': '#A5DEE5',
    '困难': '#FCE38A',
    '忘记': '#FF8383',
  }

  function getDueText (delta: number) {
    if (delta <= 0) {
      // TODO
      return '';
    }
    // 秒级
    if (delta < 60) {
      return `${delta}秒后`;
    }
    // 分钟级
    if (delta < 60 * 60) {
      return `${Math.floor(delta / 60)}分钟后`;
    }
    // 小时级
    if (delta < 60 * 60 * 24) {
      return `${Math.floor(delta / (60 * 60))}小时后`;
    }
    // 天级
    return `${Math.floor(delta / (60 * 60 * 24))}天后`;
  }

  useEffect(() => {
    new Audio(`http://dict.youdao.com/dictvoice?type=0&audio=${wordData.word}`).play();
  }, [wordData.word]);

  return (
    <div className="w-full h-[calc(100vh-4rem)] pb-28 flex flex-col">
      <div className="flex flex-1 flex-col gap-4 items-center justify-center">
        <h2 className="text-7xl font-bold"> {wordData.word} </h2>
        <div className="flex gap-4">
          <button
            className="btn-scale btn-trans px-8 py-1 text-lg text-center rounded-xl border-2 border-black"
            onClick={() => {
              new Audio(`http://dict.youdao.com/dictvoice?type=1&audio=${wordData.word}`).play();
            }}>
            英<Mic />
          </button>
          <button
            className="btn-scale btn-trans px-8 py-1 text-lg text-center rounded-xl border-2 border-black"
            onClick={() => {
              new Audio(`http://dict.youdao.com/dictvoice?type=0&audio=${wordData.word}`).play();
            }}>
            美<Mic />
          </button>
        </div>
      </div>
      <div className="w-fit h-fit p-4 mx-auto grid grid-cols-2 grid-rows-2 gap-6 place-items-center ">
        {
          Object.entries(colorMap).map(([key, color], index) => (
            <button
              key={index}
              className={`btn-scale btn-common-hover w-fit px-12 py-3 text-3xl text-nowrap rounded-lg bg-[${color}]`}
              style={{ backgroundColor: color }}
              onClick={() => onSelected(wordData.word, wordData.review[key].rating)}>
              {key}
              <p className="text-base text-gray-600">{getDueText(wordData.review[key].due)}</p>
            </button>
          ))
        }
      </div>
    </div >
  );
}
