import useDepEffect from "@/hooks/useDepEffect";
import useMount from "@/hooks/useMount";
import { useCallback, useRef, useState } from "react";
import { FetchOptions, FetchRequestConfig, FetchResponse } from "./interface";
import request from "./request";

/**
 * @description: hook请求
 * @generic T 请求参数
 * @generic R 响应结构
 * @param {FetchRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const useFetch = <T = Record<string, unknown>, R = Record<string, unknown>>(config: FetchRequestConfig<T, R>, options?: FetchOptions) => {
  // loading状态
  const [loading, setLoading] = useState<boolean>(false);
  // 接口返回的数据
  const [data, setData] = useState<R>();

  const configRef = useRef(config);
  configRef.current = config;

  // * 异步请求
  const requestFn = useCallback((data?: T): Promise<FetchResponse<R>> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      request
        .request<T, FetchResponse<R>>({ ...configRef.current, data })
        .then((res) => {
          setData(res.data);
          resolve(res);
          return res;
        })
        .catch((err) => {
          reject(err);
          return { err };
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  /**
   * 发送请求
   */
  const sendRequest = (data?: T) => requestFn(data);

  /**
   * 取消请求
   * @param url 取消的url名称
   * @returns void
   */
  const cancel = () => request.cancelRequest(configRef.current.url);

  /**
   * 取消全部请求
   * @returns
   */
  const cancelAll = () => request.cancelAllRequest();

  useMount(() => {
    if (!options?.manual) {
      requestFn();
    }
  });

  useDepEffect(() => {
    if (!options?.manual) {
      requestFn();
    }
  }, [configRef.current]);

  return { loading, data, sendRequest, cancel, cancelAll };
};

export default useFetch;
