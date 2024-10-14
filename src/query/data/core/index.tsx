import {useGetWordCore} from "../../api.ts";

export default function QueryDataCore({word}: {word: string}) {
  useGetWordCore(word);
  return (<></>);
}