import { useCallback, useEffect, useRef, useState } from "react";

// 节流
export function useThrottle(func: Function, wait: number) {
  const [previous, setPrevious] = useState(0);
  return useCallback(
    function (this: any) {
      const now = Date.now();
      const context = this;
      const arg = arguments;
      if (now - previous > wait) {
        setPrevious(now);
        func.apply(context, arg);
      }
    },
    [func, previous, wait]
  );
}
interface IPoint {
  func: Function;
  timer: any;
}
// 当事件触发后，一定时间内不再触发该事件，而如果重新触发，就会重新开始延长，debounce也分为两种，在延长周期前生效，和周期末生效
export function useDebounce(
  func: Function,
  wait: number,
  isImmediate: boolean = false,
  deep = []
) {
  let a: IPoint = { func, timer: null };
  const { current } = useRef(a);
  useEffect(() => {
    current.func = func;
  }, [current, func]);
  return useCallback(
    function (this: any) {
      const context = this;
      const args = arguments;
      if (current.timer) clearTimeout(current.timer); // 清除之前的时间延迟执行
      if (isImmediate) {
        if (!current.timer) {
          func.apply(context, args);
          current.timer = null;
        }
        current.timer = setTimeout(() => {
          current.timer = null;
        }, wait);
      } else {
        current.timer = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      }
    },
    [current, func, isImmediate, wait]
  );
}

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  if (key === undefined) return false;
  return key in object;
}
