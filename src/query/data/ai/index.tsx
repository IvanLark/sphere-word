import {useGetWordAi} from "../../api.ts";

/**
 * AI解析页面
 * @param word
 * @constructor
 */
export default function QueryDataAi({ word }: { word: string }) {
  const { isPending, isError, isSuccess, data, error } = useGetWordAi(word);

  return (<>{word}</>);
}