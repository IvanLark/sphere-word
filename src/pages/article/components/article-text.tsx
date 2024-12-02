import {isPunct, isWord} from "../utils/text-process.util.ts";
import {SelectMode} from "../hooks/use-article-state.ts";
import {Position} from "../hooks/use-article-state.ts";
import {Fragment} from "react";
import {AudioPlayer} from "react-audio-play";
import getParagraphAudioUrls from "../utils/get-paragraph-audio-urls.ts";

interface ArticleTextProps {
  text: Array<Array<Array<string>>>;
  selectMode: SelectMode;
  getHighlightClass: (position: Position) => string;
  checkSelected: (position: Position) => boolean;
  handleWordClick: (sentence: Array<string>, position: Position) => void;
  handleSentenceClick: (sentence: Array<string>, position: Position) => void;
  handleParagraphClick: (sentences: Array<Array<string>>, position: Position) => void;
  beforeSelected: (target: HTMLElement) => void;
  showTranslate: boolean;
  showAudio: boolean;
  translations: Record<string, Array<string>>;
  page: number;
}

export default function ArticleText({text, page, selectMode, getHighlightClass, checkSelected, handleWordClick, handleSentenceClick, handleParagraphClick, beforeSelected, showAudio, showTranslate, translations}: ArticleTextProps) {

  return <>
    {
      text.map((paragraph, pIndex) => <>{
        paragraph[0][0].startsWith('https://enganglish.oss-cn-beijing.aliyuncs.com') ?
          <img alt="" className="w-full h-[calc(35vw)] object-cover my-3" loading="lazy" src={paragraph[0][0]}/> :
          <Fragment key={pIndex}>
            {/* 段落开头空格 */}
            <span className="inline-block w-4" key={pIndex}/>
            <span
              className={`${selectMode === '段' && checkSelected([page, pIndex, -1, -1]) ? "bg-lime-500 text-white rounded-md" : ""}`}
              onClick={(event) => {
                beforeSelected(event.target as HTMLElement);
                if (selectMode === '段') handleParagraphClick(paragraph, [page, pIndex, -1, -1]);
              }}
              id={`paragraph-${page}-${pIndex}`}
            >
              {
                paragraph.map((sentence, sIndex) =>
                  <span key={sIndex}
                        className={`leading-loose
                                      ${selectMode === '句' && checkSelected([page, pIndex, sIndex, -1]) ? "bg-lime-500 text-white rounded-md" : ""}`}
                        style={{fontSize: '16px'}}
                        onClick={(event) => {
                          beforeSelected(event.target as HTMLElement);
                          if (selectMode === '句') handleSentenceClick(sentence, [page, pIndex, sIndex, -1]);
                        }}
                        id={`sentence-${page}-${pIndex}-${sIndex}`}
                  >
                        {
                          sentence.map((word, wIndex) =>
                            <span key={wIndex}>
                              {/* 单词间空格 */}
                              <span>{isPunct(word) || word.includes("'") ? '' : ' '}</span>
                              <span id={`word-${page}-${pIndex}-${sIndex}-${wIndex}`}
                                data-tooltip-id={checkSelected([page, pIndex, sIndex, wIndex]) ? 'highlight-word' : ''}
                                className={`w-fit ${isPunct(word) || word.includes("'") ? '' : 'px-0.5'} py-1 font-article
                                              ${selectMode === '词' && checkSelected([page, pIndex, sIndex, wIndex]) ? 'bg-lime-500 text-white rounded-md' : ''}
                                              ${getHighlightClass([page, pIndex, sIndex, wIndex])}`}
                                onClick={(event) => {
                                  beforeSelected(event.target as HTMLElement);
                                  if (selectMode === '词' && isWord(word)) handleWordClick(sentence, [page, pIndex, sIndex, wIndex]);
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
            </span>
            {/* 段落间间隔 */}
            <div className="w-full h-[10px]"/>

            {
              showAudio &&
              <>
                {getParagraphAudioUrls(paragraph).map((item, index) =>
                  <div className="w-full flex flex-row my-2" key={index}>
                    {
                      <span
                        className="flex justify-center items-center text-[16px] w-24 h-[45px] border-y-2 border-l-2 border-black rounded-l-md">
                          {
                            item.from !== item.to ?
                              `第${item.from + 1}-${item.to + 1}句` :
                              `第${item.from + 1}句`
                          }
                        </span>
                    }
                    <AudioPlayer src={item.url}
                                 style={{
                                   width: '100%',
                                   height: '45px',
                                   borderWidth: '2px',
                                   borderColor: 'black',
                                   borderTopLeftRadius: '0px',
                                   borderBottomLeftRadius: '0px',
                                   borderTopRightRadius: '6px',
                                   borderBottomRightRadius: '6px',
                                 }}
                    />
                  </div>
                )}
                <div className="w-full h-3"/>
              </>
            }

            {
              showTranslate && Object.prototype.hasOwnProperty.call(translations, String(page)) && translations[String(page)].length === text.length &&
              <>
                <span className="inline-block w-4"/>
                <span className="leading-loose">{translations[String(page)][pIndex]}</span>
                <div className="w-full h-3"/>
              </>
            }
          </Fragment>
      }</>)
    }
  </>;
}