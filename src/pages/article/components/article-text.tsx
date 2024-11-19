import {isPunct, isWord} from "../utils/text-process.util.ts";
import {Article} from "../../../api/types/article.types.ts";
import {SelectMode} from "../hooks/use-article-state.ts";
import {Position} from "../hooks/use-article-state.ts";
import {Fragment} from "react";

interface ArticleTextProps {
  data: Article;
  selectMode: SelectMode;
  getHighlightClass: (position: Position) => string;
  checkSelected: (position: Position) => boolean;
  handleWordClick: (sentence: Array<string>, position: Position) => void;
  handleSentenceClick: (sentence: Array<string>, position: Position) => void;
  beforeSelected: (target: HTMLElement) => void;
}

export default function ArticleText({data, selectMode, getHighlightClass, checkSelected, handleWordClick, handleSentenceClick, beforeSelected}: ArticleTextProps) {
  // TODO 依然有不少地方空格错误自行检查一下

  return <>
    {
      data?.text.map((paragraph, pIndex) => <Fragment key={pIndex}>
        {/* 段落开头空格 */}
        <span className="inline-block w-8" key={pIndex}/>
        {
          paragraph.map((sentence, sIndex) =>
              <span key={sIndex} id={`sentence-${pIndex}-${sIndex}`}
                    className={`text-xl leading-loose
                                ${selectMode === '句' && checkSelected([pIndex, sIndex, -1]) ? "bg-lime-500 text-white rounded-md" : ""}`}
                    onClick={(event) => {
                      beforeSelected(event.target as HTMLElement);
                      if (selectMode === '句') handleSentenceClick(sentence, [pIndex, sIndex, -1]);
                    }}>
          {
            sentence.map((word, wIndex) =>
              <span key={wIndex}>
                {/* 单词间空格 */}
                <span>{isPunct(word) ? '' : ' '}</span>
                <span data-tooltip-id={checkSelected([pIndex, sIndex, wIndex]) ? 'highlight-word' : ''}
                      id={`word-${pIndex}-${sIndex}-${wIndex}`}
                      className={`w-fit px-1 py-1
                                ${selectMode === '词' && checkSelected([pIndex, sIndex, wIndex]) ? 'bg-lime-500 text-white rounded-md' : ''}
                                ${getHighlightClass([pIndex, sIndex, wIndex])}`}
                      onClick={(event) => {
                        beforeSelected(event.target as HTMLElement);
                        if (selectMode === '词' && isWord(word)) handleWordClick(sentence, [pIndex, sIndex, wIndex]);
                      }}>
                  {word}
                </span>
              </span>
            )
          }
        </span>
          )
        }
        {/* 段落间间隔 */}
        <div className="w-full h-5"/>
      </Fragment>)
    }
  </>;
}