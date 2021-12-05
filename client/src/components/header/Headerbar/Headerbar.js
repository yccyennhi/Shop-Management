import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { Menu, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";
const { SubMenu } = Menu;

function Headerbar() {
  const history = useHistory();
  const handleTongQuans = () => {
    history.push("/TongQuans");
  };
    return (
    <div>
      <Row>
        <Col span={6}>
          <div className="logo">
            <img src={Logo} alt="Website Logo" onClick={handleTongQuans}></img>
          </div>
        </Col>
        <Col span={6} offset={12}>
          <div className="account">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1000"]}>
              <SubMenu key="sub1" title="0585502434" icon={<UserOutlined />}>
                <Menu.Item key="subitem1">Tài khoản</Menu.Item>
                <Menu.Item key="subitem2">Đăng xuất</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Headerbar;
