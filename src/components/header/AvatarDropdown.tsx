import React from "react";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import HeaderDropdown from "./HeaderDropdown";
import styles from "./RightContent.module.less";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
export type GlobalHeaderRightProps = {
  menu?: boolean;
};
type State = {
  server: Server.Server;
};
const AvatarDropdown: React.FC = () => {
  const {ucdata} = useSelector((state:Server.Props) => state.server );
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      <>
        <Menu.Item key="center">
          <Link to={"/authorize/account/center"}>
            <UserOutlined />
            个人中心
          </Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to={"/authorize/account/settings"}>
            <SettingOutlined />
            个人设置
          </Link>
        </Menu.Item>
        <Menu.Divider />
      </>

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={ucdata.avatar}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>
          {ucdata.nickname}
        </span>
      </span>
    </HeaderDropdown>
  );
};
export default AvatarDropdown;
