/*
 * @Author: HanFang
 * @Date: 2021-12-06 14:26:15
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-18 17:32:26
 */

import { useRef, useState, useEffect, CSSProperties, memo } from "react";
import { usePrevious } from "../../../utils/common";
import { rem } from "../../constants/rem";
import { RollGroup, RollItem, ShowWindow, Wrapper } from "./styled";

export interface MoneyFormatPropTypes {
  amount?: string; // 因为 .00这种数字无法保留，所以传string
  style?: CSSProperties; // 自定义金额样式
  size?: number; // 字体大小，设计图大小
}

const MoneyFormat: React.FC<MoneyFormatPropTypes> = ({
  amount = "",
  style,
  size = 32,
}: MoneyFormatPropTypes) => {
  if (amount !== undefined) {
    const curSize = rem(size + "px");
    const amountStrArray = amount.split("");
    const hasSmallNumber = amount.indexOf(".") !== -1;
    const numLen = hasSmallNumber
      ? amountStrArray.length - 1
      : amountStrArray.length;
    return (
      <Wrapper style={style} size={curSize}>
        {amountStrArray.map((item, index) => {
          if (item === ".") return <ShowWindow key={index}>.</ShowWindow>;
          return (
            <NumberRollItem
              key={index}
              number={item}
              delay={(numLen - index) * 100}
              changeKey={Date.now()}
            />
          );
        })}
      </Wrapper>
    );
  }
  return <></>;
};

interface NumberRollItemPropTypes {
  number: string;
  time?: number;
  delay?: number;
  changeKey?: number;
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

// 单个数字的滚动
export const NumberRollItem: React.FC<NumberRollItemPropTypes> = ({
  number = "0",
  time = 400,
  delay = 0,
  changeKey,
}: NumberRollItemPropTypes) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const [y, setY] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const oldNumber = usePrevious(number);
  let timer: NodeJS.Timeout;

  // NOTE: 由于字体的大小不一定，所以这里动态获得元素大小，用于滚动和展示
  const handleSetSize = (width: number, height: number) => {
    width = width;
    height = height / 20;
    setSize({
      width,
      height,
    });
    return { width, height };
  };

  // NOTE: 控制单个数字位置和动画
  const handlePosition = (
    height: number,
    number: string,
    oldNumber: string
  ) => {
    if (oldNumber < number) {
      // NOTE: 值变大，要向上滚动，直接滚动到指定地点就行
      setShowAnimation(true);
      setY(height * +number);
    }
    if (oldNumber >= number) {
      // NOTE: 值变小或相等，任然要向上滚动，区别是滚动到另一个周期的指定数字
      setShowAnimation(true);
      setY(height * (10 + +number));
    }
    if (oldNumber === undefined) {
      // NOTE: oldNumber 为 undefined, 则是刚挂载组件,这个时候没有动画
      setY(height * +number);
    }
    // NOTE: 滚动完，用户无感的还原到前面的周期
    timer = setTimeout(() => {
      setShowAnimation(false);
      setY(height * +number);
      clearTimeout(timer);
    }, time + delay);
  };

  useEffect(() => {
    // NOTE:changeKey的作用很重要，相同数字发生变化时，仍然会有滚动动画
    if (groupRef.current) {
      const { offsetWidth, offsetHeight } = groupRef.current;
      const { height } = handleSetSize(offsetWidth, offsetHeight);
      handlePosition(height, number, oldNumber);
    }
    return () => {
      // FIX: 组件销毁的时候，销毁计时器
      clearTimeout(timer);
    };
  }, [number, changeKey, groupRef]);
  return (
    <ShowWindow style={size}>
      <RollGroup
        ref={groupRef}
        style={{
          transform: `translateY(${-y}px)`,
          transition: showAnimation
            ? `transform ${time}ms ease-in-out ${delay}ms`
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

function areEqual(
  prevProps: MoneyFormatPropTypes,
  nextProps: MoneyFormatPropTypes
) {
  // NOTE: 金额不变，没有动画,不更新组件
  return prevProps.amount === nextProps.amount;
}

export default memo(MoneyFormat, areEqual);
