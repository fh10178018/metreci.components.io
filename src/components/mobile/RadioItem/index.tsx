import React, { ReactNode } from "react";
import { CheckIcon, SquareCheckIcon, SquareUnCheckIcon } from "../ActionIcon";
import {
  RadioBox,
  RadioChecked,
  Radio,
  RadioBackground,
  RadioCheckedIcon,
  RadioWrapper,
} from "./styled";

interface RadioItemProps {
  checked?: boolean;
  type?: 0 | 1 | 2;
  children?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onChange?: (val: boolean) => void;
  color?: string;
  size?: number;
}

const RadioItem: React.FC<RadioItemProps> = ({
  checked,
  type = 0,
  disabled = false,
  isLoading = false,
  children,
  onChange,
  color,
  size,
}: RadioItemProps) => {
  const iconList = [
    [<RadioChecked />, <Radio />],
    [<CheckIcon size={size} color={color} />, ""],
    [<SquareCheckIcon />, <SquareUnCheckIcon />],
  ];

  return (
    <RadioWrapper>
      <RadioBox
        onClick={() => {
          !isLoading && !disabled && onChange && onChange(!checked);
        }}
      >
        <RadioBackground isLoading={isLoading}>
          {iconList[type][1]}
        </RadioBackground>
        <RadioCheckedIcon checked={checked}>
          {iconList[type][0]}
        </RadioCheckedIcon>
      </RadioBox>
      {children}
    </RadioWrapper>
  );
};

export default RadioItem;
