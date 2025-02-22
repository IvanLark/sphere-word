import {useWatcher} from "alova/client";
import {getBooks} from "../../../api/methods/article.methods.ts";
import ScreenLoading from "../../../common/components/loader/screen-loading.tsx";
import React, {useEffect, useRef, useState} from "react";
import BookCard from "../../../common/components/card/book-card.tsx";
import ContinuousTabs from "../../../common/components/tabs/continuous-tabs.tsx";
import {useNavigate} from "react-router-dom";

export default function ReadBooks () {

  const tabPages = {
    '一级': '1',
    '二级': '2',
    '三级': '3',
    '四级': '4',
    '五级': '5'
  }

  return (
    <div className="w-[98%] px-3 my-[72px] flex flex-col items-center">
      {/* 标题 */}
      <p className="absolute top-5 w-full text-center text-3xl font-bold">原著小说</p>

      <ContinuousTabs<string> tabs={tabPages} isLoading={false} id="read-books">
        {(value) => <LevelBooks level={value} />}
      </ContinuousTabs>
    </div>
  );
}

function LevelBooks({level}: { level: string }) {

  const navigate = useNavigate();

  const {data, error, loading} = useWatcher(getBooks(level), [level], {immediate: true});

  const [select, setSelect] = useState<number|null>(null);

  function handleClickOutside (event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      if (select !== null && !event.target.closest('#sub-books') && !event.target.closest(`#book-card-${select}`)) {
        setSelect(null);
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return <ScreenLoading />;
  }

  return (
    <div className="w-full grid grid-cols-3 gap-x-1 gap-y-4 my-4 relative transition-all duration-300">
      {/* 蒙版 */}
      {
        select !== null &&
        <div className="absolute inset-0 bg-gray-500 opacity-75 z-0"/>
      }
      {
        data.map((book, index) => <>
          <BookCard title={book.bookNameCn} img={book.coverImg} key={index} id={`book-card-${index}`}
                    className={index === select ? 'border-green-500 border-4 scale-105' : ''}
                    onClick={() => {
                      if (book.isBookSeries === '1') {
                        setSelect(index);
                        setTimeout(() => {
                          const target = document.getElementById('sub-books');
                          const container = document.getElementById('read-container');
                          if (target && container) {
                            container.scrollTo({
                              top: target.offsetTop + 100,
                              behavior: 'smooth'
                            });
                          }
                        }, 100);
                      }
                      else navigate('/read/book', {state: {bookId: book.bookId}});
                    }}
          />
          {
            index === select &&
            <div id="sub-books"
                 className="w-full z-10 bg-white col-span-full border-2 border-black">
              <p className="col-span-full text-center text-2xl py-2 border-b-2 border-black">系列图书</p>
              <div className="py-2 px-2 grid grid-cols-3 gap-x-1 gap-y-4 max-h-[35rem] overflow-y-auto">
                {
                  book.seriesBooks!.map((subBook, subIndex) =>
                    <BookCard title={subBook.bookNameCn} img={subBook.coverImg} id={`sub-book-card-${subIndex}`} key={subIndex}
                              onClick={() => navigate('/read/book', {state: {bookId: subBook.bookId}})}
                    />
                  )
                }
              </div>
            </div>
          }
        </>)
      }
    </div>
  );

}

