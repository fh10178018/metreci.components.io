/*
 * @Author: HanFang
 * @Date: 2021-12-16 11:27:11
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-10 19:38:30
 */
import { CSSProperties, useState } from "react";
import ContentLoader from "react-content-loader";
import { Payment6BaseAssetsImgCDNUrl } from "../../constants/baseUrl";
import { rem } from "../../constants/rem";

export interface ImagePropTypes {
  baseUrl?: string; // 基础路由地址
  name?: string; // t图片名称加文件类型，如 a.png
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
  name,
  width,
  height,
  style,
  className,
  ...props
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
  return (
    <>
      {imageStatus !== ImageStatus.Finish ? (
        <div {...props} style={customStyle} className={className}>
          <ContentLoader
            width="100%"
            height="100%"
            viewBox="0 0 638 638"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="2" ry="2" width="638" height="638" />
          </ContentLoader>
          <img
            alt=""
            src={baseUrl + name}
            style={{
              display: "none",
            }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      ) : (
        <img
          alt=""
          {...props}
          src={baseUrl + name}
          style={customStyle}
          className={className}
        />
      )}
    </>
  );
};

export default Image;
