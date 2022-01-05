import {
  NaQuHuaLoader as Loader1, // 绑卡按钮
} from "../components/mobile";
import base from "paths.macro";
import { parameters } from "./utils";

export default {
  title: `${base.replace("/src/", "")}SkeletonLoader`,
  parameters: parameters,
};

const Template = () => (
  <div style={{ textAlign: "center" }}>
    <h3>👇NaQuHuaLoader(拿去花的骨架屏)👇</h3>
    <div>
      <Loader1 />
    </div>
  </div>
);

export const NaQuHuaLoader = Template.bind({});
