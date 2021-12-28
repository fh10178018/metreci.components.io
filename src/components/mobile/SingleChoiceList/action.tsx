/*
 * @Author: HanFang
 * @Date: 2021-12-02 10:23:34
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-02 11:15:55
 */
import React, { ReactNode } from "react";
import ActionIcon from "../ActionIcon";

import {
  HeaderContent,
  LeftContent2,
  CenterContent,
  RightContent,
  FooterContent,
  Wrapper,
  ChildrenWrapper,
} from "./styled";

const { RightArrowIcon, PlusIcon } = ActionIcon;

interface SingleChoiceItemProps {
  value: number;
  extendValue?: any;
  headerNode: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  footerNode?: ReactNode;
  iconNode?: boolean;
  isPlus?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    extendValue: any,
    value: number
  ) => void;
}

const SingleChoiceItem: React.FC<SingleChoiceItemProps> = ({
  value,
  children,
  headerNode,
  footerNode,
  extendValue,
  disabled = false,
  iconNode,
  isPlus,
  onClick,
}: SingleChoiceItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick && onClick(e, extendValue, value);
  };
  return (
    <Wrapper onClick={(e) => handleClick(e)} disabled={disabled}>
      {iconNode && <LeftContent2>{iconNode}</LeftContent2>}
      <CenterContent>
        <HeaderContent>{headerNode}</HeaderContent>
        {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
        <FooterContent>{footerNode}</FooterContent>
      </CenterContent>
      <RightContent>
        {isPlus ? (
          <PlusIcon color="#CCCCCC" />
        ) : (
          <RightArrowIcon color="#CCCCCC" />
        )}
      </RightContent>
    </Wrapper>
  );
};

export default SingleChoiceItem;
