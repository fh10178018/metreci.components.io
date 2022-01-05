import React, { MouseEventHandler, ReactNode } from "react";
import { ButtonWrapper } from "./styled";

export type BtnTypes = "gradient" | "default";
export type ColorTypes = "blue" | "orange" | "gray" | "transparent";
export type SizeTypes = "L" | "M" | "S";

interface PayButtonPropTypes {
  text?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  size?: SizeTypes;
  type?: BtnTypes;
  color?: ColorTypes;
  style?: React.CSSProperties;
  className?: string;
}

const PayButton: React.FC<PayButtonPropTypes> = ({
  text,
  disabled,
  type = "default",
  size = "L",
  children,
  color = "orange",
  className,
  style,
  onClick,
}: PayButtonPropTypes) => {
  if (disabled) type = "default";
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick && onClick(e);
  };
  return (
    <ButtonWrapper
      disabled={disabled}
      type={type}
      size={size}
      curColor={color}
      style={style}
      className={className}
      onClick={handleClick}
    >
      {children ? children : text}
    </ButtonWrapper>
  );
};
export default PayButton;
