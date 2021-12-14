import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { Menu, Col, Row, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { showTaiKhoanModal } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import TaiKhoanModal from "../../modal/TaiKhoanModal/TaiKhoanModal";
const { SubMenu } = Menu;

export default function Headerbar() {
  const dispatch = useDispatch();

  const {
    logoutTaiKhoan,
    authState: { TaiKhoan },
  } = useContext(AuthContext);

  const logout = () => logoutTaiKhoan();

  const openTaiKhoanModal = useCallback(() => {
    dispatch(showTaiKhoanModal());
  }, [dispatch]);

  const history = useHistory();
  let link = TaiKhoan?.TenTK === "ADMIN" ? "/" : "/Sales";

  const menu = (
    <Menu
      theme="dark"
      mode="horizontal"
      placement="bottomRight"
      defaultSelectedKeys={["1000"]}
    >
      <Menu.Item key="1" onClick={openTaiKhoanModal}>
        Tài khoản
      </Menu.Item>
      <Menu.Item
        key="2"
        disabled={TaiKhoan? false :true}
        onClick={() => {
          history.push("/Sales");
        }}
      >
        Giao diện bán hàng
      </Menu.Item>
      <Menu.Item
        key="3"
        disabled={TaiKhoan?.TenTK === "ADMIN"?false:true}
        onClick={() => {
          history.push("/");
        }}
      >
        Giao diện quản lý
      </Menu.Item>
      <Menu.Item key="4" onClick={logout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Row>
        <Col span={6}>
          <div className="logo">
            <img
              src={Logo}
              alt="Website Logo"
              onClick={() => {
                history.push(link);
              }}
            ></img>
          </div>
        </Col>
        <Col span={6} offset={12}>
          <div className="account">
            <Dropdown overlay={menu} placement="bottomRight">
              <Button
                type="primary"
                disabled={TaiKhoan ? false : true}
                key="sub1"
                title={TaiKhoan ? TaiKhoan.TenTK : "No user"}
                icon={<UserOutlined />}
              >
                {TaiKhoan ? TaiKhoan.TenTK : "No user"}
              </Button>
            </Dropdown>

            <TaiKhoanModal />
          </div>
        </Col>
      </Row>
    </div>
  );
}
