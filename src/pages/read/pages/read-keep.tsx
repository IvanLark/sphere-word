import {useRequest} from "alova/client";
import {getKeepArticleList} from "../../../api/methods/article.methods.ts";
import ScreenLoading from "../../../common/components/loader/screen-loading.tsx";
import React from "react";
import ArticleCard from "../../../common/components/card/article-card.tsx";

export default function ReadKeep () {

  const {data, error, loading} = useRequest(getKeepArticleList(), {force: true});

  if (error) {
    throw new Error('获取数据错误');
  }
  if (loading || data === undefined) {
    return <ScreenLoading />;
  }

  return (
    <div className="w-11/12 px-3 my-[72px] flex flex-col items-center gap-4">
      {/* 标题 */}
      <p className="absolute top-5 w-full text-center text-3xl font-bold">收藏文章</p>
      {/* 文章列表 */}
      {
        data.length > 0 ?
          data.map((article, index) =>
            <ArticleCard key={index} articleFace={article} keep={true}/>
          ) :
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
            你还没有收藏文章哦
          </span>
      }
    </div>
  );
}