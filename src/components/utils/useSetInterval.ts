/*
 * @Chinese description: enter your description
 * @English description: enter your description
 * @Autor: rjguan
 * @Date: 2020-07-31 14:58:29
 * @LastEditors: rjguan
 * @LastEditTime: 2020-08-28 11:02:33
 */
import { useEffect, useRef } from "react";

function useSetInterval(callback: any, delay: null | number) {
  if (!(callback instanceof Function)) {
    throw new Error("callback 参数必须是函数！");
  }
  if (!(delay === null || typeof delay === "number")) {
    throw new Error("delay 必须是 null 或者数字！");
  }
  const savedCallback: any = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    let id: any = 0;
    const tick = () => {
      const returnValue = savedCallback.current();
      if (returnValue) {
        console.log("come in");
        if (returnValue instanceof Function) {
          returnValue();
        } else {
          throw new Error("返回值必须是函数！");
        }
        clearTimeout(id);
        return;
      }
      id = setTimeout(tick, delay);
    };
    id = setTimeout(tick, delay);
    return () => clearTimeout(id);
  }, [delay]);
}

export default useSetInterval;
