import {
  RouterPageContext,
  RouterPageProvider,
} from "../components/mobile/SemiRouter/index";
import base from "paths.macro";
import { parameters } from "./utils";
import { useContext } from "react";

export default {
  title: `${base.replace("/src/", "")}Page`,
  component: RouterPageProvider,
  argTypes: {},
  parameters: parameters,
};

const Page1 = (param) => {
  console.log("page1");
  return (
    <div>
      <button
        onClick={() => {
          param.router.push({
            name: "page3",
            param: {
              age: 12,
            },
          });
        }}
      >
        唤起全浮层1
      </button>
      <button
        onClick={() => {
          param.router.pop().then(() => {
            console.log("返回成功");
          });
        }}
      >
        返回
      </button>
      <input name="lala" />
      <strong>page1:{param.age}</strong>
    </div>
  );
};

const Page2 = (param) => {
  console.log("page2");
  return <strong>page2:{param.age}</strong>;
};
const Page3 = (param) => {
  console.log("page3");
  return (
    <div style={{ background: "blue" }}>
      <button
        onClick={() => {
          param.router.push({
            name: "page4",
            param: {
              age: 12,
            },
          });
        }}
      >
        唤起全浮层2
      </button>
      <button
        onClick={() => {
          param.router.pop().then(() => {
            console.log("返回成功");
          });
        }}
      >
        返回
      </button>
      <strong>page3:{param.age}</strong>
    </div>
  );
};
const Page4 = (param) => {
  console.log("page4");
  return (
    <div style={{ background: "blue" }}>
      <button
        onClick={() => {
          param.router.push({
            name: "page2",
            param: {
              age: 12,
            },
          });
        }}
      >
        唤起半浮层2
      </button>
      <button
        onClick={() => {
          param.router.Pop().then(() => {
            console.log("返回成功");
          });
        }}
      >
        返回
      </button>
      <strong>page4:{param.age}</strong>
    </div>
  );
};

const PageMain = () => {
  console.log("pageMain");
  const { push } = useContext(RouterPageContext);
  return (
    <div style={{ textAlign: "center", background: "blue" }}>
      <h5>openStatus的控件放置在案例中！</h5>
      <button
        onClick={() => {
          push({
            name: "page1",
            param: {
              age: 16,
            },
            onBack: () => {
              console.log("back");
            },
          });
        }}
      >
        <strong>唤醒Drawer</strong>
      </button>
    </div>
  );
};

const routes = [
  {
    name: "page1",
    Component: Page1,
    title: "测试1",
    drawerHeight: 70,
    type: "half",
  },
  {
    name: "page2",
    Component: Page2,
    title: "测试2",
    drawerHeight: 80,
    type: "half",
  },
  {
    name: "page3",
    Component: Page3,
    title: "全浮层1",
    type: "half",
    drawerHeight: 30,
  },
  {
    name: "page4",
    Component: Page4,
    title: "全浮层2",
    type: "half",
    drawerHeight: 80,
  },
];

const Template = (args) => {
  return (
    <RouterPageProvider routes={routes}>
      <PageMain />
    </RouterPageProvider>
  );
};

export const BasePage = Template.bind({});
