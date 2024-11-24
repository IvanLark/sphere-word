import React, {useState} from "react";
import ContinuousTabs from "../../../common/components/tabs/continuous-tabs.tsx";
import ConfirmButton from "../components/confirm-button.tsx";
import {useNavigate} from "react-router-dom";
import Radio from "../../../common/components/radio.tsx";
import {toast} from "../../../common/utils/toast.util.tsx";

export default function ReadInput () {

  const navigate = useNavigate();

  const [text, setText] = useState<string>('');
  const [level, setLevel] = useState<number>(0);

  const adaptOptions = {
    '小学': 0,
    '高中': 1,
    '四六级': 2
  }

  function checkText () {
    if (text.length === 0) {
      toast.error('输入不能为空');
      return false;
    }
    if (text.length > 10000) {
      toast.error('输入过长！');
      return false;
    }
    return true;
  }

  const tabPages = {
    '文本': <>
      <p className="w-full">输入英文文本，帮你解析。</p>
      <textarea className="w-full h-96 px-1.5 py-1 rounded-md border-2 border-black hide-scrollbar text-[18px]"
                placeholder="请输入你需要阅读的文本，并且以换行为段落间隔"
                value={text}
                onChange={(event) => setText(event.target.value)}
      />
      <ConfirmButton onClick={() => { if (checkText()) navigate('/article', {state: {type: 'text', article: text}}) }}/>
    </>,
    '翻译': <>
      <p className="w-full">输入中文，按照你选择的难度翻译成英文。</p>
      <Radio label='难度' value={level} onChange={(value) => setLevel(value)} options={adaptOptions}/>
      <textarea className="w-full h-96 px-1.5 py-1 rounded-md border-2 border-black hide-scrollbar text-[18px]"
                placeholder="请输入你需要翻译的文本，并且以换行为段落间隔"
                value={text}
                onChange={(event) => setText(event.target.value)}
      />
      <ConfirmButton onClick={() => { if (checkText()) navigate('/article', {state: {type: 'translate', article: text, level: level}}) }}/>
    </>,
    '链接': <>
      <p className="w-full">输入文章链接，解析文章内容。某些网站因技术问题无法解析，请谅解。</p>
      <input className="w-full h-16 px-2 py-1 border-2 border-black rounded-md text-[18px]"
             placeholder="请输入要解析的文章链接"
             value={text}
             onChange={(event) => setText(event.target.value)}
      />
      <div className="btn-trans btn-scale-sm w-full py-2 px-3 my-2 bg-white rounded-lg shadow-md border-black
        border-2 flex items-center justify-center hover:shadow-lg text-2xl font-bold"
           onClick={() => { if (checkText()) navigate('/article', {state: {type: 'link', article: text}}) }}>
        确认
      </div>
    </>,
    '适配': <>
      <p className="w-full">就是把文章难度适配（降低）到某个水平。目前该功能仅体验，有待优化。</p>
      <Radio label='难度' value={level} onChange={(value) => setLevel(value)} options={adaptOptions}/>
      <textarea className="w-full h-96 px-1.5 py-1 rounded-md border-2 border-black hide-scrollbar text-[18px]"
                placeholder="请输入你需要适配的文本，并且以换行为段落间隔"
                value={text}
                onChange={(event) => setText(event.target.value)}
      />
      <ConfirmButton onClick={() => { if (checkText()) navigate('/article', {state: {type: 'adapt', article: text, level: level}}) }}/>
    </>
  }

  return (
    <div className="w-11/12 px-3 my-[72px] flex flex-col items-center gap-4 transition-all duration-300">
      {/* 标题 */}
      <p className="absolute top-5 w-full text-center text-3xl font-bold">手动输入</p>
      <ContinuousTabs<JSX.Element> tabs={tabPages} isLoading={false}>
        {(value) => value}
      </ContinuousTabs>
    </div>
  );
}