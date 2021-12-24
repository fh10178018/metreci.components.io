import React from "react";
import Notification from "rc-notification";
import { NotificationInstance } from "rc-notification/lib/Notification";
import { Wrapper } from "./styled";
import { toastZIndex } from "../constants/zIndexManage.js";

export interface NoticePropTypes {
  content: string;
  sign?: string;
  key?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  getContainer?: () => HTMLElement;
  onClose?: () => void;
}

let notificationInstance: Promise<NotificationInstance> | undefined;

const createNotificationInstance = (
  args: NoticePropTypes,
  callback: (info: { instance: NotificationInstance }) => void
) => {
  if (notificationInstance) {
    Promise.resolve(notificationInstance).then((instance) => {
      callback({ instance });
    });
    return;
  }
  notificationInstance = new Promise((resolve) => {
    Notification.newInstance(
      {
        maxCount: 5,
        style: {
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: toastZIndex,
        },
        prefixCls: "custom-notification",
        getContainer: args.getContainer,
      },
      (notification) => {
        resolve(notification);
        callback({
          instance: notification,
        });
      }
    );
  });
};

const getRCNoticeProps = (args: NoticePropTypes) => {
  const { duration = 3, content, onClose, key, style, className } = args;
  return {
    content: <Wrapper>{content}</Wrapper>,
    duration: duration,
    closable: false,
    onClose,
    key,
    style: style || {},
    className,
  };
};

function notice(args: NoticePropTypes) {
  createNotificationInstance(args, ({ instance }) => {
    instance.notice(getRCNoticeProps(args));
  });
}

const api: any = {
  open: notice,
  close(key: string) {
    Promise.resolve(notificationInstance).then((instance) => {
      instance && instance.removeNotice(key);
    });
  },
  destroy() {
    Promise.resolve(notificationInstance).then((instance) => {
      instance && instance.destroy();
    });
    notificationInstance = undefined; // lgtm[js/missing-await]
  },
};

export default api;
