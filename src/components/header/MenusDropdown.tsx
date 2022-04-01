import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  SettingTwoTone,
  SettingOutlined,
  ScheduleFilled,
  ProfileFilled,
  InteractionFilled,
  DribbbleCircleFilled,
  CalculatorFilled
} from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import HeaderDropdown from "./HeaderDropdown";
import styles from "./RightContent.module.less";

const AvatarDropdown: React.FC = () => {
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      <>
        <Menu.Item key="columns">
          <Link to="/authorize/columns">
          <ScheduleFilled />
            栏目管理
          </Link>
        </Menu.Item>
        <Menu.Item key="menus">
          <Link to="/authorize/menus">
            <ProfileFilled />
            菜单管理
          </Link>
        </Menu.Item>
        <Menu.Item key="competence">
          <Link to="/authorize/competence">
          <InteractionFilled />
            角色管理
          </Link>
        </Menu.Item>
        <Menu.Item key="permission">
          <Link to="/authorize/permission">
          <CalculatorFilled />
            权限管理
          </Link>
        </Menu.Item>
        <Menu.Item key="customer">
          <Link to="/authorize/customer">
          <DribbbleCircleFilled />
            商户管理
          </Link>
        </Menu.Item>
      </>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <SettingTwoTone />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
