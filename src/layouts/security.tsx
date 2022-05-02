import React, { useState, lazy, useEffect, Suspense } from "react";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import "@/App.css";
import type { ProSettings } from "@ant-design/pro-layout";
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from "@ant-design/pro-layout";
import defaultProps from "./_defaultProps";
import routers from "../routes/router";
import webapi from "../utils/webapi";
import { RightContent } from "../components/header/index";
import { Route, Switch, Redirect } from "react-router-dom";
import Loading from "../components/loading/loading";
import type { MenuDataItem } from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon, * as Icons from "@ant-design/icons";
const loopMenuItem = (
  columns: [],
  is_children: boolean = false
): MenuDataItem[] => {
  // console.log("props=>", LikeOutlined);
  return columns.map(({ icon, children, name, url }) => ({
    name,
    icon: icon ? <Icon component={Icons[icon]} /> : "",
    path: url,
    routes: children && loopMenuItem(children, true),
  }));
};

const Irouters = (Server_routes: Server.Routes[]) => {
  let r = [];
  const rs = (routes: Server.Routes[], pprop: Server.Routes = { path: "" }) => {
    routes.map((prop, key) => {
      let { component, path } = prop;
      if (!component && pprop.component) {
        component = prop.component = pprop.component;
      }
      if (prop.children) {
        rs(prop.children, prop);
      }
      r.push(<Route path={path} key={key} component={component}></Route>);
    });
  };
  rs(Server_routes);
  return r;
};
const Layout = () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const [pathname, setPathname] = useState("/welcome");
  const { columns } = useSelector((state: Server.Props) => state.server);
  return (
    <>
      <ProLayout
        {...defaultProps}
        title="编辑后台"
        location={{
          pathname,
        }}
        menu={{ request: async () => loopMenuItem(columns || []) }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => {
          return (
            <Link
              to={`${item.path}`}
              onClick={() => {
                setPathname(item.path || "/welcome");
              }}
            >
              {dom}
            </Link>
          );
        }}
        rightContentRender={() => <RightContent />}
        {...settings}
      >
        <div
          style={{
            height: "120vh",
          }}
        >
          <Suspense fallback={<Loading />}>
            <Switch>{Irouters(routers)}</Switch>
          </Suspense>
        </div>
      </ProLayout>
      {/* <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById("container")}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={false}
      /> */}
    </>
  );
};
export default Layout;
