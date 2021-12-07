import React, { useEffect, useRef, useMemo, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Dropdown, message, Space } from "antd";
import {
  DatabaseOutlined,
  SwapOutlined,
  SafetyCertificateOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import PhieuHenModal from "../../../components/modal/PhieuHenModal/PhieuHenModal";
import PhieuBaoHanhBanHangModal from "../../../components/modal/PhieuBaoHanhModal/PhieuBaoHanhBanHangModal";
import PhieuHenBanHangModal from "../../../components/modal/PhieuHenModal/PhieuHenBanHangModal";
import * as actions from "../../../redux/actions";
import MenuItem from "antd/lib/menu/MenuItem";
const { SubMenu } = Menu;

function Menubar() {
  const [currentId, setCurrentId] = useState(null);
  const history = useHistory();
  //Ban Hang
  const handleBanHang = () => {
    history.push("/Sales");
  };

  //Doi tra
  const handleDoiTra = () => {};

  //Sua chua, bao hanh
  const dispatch = useDispatch();

  const openCreatePhieuHenModal = React.useCallback(() => {
    dispatch(actions.showTaoPhieuHenModal());
  }, [dispatch]);

  const openPhieuHenBanHangModal = React.useCallback(() => {
    dispatch(actions.showPhieuHenBanHangModal());
  }, [dispatch]);

  const openPhieuBaoHanhBanHangModal = React.useCallback(() => {
    dispatch(actions.showPhieuBaoHanhBanHangModal());
  }, [dispatch]);

  //Nhap hang
  const handleNhapHang = () => {
    history.push("/ThemPhieuNhaps");
  };

  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1000"]}>
        <SubMenu
          key="BanHang"
          icon={<DollarOutlined />}
          title="Bán hàng"
          onTitleClick={handleBanHang}
        ></SubMenu>
        <SubMenu
          key="DoiTra"
          icon={<SwapOutlined />}
          title="Đổi trả"
          onTitleClick={handleDoiTra}
        ></SubMenu>
         <SubMenu
          key="BaoHanh"
          icon={<SafetyCertificateOutlined />}
          title="Bảo hành"
          onTitleClick={openPhieuBaoHanhBanHangModal}
        ></SubMenu>
        <SubMenu
          key="PhieuHen"
          icon={<ExclamationCircleOutlined />}
          title="Yêu cầu sửa chữa"
          onTitleClick={openCreatePhieuHenModal}
        >
           <Menu.Item key="TaoPhieuHen" onClick={openCreatePhieuHenModal}>
            Tạo phiếu hẹn
          </Menu.Item>
          <Menu.Item key="CapNhatPhieuHen" onClick={openPhieuHenBanHangModal}>
            Cập nhật phiếu hẹn
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="NhapHang"
          icon={<DatabaseOutlined />}
          title="Nhập hàng"
          onTitleClick={handleNhapHang}
        ></SubMenu>
      </Menu>
      <PhieuHenBanHangModal/>
      <PhieuBaoHanhBanHangModal/>
      <PhieuHenModal currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
}

export default Menubar;
