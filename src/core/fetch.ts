import request from "./request";

import type { FetchRequestConfig, FetchResponse } from "./interface";

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {FetchRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const fetch = <D = Record<string, unknown>, T = Record<string, unknown>>(config: FetchRequestConfig<D, T>) => {
  return request.request<D, FetchResponse<T>>(config);
};

export default fetch;
