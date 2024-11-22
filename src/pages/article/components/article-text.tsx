import {isPunct, isWord} from "../utils/text-process.util.ts";
import {SelectMode} from "../hooks/use-article-state.ts";
import {Position} from "../hooks/use-article-state.ts";
import {Fragment} from "react";

interface ArticleTextProps {
  text: Array<Array<Array<string>>>;
  selectMode: SelectMode;
  getHighlightClass: (position: Position) => string;
  checkSelected: (position: Position) => boolean;
  handleWordClick: (sentence: Array<string>, position: Position) => void;
  handleSentenceClick: (sentence: Array<string>, position: Position) => void;
  beforeSelected: (target: HTMLElement) => void;
  showTranslate: boolean;
  translations: Array<string>;
}

export default function ArticleText({text, selectMode, getHighlightClass, checkSelected, handleWordClick, handleSentenceClick, beforeSelected, showTranslate, translations}: ArticleTextProps) {

  return <>
    {
      text.map((paragraph, pIndex) => <Fragment key={pIndex}>
        {/* 段落开头空格 */}
        <span className="inline-block w-4" key={pIndex}/>
        {
          paragraph.map((sentence, sIndex) =>
              <span key={sIndex} id={`sentence-${pIndex}-${sIndex}`}
                    className={`leading-loose
                                ${selectMode === '句' && checkSelected([pIndex, sIndex, -1]) ? "bg-lime-500 text-white rounded-md" : ""}`}
                    style={{ fontSize: '16px' }}
                    onClick={(event) => {
                      beforeSelected(event.target as HTMLElement);
                      if (selectMode === '句') handleSentenceClick(sentence, [pIndex, sIndex, -1]);
                    }}>
          {
            sentence.map((word, wIndex) =>
              <span key={wIndex}>
                {/* 单词间空格 */}
                <span>{isPunct(word) || word.includes("'") ? '' : ' '}</span>
                <span data-tooltip-id={checkSelected([pIndex, sIndex, wIndex]) ? 'highlight-word' : ''}
                      id={`word-${pIndex}-${sIndex}-${wIndex}`}
                      className={`w-fit ${isPunct(word) || word.includes("'") ? '' : 'px-0.5'} py-1 font-article
                                ${selectMode === '词' && checkSelected([pIndex, sIndex, wIndex]) ? 'bg-lime-500 text-white rounded-md' : ''}
                                ${getHighlightClass([pIndex, sIndex, wIndex])}`}
                      onClick={(event) => {
                        beforeSelected(event.target as HTMLElement);
                        if (selectMode === '词' && isWord(word)) handleWordClick(sentence, [pIndex, sIndex, wIndex]);
                      }}>
                  {
                    word !== '``' && word !== '\'\'' ? word : '"'
                  }
                </span>
              </span>
            )
          }
        </span>
          )
        }
        {/* 段落间间隔 */}
        <div className="w-full h-5"/>
        {
          showTranslate && translations.length === text.length &&
          <>
            <span className="inline-block w-4"/>
            <span className="leading-loose">{translations[pIndex]}</span>
            <div className="w-full h-5"/>
          </>
        }
      </Fragment>)
    }
  </>;
}