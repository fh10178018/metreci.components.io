import { useState } from "react";
import { RouterProp, RouterPushProp, RoutesPropTypes, SemiRouteType } from ".";
import { drawerZIndex } from "../constants/zIndexManage";
import { useMitt } from "../EventBus";
if (typeof window !== "undefined" && !window.drawerZIndex) {
  window.drawerZIndex = drawerZIndex;
}

type RouteListPropTypes = {
  [key: string]: RoutesPropTypes;
};

function FilterObject(obj: any, key: string): any {
  const keys = Object.keys(obj);
  const filterKeys = keys.filter((item) => item !== key);
  const res: {
    [key: string]: any;
  } = {};
  filterKeys.forEach((item) => {
    res[key] = obj[key];
  });
  return res;
}

const useRouter = (routes: RoutesPropTypes) => {
  const [routeList, setRouteList] = useState<RouteListPropTypes>({});
  const [halfRouteList, setHalfRouteList] = useState<RoutesPropTypes>([]);
  const [fullRouteList, setFullRouteList] = useState<RoutesPropTypes>([]);
  const [newPopTypeArray, setNewPopTypeArray] = useState<SemiRouteType[]>([]);
  const emitter = useMitt();
  const createNewRoute = ({
    name,
    param,
    drawerHeight,
    title,
    showBackIcon = true,
    showCloseIcon = true,
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
        setTimeout(() => {
          setHalfRouteList([...halfRouteList, newRoute]);
        }, 0);
      }
      if (newRoute.type === "full") {
        setFullRouteList([...fullRouteList, newRoute]);
      }
      // 尝试新的router方法
      const FilterPop = newPopTypeArray.filter(
        (item, index) => item !== newPopTypeArray[index + 1]
      );
      const KeyName = newRoute.type + FilterPop.length;
      const curRoutes = routeList[KeyName];
      if (!curRoutes) {
        setTimeout(() => {
          setRouteList({
            ...routeList,
            KeyName: [newRoute],
          });
        }, 0);
      } else {
        setTimeout(() => {
          setRouteList({
            ...routeList,
            KeyName: [...curRoutes, newRoute],
          });
        }, 0);
      }
      console.log(routeList);
    } else {
      console.error(`No route named '${name}' was found!`);
    }
  };

  const pop = () => {
    const FilterPop = newPopTypeArray.filter(
      (item, index) => item !== newPopTypeArray[index]
    );
    if (FilterPop.length > 0) {
      const KeyName = FilterPop.slice(-1)[0] + FilterPop.length;
      const curRoutes = routeList[KeyName];
      if (curRoutes) {
        curRoutes.pop();
        if (curRoutes.length === 0) {
          const newRouteList = FilterObject(routeList, KeyName);
          setTimeout(() => {
            setRouteList(newRouteList);
          }, 0);
        } else {
          setTimeout(() => {
            setRouteList({
              ...routeList,
              KeyName: [...curRoutes],
            });
          }, 0);
        }
      }
    }
    console.log(routeList);

    const curPopType = newPopTypeArray.pop();
    if (curPopType === "half") popHalf();
    if (curPopType === "full") popFull();
    setNewPopTypeArray([...newPopTypeArray]);
  };

  const popHalf = () => {
    const route = halfRouteList.pop();
    emitter.emitter.emit(route?.name + "_pop"); // pop触发事件
    setHalfRouteList([...halfRouteList]);
  };

  const popFull = () => {
    const route = fullRouteList.pop();
    emitter.emitter.emit(route?.name + "_pop"); // pop触发事件
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
      setFullRouteList([]);
      setNewPopTypeArray(newPopTypeArray.filter((item) => item === "half"));
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
