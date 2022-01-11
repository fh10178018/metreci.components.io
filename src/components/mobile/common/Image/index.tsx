/*
 * @Author: HanFang
 * @Date: 2021-12-16 11:27:11
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-11 14:35:57
 */
import { CSSProperties, useState } from "react";
import ContentLoader from "react-content-loader";
import { Payment6BaseAssetsImgCDNUrl } from "../../constants/baseUrl";
import { rem } from "../../constants/rem";
import { themeColors } from "../../constants/themeStyled";

export interface ImagePropTypes {
  baseUrl?: string; // 基础路由地址
  name?: string; // t图片名称加文件类型，如 a.png
  src?: string; // 如果有src，name将不适用
  alt?: string;
  width?: number; // 图片宽度
  height?: number; // 图片高度
  style?: CSSProperties; // 自定义样式
  className?: string; // 自定义className
}

enum ImageStatus {
  Error,
  Finish,
  Init,
}

const Image = ({
  baseUrl = Payment6BaseAssetsImgCDNUrl + "/",
  name = "",
  width,
  height,
  style,
  className,
  src,
  alt = "",
}: ImagePropTypes) => {
  const [imageStatus, setImageStatus] = useState<ImageStatus>(ImageStatus.Init);
  const handleLoad = () => {
    setImageStatus(ImageStatus.Finish);
  };
  const handleError = () => {
    setImageStatus(ImageStatus.Error);
  };
  const customStyle = {
    width: rem(`${width}px`),
    height: rem(`${height}px`),
    display: "inline-block",
    ...style,
  };
  const curUrl = src || baseUrl + name || "";
  return (
    <>
      {imageStatus !== ImageStatus.Finish ? (
        <div style={customStyle} className={className}>
          <ContentLoader
            width={rem(`${width}px`)}
            height={rem(`${height}px`)}
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor={themeColors.SKELETON_BACKGROUND_COLOR}
            foregroundColor={themeColors.SKELETON_FOREGROUND_COLOR}
          >
            <rect x="0" y="0" rx="2" ry="2" width={width} height={height} />
          </ContentLoader>
          <img
            alt={alt}
            src={curUrl}
            style={{
              display: "none",
            }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      ) : (
        <img alt={alt} src={curUrl} style={customStyle} className={className} />
      )}
    </>
  );
};

export default Image;
