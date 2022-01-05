import * as React from "react";
import { RouterPushProp, LocalRoutesPropTypes } from ".";

interface DrawerGroupContextItemProps {
  pop?: () => Promise<void>; // 关闭当前最高的浮层，通过pop出history队列
  replace?: (value: RouterPushProp) => void; // 和push一样，区别是，会替换history中最后一个route
  clear?: () => Promise<void>; // 清除所有router组件
  clearHalfRouter?: () => Promise<void>; // 清除所有半浮层的router组件
  clearFullRouter?: () => Promise<void>; // 清除所有全浮层的router组件
  push?: (value: RouterPushProp) => void; // 唤起组件，push到history队列中
  history?: LocalRoutesPropTypes; // 仅供参考，不推荐直接修改history
}

const RouterPageContext = React.createContext<DrawerGroupContextItemProps>({});

export const DrawerGroupContextProvider = RouterPageContext.Provider;

export default RouterPageContext;
