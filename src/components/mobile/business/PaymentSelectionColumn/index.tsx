/*
 * @Author: HanFang
 * @Date: 2022-01-04 15:22:56
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-12 10:26:44
 */
import { ReactNode } from "react";
import { useDebounce } from "../../../utils/common";
import {
  RadioItem,
  Select,
  Option,
  Collapse,
  PlusIcon,
  RightArrowIcon,
} from "../../common"; // 单项选择都是基于common组件完成的
import { rem } from "../../constants/rem";
import { themeColors } from "../../constants/themeStyled";
import {
  Content,
  RadioWrapper,
  Box,
  PrefixBox,
  HomeBox,
  HomeRadioWrapper,
} from "./styled";

// 外层包裹Select
interface PaymentSelectionColumnGroupPropTypes {
  activeValue: number | string;
  onChange: (value: number | string, extendValue: any) => void;
  children?: ReactNode;
  disabled?: boolean;
  newValueTriggersOnChange?: boolean;
}

export const PaymentSelectionColumnGroup: React.FC<
  PaymentSelectionColumnGroupPropTypes
> = ({
  activeValue,
  onChange,
  children,
  disabled = false,
  newValueTriggersOnChange = true,
}: PaymentSelectionColumnGroupPropTypes) => (
  <Select
    activeValue={[activeValue]}
    onChange={(value, extendValue) => value && onChange(value[0], extendValue)}
    isMultipleChoice={false}
    disabled={disabled}
    newValueTriggersOnChange={newValueTriggersOnChange}
  >
    {children}
  </Select>
);

// 换卡支付的Option基础组件
interface BankCardItemPropTypes {
  value: number | string; // 用来决定哪个Item被选中
  extendValue?: any; // 单选选中后给予的扩展字段
  disabled?: boolean; // 不可选
  children?: ReactNode; // Item内容
  prefixNode?: ReactNode; // 前置内容
}

export const BankCardItem: React.FC<BankCardItemPropTypes> = ({
  value,
  extendValue,
  disabled = false,
  children,
  prefixNode,
}: BankCardItemPropTypes) => {
  return (
    <Option
      value={value}
      extendValue={extendValue}
      disabled={disabled}
      centerNode={(val?: boolean, gDisabled?: boolean) => {
        return (
          <Content disabled={gDisabled}>
            <PrefixBox>{prefixNode}</PrefixBox>
            <Box>{children}</Box>
            <RadioWrapper>
              <RadioItem checked={val} color="#0086F6" type={1} />
            </RadioWrapper>
          </Content>
        );
      }}
    />
  );
};

// 主页的Bank Option基础组件
interface HomeBankCardItemPropTypes {
  value: number | string; // 用来决定哪个Item被选中
  extendValue?: any; // 单选选中后给予的扩展字段
  disabled?: boolean; // 不可选
  collapseNode?: ReactNode; // 未选中，折叠内容
  children?: ReactNode; // Item内容
}
export const HomeBankCardItem: React.FC<HomeBankCardItemPropTypes> = ({
  value,
  extendValue,
  disabled = false,
  children,
  collapseNode,
}: HomeBankCardItemPropTypes) => {
  return (
    <Option
      value={value}
      extendValue={extendValue}
      disabled={disabled}
      centerNode={(val?: boolean, gDisabled?: boolean) => {
        return (
          <>
            <Content disabled={gDisabled}>
              <HomeBox>{children}</HomeBox>
              <HomeRadioWrapper>
                <RadioItem checked={val} color={themeColors.blue} />
              </HomeRadioWrapper>
            </Content>
            <Collapse visible={!!val} customStyle={{ marginTop: rem("-22px") }}>
              {collapseNode ? (
                <div style={{ paddingTop: rem("22px") }}>{collapseNode}</div>
              ) : null}
            </Collapse>
          </>
        );
      }}
    />
  );
};

// 主页的三方支付 Option基础组件
interface HomeBankCardItemPropTypes {
  value: number | string; // 用来决定哪个Item被选中
  extendValue?: any; // 单选选中后给予的扩展字段
  disabled?: boolean; // 不可选
  collapseNode?: ReactNode; // 未选中，折叠内容
  children?: ReactNode; // Item内容
  prefixNode?: ReactNode; // 前置内容
}
export const HomeThirdPayItem: React.FC<HomeBankCardItemPropTypes> = ({
  value,
  extendValue,
  disabled = false,
  children,
  collapseNode,
  prefixNode,
}: HomeBankCardItemPropTypes) => {
  return (
    <Option
      value={value}
      extendValue={extendValue}
      disabled={disabled}
      centerNode={(val?: boolean, gDisabled?: boolean) => {
        return (
          <>
            <Content disabled={gDisabled}>
              <PrefixBox>{prefixNode}</PrefixBox>
              <Box>{children}</Box>
              <HomeRadioWrapper>
                <RadioItem checked={val} color={themeColors.blue} />
              </HomeRadioWrapper>
            </Content>
            <Collapse visible={!!val}>
              {collapseNode ? collapseNode : null}
            </Collapse>
          </>
        );
      }}
    />
  );
};

interface ActionBarItemPropTypes {
  value: number | string;
  extendValue?: any;
  disabled?: boolean;
  children?: ReactNode;
  prefixNode?: ReactNode;
  isPlus?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    extendValue: any,
    value: number | string
  ) => void;
}

export const ActionBarItem: React.FC<ActionBarItemPropTypes> = ({
  value,
  extendValue,
  disabled = false,
  children,
  prefixNode,
  isPlus,
  onClick,
}: ActionBarItemPropTypes) => {
  const CurBox = prefixNode ? Box : HomeBox;
  const CurRadioWrapper = prefixNode ? RadioWrapper : HomeRadioWrapper;
  const handleClick = useDebounce(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick && onClick(e, extendValue, value);
    },
    500,
    true
  );
  return (
    <Content disabled={disabled} onClick={handleClick}>
      {prefixNode && <PrefixBox>{prefixNode}</PrefixBox>}
      <CurBox>{children}</CurBox>
      <CurRadioWrapper>
        {isPlus ? (
          <PlusIcon color="#CCCCCC" />
        ) : (
          <RightArrowIcon color="#CCCCCC" />
        )}
      </CurRadioWrapper>
    </Content>
  );
};
