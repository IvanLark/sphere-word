import {useLocation, useNavigate} from "react-router-dom";
import {useWatcher} from "alova/client";
import {getBook} from "../../../api/methods/article.methods.ts";
import ScreenLoading from "../../../common/components/loader/screen-loading.tsx";
import React from "react";

export default function ReadBook () {

  const navigate = useNavigate();
  const location = useLocation();
  const { bookId } = location.state as { bookId: string };

  const {data, error, loading} = useWatcher(getBook(bookId), [bookId], { immediate: true });

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return <ScreenLoading />;
  }

  return (
    <div className="w-11/12 px-3 my-[72px] flex flex-col items-center">
      <p className="absolute top-5 w-full text-center text-3xl font-bold">书籍详情</p>
      <div className="w-full flex flex-col">
        <div className="flex justify-around p-1 border-black border-2 rounded-md">
          <div className="">
            <p className="text-xl font-bold text-center my-1">书籍</p>
            <img alt="" className="w-full h-[calc(35vw)] object-cover" loading="lazy" src={data.coverImg}/>
            <p className="text-center text-[18px]">{data.bookNameCn}</p>
          </div>
          <div className="">
            <p className="text-xl font-bold text-center my-1">作者</p>
            <img alt="" className="w-full h-[calc(35vw)] object-cover" loading="lazy" src={data.authorImg}/>
            <p className="text-center text-[18px]">{data.authorName}</p>
          </div>
        </div>

        <div className="my-6 flex flex-col gap-4">
          <p className="w-full text-center text-2xl my-2 font-bold">章节列表</p>
          {
            data.chapters.map((chapter, index) =>
              <div className="w-full border-2 rounded-md border-black px-4 py-2
                active:bg-black active:bg-opacity-35 active:scale-105 transition-transform duration-300"
                onClick={() => {
                  navigate('/article', {state: {type: 'book', article: `${bookId}:${chapter.chapterId}`, bookName: data.bookNameCn}})
                }}
                key={index}
              >
                <p className="text-xl font-bold mb-1">{chapter.title}</p>
                { chapter.abbrev && <p>{chapter.abbrev.replace('&emsp;', '')}</p> }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}