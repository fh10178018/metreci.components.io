import * as React from "react";

interface MultipleChoiceItemProps {
  onChange?: (value: any[]) => void;
  activeValueArray?: any[];
  mainType?: number;
}

const RadioGroupContext = React.createContext<MultipleChoiceItemProps>({});

export const RadioGroupContextProvider = RadioGroupContext.Provider;

export default RadioGroupContext;
