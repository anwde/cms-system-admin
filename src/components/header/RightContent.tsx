import { Space } from "antd";
import Avatar from './AvatarDropdown';
import NoticeIconView from './NoticeIcon';
import Menus from './MenusDropdown';
import styles from "./RightContent.module.less";
console.log(styles);
const GlobalHeaderRight: React.FC = () => {
  let className = styles.right; 
  return (
    <>
      <Space className={className}>
      <NoticeIconView />
      <Menus />
      <Avatar menu /> 
      </Space>
    </>
  );
};
export default GlobalHeaderRight;
