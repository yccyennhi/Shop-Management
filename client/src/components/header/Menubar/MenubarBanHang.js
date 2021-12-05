import React, { useEffect, useRef, useMemo, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Dropdown, message, Space } from "antd";
import {
  EyeOutlined,
  DatabaseOutlined,
  SwapOutlined,
  UserOutlined,
  TagsOutlined,
  TeamOutlined,
  DollarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import PhieuHenModal from "../../../components/modal/PhieuHenModal/PhieuHenModal";
import PhieuBaoHanhBanHangModal from "../../../components/modal/PhieuBaoHanhModal/PhieuBaoHanhBanHangModal";

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
  const handleTaoPhieuHen = () => {
    openCreatePhieuHenModal();
  };
  const dispatch = useDispatch();

  const openCreatePhieuHenModal = React.useCallback(() => {
    dispatch(actions.showTaoPhieuHenModal());
  }, [dispatch]);
  
  const openPhieuBaoHanhBanHangModal = React.useCallback(() => {
    dispatch(actions.showPhieuBaoHanhBanHangModal());
  }, [dispatch]);
  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1000"]}>
        <SubMenu
          key="BanHang"
          icon={<EyeOutlined />}
          title="Bán hàng"
          onTitleClick={handleBanHang}
        ></SubMenu>
        <SubMenu
          key="DoiTra"
          icon={<EyeOutlined />}
          title="Đổi trả"
          onTitleClick={handleDoiTra}
        ></SubMenu>
         <SubMenu
          key="BaoHanh"
          icon={<EyeOutlined />}
          title="Bảo hành"
          onTitleClick={openPhieuBaoHanhBanHangModal}
        ></SubMenu>
        <SubMenu
          key="PhieuHen"
          icon={<EyeOutlined />}
          title="Yêu cầu sửa chữa"
          onTitleClick={openCreatePhieuHenModal}
        >
           <Menu.Item key="BCCuoiNgay" onClick={openCreatePhieuHenModal}>
            Tạo phiếu hẹn
          </Menu.Item>
          <Menu.Item key="BCBanHang" onClick={openCreatePhieuHenModal}>
            Cập nhật phiếu hẹn
          </Menu.Item>
        </SubMenu>
      </Menu>
      <PhieuBaoHanhBanHangModal/>
      <PhieuHenModal currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
}

export default Menubar;
