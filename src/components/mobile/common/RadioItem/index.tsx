/*
 * @Author: HanFang
 * @Date: 2021-12-01 17:22:05
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-05 21:48:14
 */
import React, { ReactNode } from "react";
import {
  CheckIcon,
  SquareCheckIcon,
  SquareUnCheckIcon,
  RadioCheckIcon,
  RadioUnCheckIcon,
} from "../ActionIcon";
import {
  RadioBox,
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
  colorDark?: string;
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
  colorDark,
  size,
}: RadioItemProps) => {
  const iconList = [
    [<RadioCheckIcon color={color} />, <RadioUnCheckIcon color={colorDark} />],
    [<CheckIcon size={size} color={color} />, ""],
    [
      <SquareCheckIcon size={size} color={color} />,
      <SquareUnCheckIcon size={size} color="#BBBBBB" />,
    ],
  ];

  return (
    <RadioWrapper
      onClick={() => {
        !isLoading && !disabled && onChange && onChange(!checked);
      }}
    >
      <RadioBox>
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
