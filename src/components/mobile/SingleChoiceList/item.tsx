/*
 * @Author: HanFang
 * @Date: 2021-12-02 10:23:22
 * @Last Modified by: neng.zhang
 * @Last Modified time: 2021-12-Tu 04:29:42
 */
import React, {
  useContext,
  useCallback,
  ReactNode,
  useMemo,
  useRef,
  CSSProperties,
} from "react";
import RadioGroupContext from "./context";
import Radio from "../RadioItem";
import {
  HeaderContent,
  LeftContent,
  LeftContent2,
  CenterContent,
  RightContent,
  FooterContent,
  Wrapper,
  ChildrenWrapper,
} from "./styled";
import { themeColors } from "../constants/themeStyled";

interface SingleChoiceItemProps {
  value: number | string;
  extendValue?: any;
  headerNode: ReactNode;
  type?: 0 | 1 | 2 | 3;
  showPreSelectIcon?: boolean;
  showRearSelectIcon?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  footerNode?: ReactNode;
  loading?: boolean;
  autoFold?: boolean;
  iconNode?: ReactNode; // type为2的时候,展示iconNode
  customStyle?: CSSProperties;
}

const SingleChoiceItem: React.FC<SingleChoiceItemProps> = ({
  value,
  children,
  headerNode,
  footerNode,
  extendValue,
  disabled = false,
  loading = false,
  type = 0,
  autoFold = true,
  iconNode,
  customStyle,
}: SingleChoiceItemProps) => {
  const { onChange, activeValue, mainType } = useContext(RadioGroupContext);
  const handleClick = useCallback(() => {
    !loading &&
      !disabled &&
      typeof onChange === "function" &&
      onChange(value, extendValue);
  }, [onChange, value, extendValue, disabled, loading]);
  const isActive = useMemo(() => activeValue === value, [activeValue, value]);
  const curType = useMemo(
    () => (mainType !== undefined ? mainType : type),
    [mainType, type]
  );

  const childrenRef = useRef<HTMLDivElement>(null);

  const isChineseH5Type = curType === 2 || curType === 3;

  return (
    <>
      <Wrapper
        onClick={handleClick}
        disabled={disabled || loading}
        isType2={isChineseH5Type}
        style={customStyle}
      >
        {curType === 0 && (
          <LeftContent>
            <Radio checked={isActive} isLoading={loading} />
          </LeftContent>
        )}
        {isChineseH5Type && iconNode && <LeftContent2>{iconNode}</LeftContent2>}
        <CenterContent isType2={isChineseH5Type}>
          <HeaderContent isType2={isChineseH5Type}>
            {curType === 1 ? (
              <>
                {headerNode}
                <Radio checked={isActive} type={1} />
              </>
            ) : (
              headerNode
            )}
          </HeaderContent>
          {!isChineseH5Type && children && autoFold && (
            <ChildrenWrapper
              style={{
                height: isActive
                  ? (childrenRef.current?.children[0] as HTMLDivElement)
                      ?.offsetHeight
                  : 0,
              }}
              ref={childrenRef}
            >
              <div>{children}</div>
            </ChildrenWrapper>
          )}
          <FooterContent isType2={isChineseH5Type}>{footerNode}</FooterContent>
        </CenterContent>
        {curType === 2 && (
          <RightContent>
            <Radio
              checked={isActive}
              isLoading={loading}
              color={themeColors.blue}
            />
          </RightContent>
        )}
        {curType === 3 && (
          <RightContent>
            <Radio checked={isActive} type={1} color="#0086F6" />
          </RightContent>
        )}
      </Wrapper>
      {isChineseH5Type && (
        <div style={{ display: isActive ? "block" : "none" }}>{children}</div>
      )}
    </>
  );
};

export default SingleChoiceItem;
