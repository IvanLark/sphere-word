import ArticleCard from "../../../common/components/card/article-card.tsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRequest, useWatcher} from "alova/client";
import {getPublishArticles, searchArticles} from "../../../api/methods/article.methods.ts";
import ScreenLoading from "../../../common/components/loader/screen-loading.tsx";
import Select from "../../../common/components/select.tsx";
import ContinuousTabs from "../../../common/components/tabs/continuous-tabs.tsx";

export default function ReadMain () {

  const navigate = useNavigate();

  const pageTabs = {
    '短文推送': <ReadPublish />,
    '短文搜索': <ReadSearch />
  }

  return (
    <div className="w-11/12 px-3 my-[72px] flex flex-col items-center gap-4">
      {/* 标题 */}
      <p className="absolute top-5 w-full text-center text-3xl font-bold">阅读</p>
      {/* 进入保存文章 */}
      <div className="btn-trans btn-scale-sm w-full p-4 bg-white rounded-lg shadow-md border-black
          border-2 flex items-center justify-center hover:shadow-lg text-3xl font-bold relative"
           onClick={() => navigate('/read/keep')}
      >
        收藏文章
        <span className="absolute right-10">🥰</span>
      </div>

      <div className="w-full flex flex-row items-center gap-4">
        {/* 进入自输入 */}
        <div className="btn-trans btn-scale-sm w-full p-4 bg-white rounded-lg shadow-md border-black
          border-2 flex items-center justify-center hover:shadow-lg text-3xl font-bold"
             onClick={() => navigate('/read/input')}
        >
          自己输入
          <span>✍</span>
        </div>
        {/* 进入书籍阅读 */}
        <div className="btn-trans btn-scale-sm w-full p-4 bg-white rounded-lg shadow-md border-black
          border-2 flex items-center justify-center hover:shadow-lg text-3xl font-bold"
             onClick={() => navigate('/read/books')}
        >
          原著小说
          <span>📖</span>
        </div>
      </div>

      <ContinuousTabs<JSX.Element|JSX.Element[]> tabs={pageTabs} isLoading={false} >
        { (value) => value }
      </ContinuousTabs>
    </div>
  );
}

function ReadSearch () {

  const [level, setLevel] = useState<string>('小学');
  const [topic, setTopic] = useState<string>('真题');

  const levelOptions = [
    {value: '小学', label: '小学'},
    {value: '中考', label: '中考'},
    {value: '高考', label: '高考'},
    {value: '四级', label: '四级'},
    {value: '六级', label: '六级'},
    {value: '考研', label: '考研'},
    {value: '专四', label: '专四'},
    {value: '专八', label: '专八'}
  ]

  const topicOptions = [
    {value: '真题', label: '真题'},
    {value: '健康', label: '健康'},
    {value: '商业', label: '商业'},
    {value: '娱乐', label: '娱乐'},
    {value: '政经', label: '政治经济'},
    {value: '故事', label: '故事'},
    {value: '教育', label: '教育'},
    {value: '文化', label: '文化'},
    {value: '环境', label: '环境'},
    {value: '生活方式', label: '生活方式'},
    {value: '社会', label: '社会'},
    {value: '科技', label: '科技'},
    {value: '职场', label: '职场'},
    {value: '自然', label: '自然'}
  ]

  const {data, loading, error, send} = useWatcher(
    () => searchArticles(level, topic), [level, topic],
    {
      immediate: true,
      force: ({args}) => args[0]
    });

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return <ScreenLoading />;
  }

  return (<>
    <div className="w-full flex flex-row items-center justify-between gap-1">
      <Select label="难度" value={level} onChange={setLevel} options={levelOptions}
              selectClassName="pr-1.5 pl-0.5 w-fit h-[42px]" spanClassName="w-fit h-[42px] text-nowrap shrink-0" />
      <Select label="话题" value={topic} onChange={setTopic} options={topicOptions}
              selectClassName="pr-1 pl-0 w-fit h-[42px]" spanClassName="w-fit h-[42px] text-nowrap shrink-0" />
      <span className="h-[42px] w-[50px] flex items-center justify-center border-2 border-black rounded-md active:scale-105 active:bg-gray-300"
            onClick={() => send(true)}
      >
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="6772" width="30" height="30"><path
          d="M733.04 379.104a264.112 264.112 0 0 0-468.112 41.76 14.336 14.336 0 0 1-17.968 8.16l-20.256-7.008a12.352 12.352 0 0 1-7.456-16.192 312.112 312.112 0 0 1 556.736-48.56l12.704-44.352a16 16 0 0 1 7.632-9.584l24.752-13.712a14.464 14.464 0 0 1 20.912 16.64l-38.128 132.96a11.136 11.136 0 0 1-13.76 7.632l-132.96-38.128a14.464 14.464 0 0 1-3.04-26.56l24.752-13.712a16 16 0 0 1 12.16-1.392l42.032 12.048z m-447.52 280.352a264.112 264.112 0 0 0 468.112-41.76 14.336 14.336 0 0 1 17.968-8.16l20.256 7.008a12.352 12.352 0 0 1 7.44 16.176c-46.368 118.032-160.8 199.072-290.432 199.072-110.96 0-210.768-59.296-266.304-150.432l-12.704 44.288a16 16 0 0 1-7.616 9.584l-24.752 13.712a14.464 14.464 0 0 1-20.928-16.64l38.128-132.96a11.136 11.136 0 0 1 13.76-7.632l132.976 38.128a14.464 14.464 0 0 1 3.04 26.56l-24.768 13.712a16 16 0 0 1-12.16 1.392l-42.016-12.048z"
          fill="#000000" p-id="6773"></path>
        </svg>
      </span>
    </div>

    {/* 文章列表 */}
    {
      data.map((article, index) =>
        <ArticleCard key={index} articleFace={article}/>
      )
    }
  </>);
}

function ReadPublish() {

  const {data, error, loading} = useRequest(getPublishArticles());

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return <ScreenLoading/>;
  }

  return (<>
    {/* 文章列表 */}
    {
      data.map((article, index) =>
        <ArticleCard key={index} articleFace={article}/>
      )
    }
  </>);
}