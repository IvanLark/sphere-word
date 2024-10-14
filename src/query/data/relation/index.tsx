import {useGetWordRelation} from "../../api.ts";

export default function QueryDataRelation({word}: {word: string}) {
  useGetWordRelation(word)
  return (<></>);
}