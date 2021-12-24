/*
 * @Author: HanFang
 * @Date: 2021-12-08 14:49:14
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-13 14:53:05
 */
import React, { useRef, useMemo } from "react";
import { rem } from "../constants/rem";
import { drawerZIndex } from "../constants/zIndexManage.js";

export type DrawerRef = {
  name: string;
  openAll(): void;
};

if (typeof window !== "undefined" && !window.drawerZIndex) {
  window.drawerZIndex = drawerZIndex;
}

export const DrawerContext = React.createContext<DrawerRef | null>(null);

export const useClass = (
  drawerType: string,
  drawerHeight?: string | number,
  direction?: string,
  levelName?: string,
  focus?: boolean
) => {
  const zIndex = useRef<number>(0); // 用来保存全局的zIndex
  const wrapHeight = useMemo(() => {
    if (drawerType !== "full") {
      return typeof drawerHeight === "number"
        ? `${drawerHeight}vh`
        : drawerHeight;
    }
    return "100vh";
  }, [drawerHeight, drawerType]);

  let willMount = useRef(true);
  if (willMount.current) {
    // 实现生命周期componentWillMount
    zIndex.current = window.drawerZIndex++;
    willMount.current = false;
  }

  const contentStyle = useMemo(
    () => ({
      borderRadius:
        drawerType !== "full"
          ? direction === "top"
            ? rem("0 0 24px 24px")
            : rem("24px 24px 0 0")
          : "unset",
      opacity: levelName ? (focus ? 1 : 0) : 1,
    }),
    [drawerType, direction, levelName, focus]
  );

  return { wrapHeight, zIndex, contentStyle };
};
