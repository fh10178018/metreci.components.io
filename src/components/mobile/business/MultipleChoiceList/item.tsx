import React, { useContext, ReactNode, useMemo } from "react";
import RadioGroupContext from "./context";
import { RadioItem } from "../../common";
import {
  LeftContent,
  RightContent,
  FooterContent,
  Wrapper,
  ChildrenWrapper,
} from "./styled";

interface MultipleChoiceItemProps {
  value: number | string;
  type?: 0 | 1;
  showPreSelectIcon?: boolean;
  showRearSelectIcon?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  footerNode?: ReactNode;
  loading?: boolean;
  childrenClassName?: string;
}

const MultipleChoiceItem: React.FC<MultipleChoiceItemProps> = ({
  value,
  children,
  footerNode,
  disabled = false,
  loading = false,
  type = 0,
  childrenClassName = "",
}: MultipleChoiceItemProps) => {
  const { onChange, activeValueArray, mainType } =
    useContext(RadioGroupContext);
  const handleClick = () => {
    if (!loading && !disabled && onChange && activeValueArray) {
      if (!isActive) {
        onChange([...activeValueArray, value]);
      } else {
        onChange(activeValueArray.filter((item) => item !== value));
      }
    }
  };
  const isActive = useMemo(
    () => activeValueArray && activeValueArray.indexOf(value) !== -1,
    [activeValueArray, value]
  );

  const curType = useMemo(
    () => (mainType !== undefined ? mainType : type),
    [mainType, type]
  );

  return (
    <Wrapper onClick={handleClick} disabled={disabled || loading}>
      {curType === 0 ? (
        <LeftContent>
          <RadioItem
            size={32}
            color="#0086F6"
            checked={isActive}
            isLoading={loading}
            type={2}
          />
        </LeftContent>
      ) : (
        ""
      )}
      <RightContent className={childrenClassName}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
        <FooterContent>{footerNode}</FooterContent>
      </RightContent>
    </Wrapper>
  );
};

export default MultipleChoiceItem;
