import React, { useState, lazy,useEffect } from "react";
import { Button, Descriptions, Result, Avatar, Space, Statistic } from "antd";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import "@/App.css";
import type { ProSettings } from "@ant-design/pro-layout";
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from "@ant-design/pro-layout";
import defaultProps from "./_defaultProps";
import routes from "../routes";
import webapi from "../utils/webapi";
import { RightContent } from "../components/header/index";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
const Columns = lazy(() => import("../pages/authorize/columns"));
const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">中国</Descriptions.Item>
  </Descriptions>
);

const Layout1 = () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const [pathname, setPathname] = useState("/welcome");
  const p = useParams();
  console.log(p);
  return (
    <>
      <ProLayout
        {...defaultProps}
        title="编辑后台"
        location={{
          pathname,
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || "/welcome");
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => <RightContent />}
        {...settings}
      >
        <PageContainer
          content={content}
          tabList={[
            {
              tab: "基本信息",
              key: "base",
            },
            {
              tab: "详细信息",
              key: "info",
            },
          ]}
          extraContent={
            <Space size={24}>
              <Statistic
                title="Feedback"
                value={1128}
                prefix={<LikeOutlined />}
              />
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Space>
          }
          extra={[
            <Button key="3">操作</Button>,
            <Button key="2">操作</Button>,
            <Button key="1" type="primary">
              主操作
            </Button>,
          ]}
          footer={[
            <Button key="3">重置</Button>,
            <Button key="2" type="primary">
              提交
            </Button>,
          ]}
        >
          <div
            style={{
              height: "120vh",
            }}
          >
            <Outlet />
          </div>
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById("container")}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={false}
      />
    </>
  );
};
 
 
const Security = () => {
  const Element_Columns = (
    <React.Suspense fallback={<>...</>}>
      <Columns />
    </React.Suspense>
  );
  // useEffect(()=>{
  //   console.log(useParams());
  // },[])
  // const {Layout,params}=Layout1();
  console.log(useParams());
  return (
    <React.Suspense fallback={<>...</>}>
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route
            path="/authorize/columns"
            element={Element_Columns}
             
          >
            <Route path="/authorize/columns/:method" element={Element_Columns}>
              <Route
                path="/authorize/columns/:method/:id"
                element={Element_Columns}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default Security;
