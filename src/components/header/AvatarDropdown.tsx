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
import { connect } from "react-redux"; 
type State = { 
  server: Server.Server;
};
class AvatarDropdown extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      server: { ucdata: { avatar: "", nickname: "" } },
    }
    console.log("props=>", props);
  }
  componentWillReceiveProps(props: any) {
    // console.log("data=>", props);
    // this.props = props;
    this.setState({ ...props }, () => {
      // console.log("newProps=>",this.state)
    });
  }
  render() {
    const state = this.state;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]}>
        <>
          <Menu.Item key="center">
            <Link to={"authorize/account/center"}>
              <UserOutlined />
              个人中心
            </Link>
          </Menu.Item>
          <Menu.Item key="settings">
            <Link to={"authorize/account/settings"}>
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
            src={state.server.ucdata&&state.server.ucdata.avatar}
            alt="avatar"
          />
          <span className={`${styles.name} anticon`}>
            {state.server.ucdata&&state.server.ucdata.nickname}
          </span>
        </span>
      </HeaderDropdown>
    );
  }
}
export default connect((store) => ({ ...store }))(AvatarDropdown);
