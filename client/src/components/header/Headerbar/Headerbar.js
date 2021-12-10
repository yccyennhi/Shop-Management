import React, { useCallback, useContext } from "react"
import Logo from "../../../assets/Logo.png";
import { Menu, Col, Row } from "antd";
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
                <Menu.Item key="subitem1" onClick={openTaiKhoanModal}>Tài khoản</Menu.Item>
                <Menu.Item key="subitem2" onClick={logout}>Đăng xuất</Menu.Item>
              </SubMenu>
            </Menu>
            <TaiKhoanModal/>
          </div>
        </Col>
      </Row>
    </div>
  );
}
