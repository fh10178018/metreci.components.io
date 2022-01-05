/*
 * @Author: HanFang
 * @Date: 2022-01-04 15:22:56
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-05 14:08:39
 */
import { ReactNode } from "react";
import { SquareCheckIcon, Select } from "../../common";
import {
  Content,
  GongGeOption,
  SelectWrapper,
  RadioWrapper,
  Box,
} from "./styled";

interface GongGeGroupPropTypes {
  activeValue: number | string;
  onChange: (value: number | string, extendValue: any) => void;
  children?: ReactNode;
  disabled?: boolean;
}

interface GongGeItemProps {
  value: number | string; // 用来决定哪个Item被选中
  extendValue?: any; // 单选选中后给予的扩展字段
  tip?: string; // 右上角提示信息
  disabled?: boolean; // 不可选
  children?: ReactNode; // 宫格Item内容
}

export const GongGeGroup: React.FC<GongGeGroupPropTypes> = ({
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
  >
    <SelectWrapper>{children}</SelectWrapper>
  </Select>
);

export const GongGeItem: React.FC<GongGeItemProps> = ({
  value,
  extendValue,
  tip,
  disabled = false,
  children,
}: GongGeItemProps) => {
  return (
    <GongGeOption
      value={value}
      extendValue={extendValue}
      disabled={disabled}
      centerNode={(val?: boolean) => {
        return (
          <Content
            tip={tip}
            style={{ background: val ? "#E6F3FE" : "#F6F8FA" }}
          >
            <Box>{children}</Box>
            {val && (
              <RadioWrapper>
                <SquareCheckIcon size={22} color="#0086F6" />
              </RadioWrapper>
            )}
          </Content>
        );
      }}
    />
  );
};
