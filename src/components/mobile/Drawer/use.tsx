import React, { useState, useCallback, useRef, useMemo } from 'react';
import { DrawerPropTypes } from '.';
import { drawerZIndex } from '../constants/zIndexManage.js';

export type DrawerRef = {
  name: string;
  openAll(): void;
};

export const DrawerContext = React.createContext<DrawerRef | null>(null);

if (typeof window !== 'undefined' && !(window as any).drawerZIndex) {
  (window as any).drawerZIndex = drawerZIndex;
}

export const useClass = (
  drawerType: DrawerPropTypes['drawerType'],
  drawerHeight: DrawerPropTypes['drawerHeight'],
  direction: DrawerPropTypes['direction'],
  hasAnimation: DrawerPropTypes['hasAnimation'],
  parentDrawer: DrawerRef | null,
) => {
  // visible状态不同于openStatus，包括过渡动画过程都为true
  const [visible, setVisible] = useState(true);
  const zIndex = useRef<number>(0); // 用来保存全局的zIndex
  const wrapHeight = useMemo(() => {
    if (drawerType !== 'full') {
      return typeof drawerHeight === 'number'
        ? `${drawerHeight}vh`
        : drawerHeight;
    }
    return '100vh';
  }, [drawerHeight, drawerType]);

  let willMount = useRef(true);
  if (willMount.current) {
    // 实现生命周期componentWillMount
    zIndex.current = (window as any).drawerZIndex++;
    willMount.current = false;
  }

  const contentStyle = useMemo(
    () => ({
      borderRadius:
        drawerType !== 'full'
          ? direction === 'top'
            ? ' 0 0 12px 12px'
            : '12px 12px 0 0'
          : 'unset',
      transition: hasAnimation ? 'transform 0.3s' : 'none',
      opacity: Number(visible),
    }),
    [drawerType, direction, hasAnimation, visible],
  );

  const level = useMemo(
    () =>
      hasAnimation ? (parentDrawer ? '.' + parentDrawer.name : null) : null,
    [parentDrawer, hasAnimation],
  );
  return [wrapHeight, zIndex, contentStyle, level, setVisible] as const;
};

export const useDrawer = (
  onRequestClose: DrawerPropTypes['onRequestClose'],
  zIndex: React.MutableRefObject<number>,
  direction: DrawerPropTypes['direction'],
  openStatus: DrawerPropTypes['openStatus'],
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  parentDrawer: DrawerRef | null,
) => {
  const openAllStatus = useRef(false);
  const [curDirection, setCurDirection] = useState(direction);
  // 用于作为该组件的名称，用来绑定实现动画
  const name = useCallback(() => 'drawer' + zIndex.current, [zIndex])();
  const onClose = useCallback(() => {
    if (typeof onRequestClose === 'function') {
      onRequestClose(false);
    } else {
      console.error('maskClosable is true, please set onRequestClose!');
    }
  }, [onRequestClose]);
  const afterVisibleChange = useCallback(
    (status) => {
      // 动画结束复原位置,同时不显示
      !openStatus && setVisible(false);
      setCurDirection(direction);
    },
    [direction, openStatus, setVisible],
  );
  const openAll = useCallback(() => {
    setCurDirection('bottom');
    onRequestClose(false);
    openAllStatus.current = true;
    if (parentDrawer) parentDrawer.openAll();
  }, [onRequestClose, parentDrawer]);

  return [name, curDirection, onClose, afterVisibleChange, openAll] as const;
};
