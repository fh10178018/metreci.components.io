/*
 * @Author: HanFang
 * @Date: 2022-01-04 15:02:41
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-06 11:19:46
 */
import React, { useContext, ReactNode, useMemo } from "react";
import { useDebounce } from "../../../utils/common";
import RadioGroupContext from "./context";

interface OptionPropTypes {
  value: number | string;
  extendValue?: any;
  disabled?: boolean;
  centerNode: (val?: boolean, disabled?: boolean) => ReactNode;
}

const Option: React.FC<OptionPropTypes> = ({
  value,
  extendValue,
  disabled = false,
  centerNode,
}: OptionPropTypes) => {
  const {
    onChange,
    activeValue,
    isMultipleChoice,
    disabled: groupDisabled,
  } = useContext(RadioGroupContext);
  const handleClick = () => {
    if (!groupDisabled && !disabled && onChange && activeValue) {
      if (isMultipleChoice) {
        // 多选
        if (!isActive) {
          onChange([...activeValue, value], extendValue);
        } else {
          onChange(
            activeValue.filter((item) => item !== value),
            extendValue
          );
        }
      } else {
        onChange([value], extendValue);
      }
    }
  };
  const isActive = useMemo(
    () => activeValue && activeValue.indexOf(value) !== -1,
    [activeValue, value]
  );

  return (
    <div
      onClick={useDebounce(handleClick, 500, true)}
      className="option-wrapper"
    >
      <div className="option-content">
        {centerNode(isActive, groupDisabled || disabled)}
      </div>
    </div>
  );
};

export default Option;
