import ArticleCard from "../../../common/components/card/article-card.tsx";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useRequest} from "alova/client";
import {getPublishArticles} from "../../../api/methods/article.methods.ts";
import ScreenLoading from "../../../common/components/loader/screen-loading.tsx";

export default function ReadPublish () {

  const navigate = useNavigate();

  const {data, loading, error} = useRequest(getPublishArticles());

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return <ScreenLoading />;
  }

  return (
    <div className="w-11/12 px-3 my-[72px] flex flex-col items-center gap-4">
      {/* 标题 */}
      <p className="absolute top-5 w-full text-center text-3xl font-bold">阅读推送</p>
      {/* 进入自输入 */}
      <div className="btn-trans btn-scale-sm w-full p-4 bg-white rounded-lg shadow-md border-black
          border-2 flex items-center justify-center hover:shadow-lg text-3xl font-bold"
           onClick={() => navigate('/read/input')}
      >
        自己输入
      </div>
      {/* 进入保存文章 */}
      <div className="btn-trans btn-scale-sm w-full p-4 bg-white rounded-lg shadow-md border-black
          border-2 flex items-center justify-center hover:shadow-lg text-3xl font-bold"
           onClick={() => navigate('/read/keep')}
      >
        收藏文章
      </div>
      {/* 进入书籍阅读 */}
      <div className="btn-trans btn-scale-sm w-full p-4 bg-white rounded-lg shadow-md border-black
          border-2 flex items-center justify-center hover:shadow-lg text-3xl font-bold"
           onClick={() => navigate('/read/books')}
      >
        原著小说
      </div>
      {/* 推荐文章 */}
      {
        data.map((article, index) =>
          <ArticleCard key={index} articleFace={article}/>
        )
      }
    </div>
  );
}