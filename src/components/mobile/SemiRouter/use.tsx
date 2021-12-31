import { useState } from "react";
import { RouterProp, RouterPushProp, RoutesPropTypes, SemiRouteType } from ".";
import { drawerZIndex } from "../constants/zIndexManage";
import { useMitt } from "../EventBus";
if (typeof window !== "undefined" && !window.drawerZIndex) {
  window.drawerZIndex = drawerZIndex;
}

const useRouter = (routes: RoutesPropTypes) => {
  const [halfRouteList, setHalfRouteList] = useState<RoutesPropTypes>([]);
  const [fullRouteList, setFullRouteList] = useState<RoutesPropTypes>([]);
  const [newPopTypeArray, setNewPopTypeArray] = useState<SemiRouteType[]>([]);
  const { emitter } = useMitt();
  const createNewRoute = ({
    name,
    param,
    drawerHeight,
    title,
    showBackIcon = true,
    showCloseIcon = true,
    isShowHeader = true,
  }: RouterPushProp) => {
    const curRoute = routes.find((r) => r.name === name);
    if (!curRoute) return undefined;
    const newRoute: RouterProp = {
      name: curRoute.name,
      Component: curRoute.Component,
      type: curRoute.type,
      drawerHeight: drawerHeight || curRoute.drawerHeight,
      title: title || curRoute.title,
      param: param || curRoute.param,
      zIndex: ++window.drawerZIndex,
      showBackIcon,
      showCloseIcon,
      isShowHeader,
    };
    setNewPopTypeArray([...newPopTypeArray, newRoute.type]);
    return newRoute;
  };

  const push = ({
    name,
    param,
    drawerHeight,
    title,
    showBackIcon,
    showCloseIcon,
    isShowHeader,
  }: RouterPushProp): void => {
    const newRoute = createNewRoute({
      name,
      param,
      drawerHeight,
      title,
      showBackIcon,
      showCloseIcon,
      isShowHeader,
    });
    if (newRoute) {
      if (newRoute.type === "half") {
        const timer = setTimeout(() => {
          setHalfRouteList([...halfRouteList, newRoute]);
          clearTimeout(timer);
        }, 0);
      }
      if (newRoute.type === "full") {
        const timer = setTimeout(() => {
          setFullRouteList([...fullRouteList, newRoute]);
          clearTimeout(timer);
        }, 0);
      }
    } else {
      console.error(`No route named '${name}' was found!`);
    }
  };

  const pop = () =>
    new Promise<void>((resolve) => {
      const curPopType = newPopTypeArray.pop();
      if (curPopType === "half") popHalf();
      if (curPopType === "full") popFull();
      setNewPopTypeArray([...newPopTypeArray]);
      resolve();
    });

  const popHalf = () => {
    const route = halfRouteList.pop();
    emitter.emit(route?.name + "_pop"); // pop触发事件
    setHalfRouteList([...halfRouteList]);
  };

  const popFull = () => {
    const route = fullRouteList.pop();
    emitter.emit(route?.name + "_pop"); // pop触发事件
    setFullRouteList([...fullRouteList]);
  };

  const replace = ({
    name,
    param,
    drawerHeight,
    title,
    showBackIcon,
    showCloseIcon,
  }: RouterPushProp): void => {
    const newRoute = createNewRoute({
      name,
      param,
      drawerHeight,
      title,
      showBackIcon,
      showCloseIcon,
    });
    if (newRoute) {
      if (newRoute.type === "half") {
        halfRouteList.pop();
        setHalfRouteList([...halfRouteList, newRoute]);
      }
      if (newRoute.type === "full") {
        fullRouteList.pop();
        setFullRouteList([...fullRouteList, newRoute]);
      }
    } else {
      console.error(`No route named '${name}' was found!`);
    }
  };

  const clearAllRouter = () =>
    new Promise<void>((resolve) => {
      setHalfRouteList([]);
      setFullRouteList([]);
      setNewPopTypeArray([]);
      resolve();
    });

  const clearHalfRouter = () =>
    new Promise<void>((resolve) => {
      setHalfRouteList([]);
      setNewPopTypeArray(newPopTypeArray.filter((item) => item === "full"));
      resolve();
    });

  const clearFullRouter = () =>
    new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        setFullRouteList([]);
        setNewPopTypeArray(newPopTypeArray.filter((item) => item === "half"));
        clearTimeout(timer);
      }, 0);
      resolve();
    });

  return {
    push,
    pop,
    replace,
    clearAllRouter,
    clearHalfRouter,
    clearFullRouter,
    halfRouteList,
    fullRouteList,
  };
};

export { useRouter };
