import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { Menu, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";
import { AuthContext } from "../../../contexts/AuthContext";
const { SubMenu } = Menu;

function Headerbar() {
  const {
    logoutTaiKhoan,
    authState: { isAuthenticated, TaiKhoan },
  } = useContext(AuthContext);

  const logout = () => logoutTaiKhoan();

  return (
    <div>
      <Row>
        <Col span={6}>
          <div className="logo">
            <img src={Logo} alt="Website Logo"></img>
          </div>
        </Col>
        <Col span={6} offset={12}>
          <div className="account">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1000"]}>
              <SubMenu
                disabled={TaiKhoan ? false : true}
                key="sub1"
                title={TaiKhoan ? TaiKhoan.TenTK : "No user"}
                icon={<UserOutlined />}
              >
                <Menu.Item key="subitem1">Tài khoản</Menu.Item>
                <Menu.Item key="subitem2" onClick={logout}>Đăng xuất</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Headerbar;
