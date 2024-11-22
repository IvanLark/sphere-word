import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import {BASE_URL} from "./constants.ts";
import ReactHook from 'alova/react';

/*export interface Result<T> {
  code: number;
  data: T;
  msg: string;
}*/

const alova = createAlova({
  requestAdapter: adapterFetch(),
  baseURL: BASE_URL,
  statesHook: ReactHook,
  // 请求拦截器
  beforeRequest(method) {
    // 鉴权
    method.config.headers['Content-Type'] = 'application/json';
    method.config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    // 缓存
    if (method.meta?.cache) {
      method.config.cacheFor = {
        mode: 'restore',
        expire: Infinity
      };
    } else {
      method.config.cacheFor = null;
    }
    // gzip
    if (method.meta?.gzip) {
      method.config.headers['Accept-Encoding'] = 'gzip';
    }
  },
  // 响应拦截器
  responded: async (response) => {
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.msg);
    } else {
      return json.data;
    }
  }
});

export default alova;