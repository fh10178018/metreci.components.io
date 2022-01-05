/*
 * @Author: HanFang
 * @Date: 2021-12-02 10:23:28
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-04 15:25:18
 */
import React, { ReactNode } from "react";
import { RadioGroupContextProvider } from "./context";

interface SingleChoiceGroupProps {
  activeValue: number | string;
  onChange: (value: number | string, extendValue: any) => void;
  type: 0 | 1 | 2 | 3;
  children?: ReactNode;
}

const SingleChoiceGroup: React.FC<SingleChoiceGroupProps> = ({
  activeValue,
  onChange,
  type = 0,
  children,
}: SingleChoiceGroupProps) => {
  const handleActiveChange = (value: number | string, extendValue: any) => {
    if (activeValue !== value) {
      // 新旧值对比，不相同时触发 onChange
      onChange(value, extendValue);
    }
  };
  return (
    <RadioGroupContextProvider
      value={{
        activeValue,
        onChange: handleActiveChange,
        mainType: type,
      }}
    >
      {children}
    </RadioGroupContextProvider>
  );
};

export default SingleChoiceGroup;
