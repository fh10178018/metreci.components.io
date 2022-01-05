/*
 * @Author: HanFang
 * @Date: 2022-01-04 15:02:41
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-05 11:21:14
 */
import React, { useContext, ReactNode, useMemo } from "react";
import RadioGroupContext from "./context";

interface OptionPropTypes {
  value: number | string;
  extendValue?: any;
  disabled?: boolean;
  frontNode?: (val?: boolean) => ReactNode;
  rearNode?: (val?: boolean) => ReactNode;
  centerNode?: (val?: boolean) => ReactNode;
  footerNode?: (val?: boolean) => ReactNode;
}

const Option: React.FC<OptionPropTypes> = ({
  value,
  extendValue,
  disabled = false,
  frontNode,
  rearNode,
  centerNode,
  footerNode,
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
    <div onClick={handleClick} className="option-wrapper">
      <div className="option-content">
        {frontNode && <div className="option-front">{frontNode(isActive)}</div>}

        {centerNode && (
          <div className="option-center">{centerNode(isActive)}</div>
        )}

        {rearNode && <div className="option-rear">{rearNode(isActive)}</div>}
      </div>
      {footerNode && (
        <div className="option-footer">{footerNode(isActive)}</div>
      )}
    </div>
  );
};

export default Option;
