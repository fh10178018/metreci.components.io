/*
 * @Author: HanFang
 * @Date: 2022-01-04 15:02:51
 * @Last Modified by:   HanFang
 * @Last Modified time: 2022-01-04 15:02:51
 */
import { ReactNode } from "react";

export type ActiveValuePropType = any[];

export type OnChangePropType = (
  value: ActiveValuePropType,
  extendValue: any
) => void;

export interface SelectPropTypes {
  activeValue: ActiveValuePropType;
  onChange: OnChangePropType;
  children?: ReactNode;
}
