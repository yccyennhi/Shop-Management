import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import AuthContextProvider from "./contexts/AuthContext.js";
import ProtectedRoute from "./components/route/ProtectedRoute";
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
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  const { Header, Content, Footer } = Layout;
  
  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Layout>
            <Header>
              <Headerbar />
            </Header>
          </Layout>
          <Layout>
            <Switch>
              <Route path="/Auth" exact component={AuthPage} />
              <ProtectedRoute path="/SanPhams" exact component={HangHoaPage} />
              <ProtectedRoute
                path="/PhieuBaoHanhs"
                exact
                component={PhieuBaoHanhPage}
              />
              <ProtectedRoute
                path="/PhieuHens"
                exact
                component={PhieuHenPage}
              />
              <ProtectedRoute
                path="/KhuyenMais"
                exact
                component={KhuyenMaiPage}
              />
              <ProtectedRoute path="/HoaDons" exact component={HoaDonPage} />
              <ProtectedRoute path="/TraHangs" exact component={DoiTraPage} />
              <ProtectedRoute
                path="/KhachHangs"
                exact
                component={KhachHangPage}
              />
              <ProtectedRoute
                path="/NhanViens"
                exact
                component={NhanVienPage}
              />
              <ProtectedRoute
                path="/TongQuans"
                exact
                component={DashboardPage}
              />
              <ProtectedRoute path="/" exact component={AuthPage} />
              <ProtectedRoute
                path="/CuoiNgays"
                exact
                component={BCCuoiNgayPage}
              />
              <ProtectedRoute
                path="/BCBanHangs"
                exact
                component={BCBanHangPage}
              />
              <ProtectedRoute
                path="/BCHangHoas"
                exact
                component={BCHangHoaPage}
              />
              <ProtectedRoute
                path="/PhieuNhaps"
                exact
                component={NhapHangPage}
              />
              <ProtectedRoute
                path="/ThemPhieuNhaps"
                exact
                component={ThemPhieuNhapPage}
              />
              <ProtectedRoute path="/Sales" exact component={SalePage} />
            </Switch>
            <Footer style={{ textAlign: "center" }}></Footer>
          </Layout>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
