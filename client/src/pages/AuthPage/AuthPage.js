import { Button, Card, Form, Input, Layout, Spin, Typography } from "antd";
import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import COLOR from "../../color";
import { messageError } from "../../components/message";
import { AuthContext } from "../../contexts/AuthContext";
const { Content } = Layout;

export default function AuthPage() {
  const [form] = Form.useForm();

  //context
  const {
    loginTaiKhoan,
    authState: { authLoading, isAuthenticated, TaiKhoan },
  } = useContext(AuthContext);

  const history = useHistory();

  const [loginForm, setLoginForm] = useState({
    TenTK: "",
    MatKhau: "",
  });

  const login = async (e) => {
    // e.preventDefault();

    try {
      const loginData = await loginTaiKhoan(loginForm);
      if (!loginData.success) {
        messageError("Tài khoản hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let body;

  if (authLoading) {
    body = (
      <div style={{ margin: "0 auto", padding: "50px 0px 0px 0px" }}>
        <Spin size="large" />
      </div>
    );
  } else if (isAuthenticated) {
    return (
      <Redirect to={TaiKhoan.TenTK == "ADMIN" ? "/TongQuans" : "/Sales"} />
    );
  } else {
    body = (
      <>
        <Layout>
          {/* <Header>
            <Menubar />
          </Header> */}
          <Content
            style={{ padding: "24px 0px 24px 0px", textAlign: "center" }}
          >
            <Typography.Title level={4}>Đăng nhập</Typography.Title>
          </Content>
          <Content style={{ margin: "0 auto", minHeight:"70vh" }}>
            <Card
              bordered={false}
              style={{ width: 500, color: COLOR.darkblue }}
            >
              <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 50 }}
                layout="horizontal"
                onFinish={(e) => login(e)}
              >
                <Form.Item name="TenTK" labelCol="Tài khoản" required>
                  <Input
                    placeholder="Nhập tài khoản"
                    value={loginForm.TenTK.toUpperCase()}
                    onChange={(e) => {
                      setLoginForm({
                        ...loginForm,
                        TenTK: e.target.value.toUpperCase(),
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item name="MatKhau" labelCol="Mật khẩu" required>
                  <Input.Password
                    placeholder="Nhập mật khẩu"
                    value={loginForm.MatKhau}
                    onChange={(e) => {
                      setLoginForm({
                        ...loginForm,
                        MatKhau: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Content>
        </Layout>
      </>
    );
  }

  return <>{body} </>;
}
