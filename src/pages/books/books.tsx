import React from "react";
import Basic_Component from "../../components/base/component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import webapi from "../../utils/webapi";
// import { ProList } from "@ant-design/pro-components";
// import { Button, Tag } from 'antd';
import moment from "moment";
// import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
)
const BREADCRUMB = {
  title: "作品管理",
  lists: [
    {
      title: "作品管理",
      url: "/novel/books",
    },
  ],
  buttons: [
    {
      title: "创建作品",
      url: "/novel/books/add",
    },
  ],
};
class Books extends Basic_Component {
  constructor(props: any) {
    super(props);
  }
  /*----------------------0 parent start----------------------*/
  /**
   * 面包屑导航
   */
  __breadcrumb(data = {}) {
    super.__breadcrumb({ ...BREADCRUMB, ...data });
  }
  /*----------------------0 parent end----------------------*/

  /*----------------------1 other start----------------------*/

  /*----------------------1 other end----------------------*/

  /*----------------------2 init start  ----------------------*/
  /**
   * index  列表数据
   */
  async __init_index(d = {}, top = true) {
    this.__breadcrumb();
    const data = await webapi.request.get("books/books/lists", d);
  }
  /*----------------------2 init end  ----------------------*/

  /*----------------------3 handle start  ----------------------*/

  /*----------------------3 handle end  ----------------------*/

  /*----------------------4 render start  ----------------------*/
  __render_index() {
    const dataSource = [
      {
        title: "语雀的天空",
      },
      {
        title: "Ant Design",
      },
      {
        title: "蚂蚁金服体验科技",
      },
      {
        title: "TechUI",
      },
    ];
    return '1213213';
    // return (
    //   <ProList<{ title: string }>
    //     toolBarRender={() => {
    //       return [
    //         <Button key="3" type="primary">
    //           新建
    //         </Button>,
    //       ];
    //     }}
    //     itemLayout="vertical"
    //     rowKey="id"
    //     headerTitle="竖排样式"
    //     dataSource={dataSource}
    //     metas={{
    //       title: {},
    //       description: {
    //         render: () => (
    //           <>
    //             <Tag>语雀专栏</Tag>
    //             <Tag>设计语言</Tag>
    //             <Tag>蚂蚁金服</Tag>
    //           </>
    //         ),
    //       },
    //       actions: {
    //         render: () => [
    //           <IconText
    //             icon={StarOutlined}
    //             text="156"
    //             key="list-vertical-star-o"
    //           />,
    //           <IconText
    //             icon={LikeOutlined}
    //             text="156"
    //             key="list-vertical-like-o"
    //           />,
    //           <IconText
    //             icon={MessageOutlined}
    //             text="2"
    //             key="list-vertical-message"
    //           />,
    //         ],
    //       },
    //       extra: {
    //         render: () => (
    //           <img
    //             width={272}
    //             alt="logo"
    //             src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
    //           />
    //         ),
    //       },
    //       content: {
    //         render: () => {
    //           return (
    //             <div>
    //               段落示意：蚂蚁金服设计平台
    //               design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    //               design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    //             </div>
    //           );
    //         },
    //       },
    //     }}
    //   />
    // );
  }
  /*----------------------4 render end  ----------------------*/
}
export default connect((store) => ({ ...store }))(Books);
