/*
 * @Author: HanFang
 * @Date: 2022-01-04 15:02:44
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-05 11:12:02
 */
/*
 * @Author: HanFang
 * @Date: 2021-12-02 10:23:28
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-04 15:00:36
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
}

const Select: React.FC<SelectPropTypes> = ({
  activeValue,
  onChange,
  children,
  isMultipleChoice = true,
  disabled = false,
}: SelectPropTypes) => {
  const handleActiveChange: OnChangePropType = (value, extendValue) => {
    if (activeValue.join(",") !== value.join(",")) {
      // 新旧值对比，不相同时触发 onChange

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
