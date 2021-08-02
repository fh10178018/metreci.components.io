import { useCallback, useRef } from "react";
import { DrawerPropTypes } from ".";
import { drawerZIndex } from "../constants/zIndexManage.js";

if (typeof window !== "undefined" && !(window as any).drawerZIndex) {
  (window as any).drawerZIndex = drawerZIndex;
}

export const useClass = (
  drawerType: DrawerPropTypes["drawerType"],
  drawerHeight: DrawerPropTypes["drawerHeight"],
  direction: DrawerPropTypes["direction"],
  hasAnimation: DrawerPropTypes["hasAnimation"]
) => {
  const zIndex = useRef<number>(0); // 用来保存全局的zIndex
  const wrapHeight = useCallback(() => {
    if (drawerType !== "full") {
      return typeof drawerHeight === "number"
        ? `${drawerHeight}vh`
        : drawerHeight;
    }
    return "100vh";
  }, [drawerHeight, drawerType])();

  let willMount = useRef(true);
  if (willMount.current) {
    // 实现生命周期componentWillMount
    zIndex.current = (window as any).drawerZIndex++;
    willMount.current = false;
  }

  const contentStyle = useCallback(
    () => ({
      borderRadius:
        drawerType !== "full"
          ? direction === "bottom"
            ? "12px 12px 0 0"
            : direction === "top"
            ? " 0 0 12px 12px"
            : "unset"
          : "unset",
      overflow: "hidden",
      transition: hasAnimation
        ? "transform 0.3s cubic-bezier(0.7,0.3,0.1,1)"
        : "none",
    }),
    [drawerType, direction, hasAnimation]
  )();

  return [wrapHeight, zIndex, contentStyle] as const;
};

export const useInput = () => {};
