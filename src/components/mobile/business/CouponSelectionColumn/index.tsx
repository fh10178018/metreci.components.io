/*
 * @Author: HanFang
 * @Date: 2022-01-04 15:22:56
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-12 10:25:46
 */
import { ReactNode } from "react";
import { RadioItem, Select, Option } from "../../common";
import { themeColors } from "../../constants/themeStyled";
import {
  Content,
  NoCouponContent,
  RadioWrapper,
  Box,
  PrefixBox,
  CommonBox,
  CommonContent,
} from "./styled";

interface CouponGroupPropTypes {
  activeValue: number | string;
  onChange: (value: number | string, extendValue: any) => void;
  children?: ReactNode;
  disabled?: boolean;
}

interface HotCouponItemPropTypes {
  value: number | string; // 用来决定哪个Item被选中
  extendValue?: any; // 单选选中后给予的扩展字段
  disabled?: boolean; // 不可选
  children?: ReactNode; // 宫格Item内容
  prefixNode?: ReactNode; // 前置内容
}

interface CouponItemPropTypes {
  value: number | string; // 用来决定哪个Item被选中
  extendValue?: any; // 单选选中后给予的扩展字段
  disabled?: boolean; // 不可选
  children?: ReactNode; // 宫格Item内容
}

export const CouponGroup: React.FC<CouponGroupPropTypes> = ({
  activeValue,
  onChange,
  children,
  disabled = false,
}) => (
  <Select
    activeValue={[activeValue]}
    onChange={(value, extendValue) => value && onChange(value[0], extendValue)}
    isMultipleChoice={false}
    disabled={disabled}
    newValuetriggersOnChange={false}
  >
    {children}
  </Select>
);

export const HotCouponItem: React.FC<HotCouponItemPropTypes> = ({
  value,
  extendValue,
  disabled = false,
  children,
  prefixNode,
}: HotCouponItemPropTypes) => {
  return (
    <Option
      value={value}
      extendValue={extendValue}
      disabled={disabled}
      centerNode={(val?: boolean) => {
        return (
          <Content>
            <PrefixBox>{prefixNode}</PrefixBox>
            <Box>{children}</Box>
            <RadioWrapper>
              <RadioItem
                checked={val}
                color={themeColors.red}
                colorDark={themeColors.red}
                size={36}
              />
            </RadioWrapper>
          </Content>
        );
      }}
    />
  );
};

export const CouponItem: React.FC<CouponItemPropTypes> = ({
  value,
  extendValue,
  disabled = false,
  children,
}: CouponItemPropTypes) => {
  return (
    <Option
      value={value}
      extendValue={extendValue}
      disabled={disabled}
      centerNode={(val?: boolean, gDisabled?: boolean) => {
        return (
          <CommonContent>
            <CommonBox>{children}</CommonBox>
            {!gDisabled && (
              <RadioWrapper>
                <RadioItem checked={val} color="#0086F6" size={36} />
              </RadioWrapper>
            )}
          </CommonContent>
        );
      }}
    />
  );
};

export const NoCouponItem: React.FC<CouponItemPropTypes> = ({
  value,
  extendValue,
  disabled = false,
  children,
}: CouponItemPropTypes) => {
  return (
    <Option
      value={value}
      extendValue={extendValue}
      disabled={disabled}
      centerNode={(val?: boolean) => {
        return (
          <NoCouponContent>
            <Box>{children}</Box>
            <RadioWrapper>
              <RadioItem
                checked={val}
                color={themeColors.red}
                colorDark={themeColors.red}
                size={36}
              />
            </RadioWrapper>
          </NoCouponContent>
        );
      }}
    />
  );
};
