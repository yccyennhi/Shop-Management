import React, { useEffect, useRef, useMemo, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import MenuItem from "antd/lib/menu/MenuItem";
const { SubMenu } = Menu;

function Menubar() {
  const history = useHistory();
  //Tong Quan
  const handleTongQuan = () => {
    history.push("/TongQuans");
  };

  //Hang hoa
  const handleHangHoa = () => {
    history.push("/SanPhams");
  };
  const handleThietLapGia = () => {
    history.push("/ThietLapGias");
  };
  const handlePhieuBaoHanh = () => {
    history.push("/PhieuBaoHanhs");
  };
  const handlePhieuHen = () => {
    history.push("/PhieuHens");
  };
  const handleKiemKho = () => {
    history.push("/KiemKhos");
  };

  //Giao dich
  const handleDatHang = () => {
    history.push("/DatHangs");
  };
  const handleHoaDon = () => {
    history.push("/HoaDons");
  };
  const handleTraHang = () => {
    history.push("/TraHangs");
  };
  const handleYeuCauSuaChua = () => {
    history.push("/YeuCauSuaChuas");
  };
  const handleNhapHang = () => {
    history.push("/PhieuNhaps");
  };
  const handleTraHangNhap = () => {
    history.push("/TraHangNhaps");
  };
  //Khach Hang
  const handleKhachHang = () => {
    history.push("/KhachHangs");
  };

  //Nhan vien
  const handleNhanVien = () => {
    history.push("/NhanViens");
  };

  //Khuyen Mai
  const handleKhuyenMai = () => {
    history.push("/KhuyenMais");
  };

  //So quy
  const handleSoQuy = () => {
    history.push("/SoQuys");
  };

  //Bao cao
  const handleBCCuoiNgay = () => {
    history.push("/CuoiNgays");
  };
  const handleBCBanHang = () => {
    history.push("/BCBanHangs");
  };
  const handleBCDatHang = () => {
    history.push("/BCDatHangs");
  };
  const handleBCHangHoa = () => {
    history.push("/BCHangHoas");
  };

  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1000"]}>
        <SubMenu
          key="TongQuan"
          icon={<EyeOutlined />}
          title="T???ng quan"
          onTitleClick={handleTongQuan}
        ></SubMenu>

        <SubMenu
          key="HangHoa"
          icon={<DatabaseOutlined />}
          title="H??ng h??a"
          onTitleClick={handleHangHoa}
        >
          <Menu.Item key="DanhMuc" onClick={handleHangHoa}>
            Danh m???c s???n ph???m
          </Menu.Item>
          <Menu.Item key="PhieuBaoHanh" onClick={handlePhieuBaoHanh}>
            Phi???u b???o h??nh
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="GiaoDich"
          icon={<SwapOutlined />}
          title="Giao d???ch"
          onTitleClick={handleHoaDon}
        >
          <Menu.Item key="HoaDon" onClick={handleHoaDon}>
            H??a ????n
          </Menu.Item>
          <Menu.Item key="TraHang" onClick={handleTraHang}>
            Tr??? h??ng
          </Menu.Item>
          <Menu.Item key="PhieuHen" onClick={handlePhieuHen}>
            Y??u c???u s???a ch???a
          </Menu.Item>
          <Menu.Item key="NhapHang" onClick={handleNhapHang}>
            Nh???p h??ng
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="KhuyenMai"
          icon={<TagsOutlined />}
          title="Khuy???n m??i"
          onTitleClick={handleKhuyenMai}
        ></SubMenu>
        <SubMenu
          key="KhachHang"
          icon={<UserOutlined />}
          title="Kh??ch h??ng"
          onTitleClick={handleKhachHang}
        ></SubMenu>
        <SubMenu
          key="NhanVien"
          icon={<TeamOutlined />}
          title="Nh??n vi??n"
          onTitleClick={handleNhanVien}
        ></SubMenu>
        <SubMenu
          key="BaoCao"
          icon={<BarChartOutlined />}
          title="B??o c??o"
          onTitleClick={handleBCCuoiNgay}
        >
          <Menu.Item key="BCCuoiNgay" onClick={handleBCCuoiNgay}>
            Cu???i ng??y
          </Menu.Item>
          <Menu.Item key="BCBanHang" onClick={handleBCBanHang}>
            B??n h??ng
          </Menu.Item>
          <Menu.Item key="BCHangHoa" onClick={handleBCHangHoa}>
            H??ng h??a
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Menubar;
