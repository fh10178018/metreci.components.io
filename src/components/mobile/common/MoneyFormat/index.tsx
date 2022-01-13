/*
 * @Author: HanFang
 * @Date: 2021-12-06 14:26:15
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-12 20:02:34
 */

import { ReactNode, useRef, RefObject, useState, useEffect } from "react";
import styled from "styled-components";
import { useDebounce, usePrevious } from "../../../utils/common";
import { maskZIndex } from "../../constants/zIndexManage";
import { RollGroup, RollItem, ShowWindow } from "./styled";

export interface ITsExampleProps {
  amount?: number;
  children?: ReactNode;
  callBack?: () => void;
  disabled?: boolean;
  zIndex?: number;
}

const MoneyFormat = ({
  amount = 0,
  children,
  callBack,
  zIndex = maskZIndex,
  disabled = false,
}: ITsExampleProps) => {
  const amountStr = amount.toString();
  const oldAmountStr = usePrevious(amountStr);
  const amountStrArray = amountStr.split("");

  return <div></div>;
};

interface NumberRollItemPropTypes {
  number: string;
  time: number;
}

const resourceData = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

export const NumberRollItem: React.FC<NumberRollItemPropTypes> = ({
  number = "9",
  time = 500,
}: NumberRollItemPropTypes) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (groupRef.current) {
      setSize({
        width: groupRef.current.offsetWidth + 1,
        height: groupRef.current.offsetHeight / 20,
      });
    }
  }, [groupRef]);
  const [y, setY] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const oldNumber = usePrevious(number);

  useEffect(() => {
    console.log(oldNumber, number);
    if (oldNumber > number) {
      console.log(size.height * (9 - +number));
      // 值变小，要向上滚动，直接到指定地点就行
      setShowAnimation(true);
      setY(size.height * (9 - +number));
    }
    if (oldNumber <= number) {
      // 值变大或相等，任然要向上滚动
      setShowAnimation(true);
      setY(size.height * (19 - +number));
    }
    // 滚动完，还原到前面
    const timer = setTimeout(() => {
      setShowAnimation(false);
      // setY(size.height * (9 - +number));
      clearTimeout(timer);
    }, time + 100);
  }, [number]);
  return (
    <ShowWindow style={size}>
      <RollGroup
        ref={groupRef}
        style={{
          transform: `translateY(${y}px)`,
          transition: showAnimation
            ? `transform ${time}ms ease-in-out`
            : "unset",
        }}
      >
        {resourceData.map((item, index) => (
          <RollItem key={index}>{item}</RollItem>
        ))}
      </RollGroup>
    </ShowWindow>
  );
};

export default MoneyFormat;
