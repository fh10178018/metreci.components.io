/*
 * @Author: HanFang
 * @Date: 2022-01-04 20:48:52
 * @Last Modified by: HanFang
 * @Last Modified time: 2022-01-04 21:14:59
 */
import ContentLoader from 'react-content-loader';

// 携程拿去花的骨架屏
const NaQuHuaLoader = () => (
    <ContentLoader
        width="100%"
        height="100%"
        viewBox="0 0 638 392"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="2" ry="2" width="311" height="116" />
        <rect x="327" y="0" rx="2" ry="2" width="311" height="116" />
        <rect x="0" y="132" rx="2" ry="2" width="311" height="116" />
        <rect x="327" y="132" rx="2" ry="2" width="311" height="116" />
        <rect x="0" y="287" rx="2" ry="2" width="638" height="24" />
        <rect x="0" y="349" rx="2" ry="2" width="638" height="24" />
    </ContentLoader>
);

export default NaQuHuaLoader;
