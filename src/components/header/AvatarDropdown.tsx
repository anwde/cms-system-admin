import React, { useCallback } from "react";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import HeaderDropdown from "./HeaderDropdown";
import styles from "./RightContent.module.less";
import type { MenuInfo } from "rc-menu/lib/interface";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const onMenuClick = (event: MenuInfo) => {
    console.log(event);
  };

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  const currentUser = {
    avatar:
      "https://novel-ufile-res.qipa9.com/avatar/13/4188d1b8eb22da4527596872c8d9870c.jpg",
    name: "福布斯三十",
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <>
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
          <Menu.Divider />
        </>
      )} 
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
          src={currentUser.avatar}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
