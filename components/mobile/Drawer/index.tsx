import React, { ReactNode } from 'react'
import RcDrawer from 'rc-drawer'

type OpenStatus = boolean

interface DrawerPropTypes {
  openStatus: OpenStatus,
  onRequestClose: (openStatus: OpenStatus) => void
  onOpen?: (openStatus: true) => void,
  drawerType?: 'full' | 'half',
  drawerHeight?: string | number,
  allowClose?: boolean,
  modalElementClass?: string,
  direction?: "bottom" | "left" | "top" | "right",
  headTitle?: string | ReactNode,
  hasAnimation?: boolean,
  maskClosable: boolean,
}

const Drawer = React.forwardRef<any, DrawerPropTypes>(({
  openStatus,
  onRequestClose,
  onOpen,
  drawerType = 'full',
  drawerHeight = '50vh',
  allowClose = true,
  modalElementClass = '',
  direction = 'bottom',
  headTitle = '',
  hasAnimation = false,
  maskClosable = true,
}) => {
  return (
    <RcDrawer
      open={openStatus}
      placement={placement}
      height={wrapHeight}
      onClose={
        onRequestGoBack ? () => onRequestGoBack() : () => onRequestClose(false)
      }
      showMask={openStatus}
      style={{ zIndex: zIndex.current }}
      level={null}
    >

    </RcDrawer>
  )
})

export default Drawer