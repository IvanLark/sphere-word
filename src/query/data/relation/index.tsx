import {useGetWordRelation} from "../../api.ts";

/**
 * 单词关系页面
 * @param word
 * @constructor
 */
export default function QueryDataRelation({word}: {word: string}) {
  const { isPending, isError, isSuccess, data, error } = useGetWordRelation(word)
  return (<></>);
}