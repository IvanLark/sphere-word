import { Edge, Node } from "../types.ts";
import { useState } from "react";
import QueryDataCore from "./core";
import QueryDataRelation from "./relation";
import CoreTab from "./CoreTab.tsx";

interface QueryDataParams {
  word: string;
  handleSkipWord: (word: string, nodes: Array<Node>, edges: Array<Edge>) => void;
}

export default function QueryData({ word, handleSkipWord }: QueryDataParams) {
  const [pickedPage, setPickedPage] = useState(0);
  // @IvanLark  这里改成了数字(其实我一般命名成tabIndex)，这样后面和map一起使用好比较一点

  // @IvanLark !这里改了一下按React规范内部组件都应该用首字母大写的组件形式
  function TabPag() {
    switch (pickedPage) {
      case 0:
        return <QueryDataCore word={word}></QueryDataCore>;
      case 1:
        return <QueryDataRelation word={word}></QueryDataRelation>;
      default:
        return <></>;
    }
  }

  return (
    <>
      {/* <div className="w-screen h-[calc(100vh-280px)] bg-transparent snap-end pointer-events-none"></div> */}
      {/* // **snap占位div */}
      <div className="w-screen h-[45vh] bg-transparent snap-start pointer-events-none"></div>
      <div className="w-screen min-h-[calc(100vh-200px)] px- relative bg-gray-100 snap-start">
        {/* // **divider */}
        <div className="w-full h-20 relative"><div className="w-56 h-9 rounded-full bg-gray-200 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div></div>
        {/* // **tabs */}
        <CoreTab tabIndex={pickedPage} setTabIndex={setPickedPage} />

        <TabPag />
        {/* {showTabPag()} */}
      </div>
    </>
  );
}