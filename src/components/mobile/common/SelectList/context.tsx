/*
 * @Author: HanFang
 * @Date: 2022-01-04 15:02:34
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-05 11:12:11
 */
import * as React from "react";
import { ActiveValuePropType, OnChangePropType } from "./types";

interface SelectPropTypes {
  onChange?: OnChangePropType;
  activeValue?: ActiveValuePropType;
  isMultipleChoice?: boolean;
  disabled?: boolean;
}

const SelectContext = React.createContext<SelectPropTypes>({});

export const SelectContextProvider = SelectContext.Provider;

export default SelectContext;
