/*
 * @Author: HanFang
 * @Date: 2021-12-02 10:23:25
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-22 10:53:40
 */
import { FC, ReactNode } from "react";
import Context from "./context";
import Provider from "./router";

export type SemiRouteType = "full" | "half";

export interface RouterProp {
  name: string;
  Component: FC;
  param?: any;
  drawerHeight?: number | undefined;
  title?: ReactNode;
  type: SemiRouteType;
  zIndex?: number;
  showBackIcon?: boolean;
  showCloseIcon?: boolean;
  isShowHeader?: boolean;
}

export type RoutesPropTypes = RouterProp[];

export type LocalRoutesPropTypes = {
  half: RoutesPropTypes;
  full: RoutesPropTypes;
};

export interface RouterPushProp {
  name: string;
  param?: any;
  drawerHeight?: number | undefined;
  title?: ReactNode;
  showBackIcon?: boolean;
  showCloseIcon?: boolean;
  isShowHeader?: boolean;
}

export const RouterPageContext = Context;
export const RouterPageProvider = Provider;

export default {
  RouterPageContext,
  RouterPageProvider,
};
