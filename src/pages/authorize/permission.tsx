import React from "react";
import Basic_Component from "../../components/base/component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import webapi from "../../utils/webapi";
import { withRouter } from "../../utils/router";
import moment from "moment";
import ProTable from "@ant-design/pro-table";
import type { ProColumns } from "@ant-design/pro-table";
import { Form, Input, Radio, Select, Table, Button, Cascader } from "antd";
class Permission extends Basic_Component {
  constructor(props: any) {
    super(props);
  }
  /*----------------------0 parent start----------------------*/

  /*----------------------0 parent end----------------------*/

  /*----------------------1 other start----------------------*/

  /*----------------------1 other end----------------------*/

  /*----------------------2 init start  ----------------------*/
  /**
   * index  列表数据
   */
  __init_index(d = {}) {
    this.init_lists("authorize/menus/lists", d);
  }
  /**
   *  列表数据
   */
  async init_lists(url: string, d: Server.Query = {}, b = {}) {
    d.order_field = this.state.order_field;
    d.order_value = this.state.order_value;
    d.row_count = this.state.pagination.pageSize;
    d.offset = this.state.pagination.current;
    d.q = this.state.q;
    var data = await webapi.request.get(url, d);
    var lists = [];
    if (data.code === 10000 && data.num_rows > 0) {
      lists = data.lists;
    }
    this.setState({
      lists: lists,
      pagination: { ...this.state.pagination, total: data.num_rows },
    });
    this.__breadcrumb(b);
  }
  /*----------------------2 init end  ----------------------*/

  /*----------------------3 handle start  ----------------------*/
  handle_do_delete(url: string, id: number) {
    webapi.confirm({
      url: `authorize/menus/${url}`,
      data: { id },
      success: (data: Server.Status) => {
        if (data.status === "success") {
          webapi.message.success(data.message);
          this.__method("init");
        } else {
          webapi.message.error(data.message);
        }
      },
    });
  }
  /**
   * 删除
   **/
  handle_delete = (id: number) => {
    this.handle_do_delete("delete", id);
  };
  /*----------------------3 handle end  ----------------------*/

  /*----------------------4 render start  ----------------------*/
  /**
   * 渲染 首页
   **/
  __render_index(): JSX.Element {
    const columns: ProColumns<Server.Menus>[] = [
      {
        title: "名称",
        sorter: true,
        fixed: "left",
        dataIndex: "name",
        align: "center",
      },
      {
        title: "链接",
        sorter: true,
        fixed: "left",
        dataIndex: "url",
        align: "center",
      },

      {
        title: "更新时间",
        sorter: true,
        dataIndex: "update_time",
        render: (_, row) => {
          if (row.update_time && row.update_time > 0) {
            return moment(row.update_time * 1000).format("YYYY-MM-DD HH:mm:ss");
          }else{
            return <></>;
          }
        },
        align: "center",
      },
      {
        title: "创建时间",
        sorter: true,
        dataIndex: "create_time",
        render: (_, row) => {
          if (row.create_time && row.create_time > 0) {
            return moment(row.create_time * 1000).format("YYYY-MM-DD HH:mm:ss");
          }else{
            return <></>;
          } 
        },
        align: "center",
      },
      {
        title: "操作",
        align: "center",
        render: (_,row) => {
          return (
            <div>
              <a
                className="btn btn-outline-info btn-circle btn-lg btn-circle"
                title="删除"
                href="#!"
                onClick={() => {
                  this.handle_delete(row.id);
                }}
              >
                <i className="ti-trash" />{" "}
              </a>
              <Link
                to={`/authorize/menus/edit/${row.id}`}
                className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
              >
                <i className="ti-pencil-alt" />
              </Link>
            </div>
          );
        },
      },
    ];
    return (
      <ProTable
        headerTitle="菜单管理"
        rowKey={"id"}
        columns={columns} 
        pagination={this.state.pagination}
        dataSource={this.state.lists}
        loading={this.props.server.loading}
        onChange={this.__handle_table_change} 
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => {}}>
            新建
          </Button>,
        ]}
        search={{
          labelWidth: 120,
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {},
        }}
      />
    );
  }
  /*----------------------4 render end  ----------------------*/
}
export default connect((store) => ({ ...store }))(withRouter(Permission));
