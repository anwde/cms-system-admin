import React from "react";
import Basic_Component from "../../components/base/component";
import { connect } from "react-redux";
import webapi from "../../utils/webapi";
import styles from "../../assets/auth/skin2.module.less";
type Style = {
  container: string;
  content: string;
  spread: string;
  render: string;
  auth: string;
};
let customizer_styles: Style = {
  container: "",
  content: "",
  spread: "",
  render: "",
  auth: "",
};
const original_captcha_url =
  "/authorize/auth/captcha?u_action=graph&reset=1&height=30";
class Auth extends Basic_Component {
  constructor(props: any) {
    super(props);
    // this.state = {};
    customizer_styles =
      require("../../assets/auth/skin2-2.module.less").default;
  }
  __init_state_after() {
    return {
      valicode_text: "",
      input_disabled: false, //邀请人输入框
      captcha_btn_disabled: false,
      auth_btn_disabled: true,
      eyes_state: false,
      data: {
        captcha_code: "", //验证码
        captcha_type: "slide", //验证码证方式 graph slide
        password: "", //密码
        account: "", //账号
      },
      captcha_mobile: true,
      captcha: true,
      captcha_url: original_captcha_url,
      u_action: null,
      drawer_visible: false,
      drawer_data: {},
      is_agree: false,
      is_captcha_show: false,
      loading: false,
    };
  }
  __handle_init_before = () => {
    this.__clearinterval();
    this.setState({ is_agree: false });
  };
  render(): JSX.Element {
    console.log(this.props);
    return (
      <>
        <div
          className={[styles.container, customizer_styles.container].join(" ")}
        >
          <div
            className={[styles.content, customizer_styles.content].join(" ")}
          >
            <div
              className={[styles.spread, customizer_styles.spread].join(" ")}
            ></div>
            <div
              className={[styles.render, customizer_styles.render].join(" ")}
            >
              <div className={[styles.auth, customizer_styles.auth].join(" ")}>
                {this.__method("render")}
              </div>
            </div>
          </div>
          <footer>
            <span>版权所有：华语数媒（北京）科技有限公司 </span>
          </footer>
        </div>
      </>
    );
  }
  /*----------------------1 other start  ----------------------*/
  close_window() {
    webapi.utils.close_window();
  }
  /**
   * 对话框
   * @param content 对话框内容
   * @return void
   **/
  modal(message: string) {
    // alert(message);
    webapi.message.error(message);
  }
  redirect(data: { method: string }) {
    const method = data.method || "";
    //method in this
    if (method !== "" && this.isValidKey(method, this)) {
      const fun: never = this[method];
      // return fun(data);
    }
    webapi.utils.redirect(data);
  }
  isValidKey(
    key: string | number | symbol,
    object: object
  ): key is keyof typeof object {
    return key in object;
  }
  check = async (res = {}) => {
    const data = await webapi.request.get("authorize/auth/check", {
      data: {
        u_action: this.state.method,
      },
    });
    this.setState({
      data: { ...this.state.data, ...data.data, ...res },
    });
    if (data.code === 10000 || data.code === 11003) {
      this.redirect(data);
    }
  };
  /*----------------------1 other end  ----------------------*/

  /*----------------------2 init start----------------------*/

  __init_index() {
    this.__init_login();
  }
  __init_login() {
    this.check({ captcha_type: "slide" });
  }
  /*----------------------2 init end----------------------*/
  /*----------------------3 handle start  ----------------------*/
  /*----------------------3 handle end  ----------------------*/
  /*----------------------4 render start----------------------*/
  /**
   * render 渲染  index
   * @return obj
   */
  __render_index(): JSX.Element {
    return this.__render_login();
  }
  __render_login(): JSX.Element {
    return <>ddd</>;
  }
  /*----------------------4 render end----------------------*/
}
export default connect((store) => ({ ...store }))(Auth);
