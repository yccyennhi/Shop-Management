import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import Menubar from "./components/header/Menubar/Menubar";
import Headerbar from "./components/header/Headerbar/Headerbar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import HangHoaPage from "./pages/HangHoaPage/HangHoaPage";
import KhachHangPage from "./pages/KhachHangPage/KhachHangPage";
import KhuyenMaiPage from "./pages/KhuyenMaiPage/KhuyenMaiPage";
import BCCuoiNgayPage from "./pages/BaoCaoPage/BCCuoiNgayPage";
import BCBanHangPage from "./pages/BaoCaoPage/BCBanHangPage";
import BCHangHoaPage from "./pages/BaoCaoPage/BCHangHoaPage";
import PhieuBaoHanhPage from "./pages/PhieuBaoHanhPage/PhieuBaoHanhPage";
import PhieuHenPage from "./pages/PhieuHenPage/PhieuHenPage";
import NhanVienPage from "./pages/NhanVienPage/NhanVienPage";
import HoaDonPage from "./pages/HoaDonPage/HoaDonPage";
import DoiTraPage from "./pages/DoiTraPage/DoiTraPage";
import NhapHangPage from "./pages/NhapHangPage/NhapHangPage";
import ThemPhieuNhapPage from "./pages/ThemPhieuNhapPage/ThemPhieuNhapPage";
import SalePage from "./pages/SalePage/SalePage";

function App() {
  const { Header, Content, Footer } = Layout;
  
  return (
    <div className="App">
      <Router>
        <Layout>
          <Header>
            <Headerbar />
          </Header>
        </Layout>
        <Layout className="layout">
          {/* <Header>
            <Menubar />
          </Header> */}
          {/* <Content style={{ padding: "50px 50px" }}>
            <div className="site-layout-content"> */}
          <Switch>
            <Route path="/SanPhams" exact component={HangHoaPage} />
            <Route path="/PhieuBaoHanhs" exact component={PhieuBaoHanhPage} />
            <Route path="/PhieuHens" exact component={PhieuHenPage} />
            <Route path="/KhuyenMais" exact component={KhuyenMaiPage} />
            <Route path="/HoaDons" exact component={HoaDonPage} />
            <Route path="/TraHangs" exact component={DoiTraPage} />
            <Route path="/KhachHangs" exact component={KhachHangPage} />
            <Route path="/NhanViens" exact component={NhanVienPage} />
            <Route path="/TongQuans" exact component={DashboardPage} />
            <Route path="/" exact component={DashboardPage} />
            <Route path="/CuoiNgays" exact component={BCCuoiNgayPage} />
            <Route path="/BCBanHangs" exact component={BCBanHangPage} />
            <Route path="/BCHangHoas" exact component={BCHangHoaPage} />
            <Route path="/PhieuNhaps" exact component={NhapHangPage} />
            <Route path="/ThemPhieuNhaps" exact component={ThemPhieuNhapPage} />
            <Route path="/Sales" exact component={SalePage} />
          </Switch>
          {/* </div>
          </Content> */}
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
