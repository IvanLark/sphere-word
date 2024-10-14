import {Edge, Node} from "../types.ts";

interface History {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

export default function QueryGraph({ history }: { history: History }) {
  return (<>{history}</>);
}