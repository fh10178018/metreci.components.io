/*
 * @Author: HanFang
 * @Date: 2021-12-02 10:23:28
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-12 10:22:16
 */
import React, { ReactNode } from "react";
import { SelectContextProvider } from "./context";
import { ActiveValuePropType, OnChangePropType } from "./types";

interface SelectPropTypes {
  activeValue: ActiveValuePropType;
  onChange: OnChangePropType;
  children?: ReactNode;
  isMultipleChoice?: boolean; // 是否是多选
  disabled?: boolean; // 禁止所有选项
  newValueTriggersOnChange?: boolean; // 是否新值才会触发onChange
}

const Select: React.FC<SelectPropTypes> = ({
  activeValue,
  onChange,
  children,
  isMultipleChoice = true,
  disabled = false,
  newValueTriggersOnChange = true,
}: SelectPropTypes) => {
  const handleActiveChange: OnChangePropType = (value, extendValue) => {
    if (activeValue.join(",") !== value.join(",") && newValueTriggersOnChange) {
      // 新旧值对比，不相同时触发 onChange
      onChange(isMultipleChoice ? value : value.slice(-1), extendValue);
    }
    if (!newValueTriggersOnChange) {
      onChange(isMultipleChoice ? value : value.slice(-1), extendValue);
    }
  };
  return (
    <SelectContextProvider
      value={{
        activeValue,
        onChange: handleActiveChange,
        isMultipleChoice,
        disabled,
      }}
    >
      {children}
    </SelectContextProvider>
  );
};

export default Select;
