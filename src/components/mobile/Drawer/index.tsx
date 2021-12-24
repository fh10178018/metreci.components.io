/*
 * @Author: HanFang
 * @Date: 2021-12-08 14:49:07
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-23 18:54:59
 */
import { ReactNode, FC, CSSProperties, useState, useEffect } from "react";
import { useClass } from "./use";
import Header from "../DrawerHeader";
import { ContentWrapper, MyRcDrawer } from "./styled";

type OpenStatus = boolean | undefined;

export interface DrawerPropTypes {
  openStatus: OpenStatus;
  onChange?: (openStatus: OpenStatus) => void;
  drawerType?: "full" | "half";
  drawerHeight?: string | number;
  allowClose?: boolean;
  modalElementClass?: string;
  direction?: "bottom" | "left" | "top" | "right";
  headTitle?: string | ReactNode;
  maskClosable?: boolean;
  children?: ReactNode;
  onHeaderClose?: () => void;
  onHeaderGoBack?: () => void;
  customStyle?: CSSProperties;
  level?: string | null;
  levelName?: string;
  showMask?: boolean;
  showContent?: boolean;
  focus?: boolean;
  headerNoBorder?: boolean;
}

const Drawer: FC<DrawerPropTypes> = ({
  openStatus = false,
  onChange,
  drawerType = "half",
  drawerHeight = "50vh",
  allowClose = true,
  modalElementClass = "",
  direction = "bottom",
  headTitle = "",
  maskClosable = true,
  children,
  customStyle,
  level,
  levelName = "",
  showMask = true,
  onHeaderClose,
  onHeaderGoBack,
  showContent = true,
  focus,
  headerNoBorder = false,
}: DrawerPropTypes) => {
  const { wrapHeight, zIndex, contentStyle } = useClass(
    drawerType,
    drawerHeight,
    direction,
    levelName,
    focus
  );

  const [curStatus, setCurStatus] = useState(openStatus);
  useEffect(() => {
    setTimeout(() => {
      setCurStatus(openStatus);
    }, 100);
  }, [openStatus]);
  return (
    <MyRcDrawer
      open={curStatus}
      className={levelName}
      wrapperClassName={modalElementClass}
      placement={direction}
      height={wrapHeight}
      onClose={() => {
        allowClose && onHeaderClose && onHeaderClose();
      }}
      onChange={onChange}
      style={{ zIndex: zIndex.current, ...customStyle }}
      maskClosable={maskClosable}
      showMask={showMask}
      handler={false}
      level={level ? "." + level : null}
      ease="linear"
      contentWrapperStyle={contentStyle}
    >
      <Header
        customStyle={{
          opacity: (showContent && curStatus) || drawerType === "full" ? 1 : 0,
        }}
        headTitle={headTitle}
        onGoBack={onHeaderGoBack}
        headerNoBorder={headerNoBorder}
        onClose={() => {
          allowClose && onHeaderClose && onHeaderClose();
        }}
      />
      <ContentWrapper
        style={{
          opacity: (showContent && curStatus) || drawerType === "full" ? 1 : 0,
        }}
      >
        {children}
      </ContentWrapper>
    </MyRcDrawer>
  );
};

export default Drawer;
