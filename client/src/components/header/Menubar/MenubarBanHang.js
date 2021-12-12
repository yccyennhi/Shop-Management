import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu } from "antd";
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
import PhieuDoiTraModal from "../../modal/DoiTraModal/TaoPhieuDoiTraModal";
import * as actions from "../../../redux/actions";
const { SubMenu } = Menu;

function Menubar() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  let openModalTraHang = localStorage.getItem("OpenModal");
  //Ban Hang
  const handleBanHang = () => {
    history.push("/Sales");
  };

  React.useEffect(() => {
    if (openModalTraHang === "true") {
      openPhieuDoiTraModal();
      localStorage.setItem("OpenModal", JSON.stringify(false));
    }
  }, [openModalTraHang]);

  //Doi tra
  const openPhieuDoiTraModal = React.useCallback(() => {
    dispatch(actions.showTaoPhieuTraHangModal());
  });

  //Sua chua, bao hanh

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
          onTitleClick={openPhieuDoiTraModal}
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
      <PhieuHenBanHangModal />
      <PhieuBaoHanhBanHangModal />
      <PhieuDoiTraModal />
      <PhieuHenModal currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
}

export default Menubar;
