/*
 * @Author: HanFang
 * @Date: 2021-12-02 10:23:28
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-02 13:58:46
 */
import React, { useState, ReactNode } from "react";
import { RadioGroupContextProvider } from "./context";

interface SingleChoiceGroupProps {
  activeValue: number;
  onChange: (value: number, extendValue: any) => void;
  type: 0 | 1 | 2 | 3;
  children?: ReactNode;
}

const SingleChoiceGroup: React.FC<SingleChoiceGroupProps> = ({
  activeValue,
  onChange,
  type = 0,
  children,
}: SingleChoiceGroupProps) => {
  const [oldValue, setOldValue] = useState<number>(activeValue);
  const handleActiveChange = (value: number, extendValue: any) => {
    if (oldValue !== value) {
      // 新旧值对比，不相同时触发 onChange
      onChange(value, extendValue);
      setOldValue(value);
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
