/*
 * @Author: HanFang
 * @Date: 2021-12-02 10:23:31
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-31 11:30:37
 */
import * as React from "react";

interface SingleChoiceItemProps {
  onChange?: (value: number | string, extendValue: any) => void;
  activeValue?: number | string;
  mainType?: number;
}

const RadioGroupContext = React.createContext<SingleChoiceItemProps>({});

export const RadioGroupContextProvider = RadioGroupContext.Provider;

export default RadioGroupContext;
