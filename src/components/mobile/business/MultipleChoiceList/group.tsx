import React, { ReactNode } from "react";
import { RadioGroupContextProvider } from "./context";

interface MultipleChoiceGroupProps {
  activeValueArray: any[];
  onChange: (value: any[]) => void;
  type: 0 | 1;
  children?: ReactNode;
}

const MultipleChoiceGroup: React.FC<MultipleChoiceGroupProps> = ({
  activeValueArray,
  onChange,
  type = 0,
  children,
}: MultipleChoiceGroupProps) => {
  const handleActiveChange = (value: number[]) => {
    onChange(value);
  };
  return (
    <RadioGroupContextProvider
      value={{
        activeValueArray,
        onChange: handleActiveChange,
        mainType: type,
      }}
    >
      {children}
    </RadioGroupContextProvider>
  );
};

export default MultipleChoiceGroup;
