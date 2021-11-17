import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"; 
import { Layout} from "antd";
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
import NhanVienPage from "./pages/NhanVienPage/NhanVienPage";

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
          <Header>
            <Menubar />
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <Switch>
                <Route path ='/SanPhams' exact component={HangHoaPage}/>
                <Route path ='/PhieuBaoHanhs' exact component={PhieuBaoHanhPage}/>
                <Route path='/KhachHangs' exact component={KhachHangPage}/>
                <Route path='/KhuyenMais' exact component={KhuyenMaiPage}/>
                <Route path='/NhanViens' exact component={NhanVienPage}/>
                <Route path='/TongQuans' exact component={DashboardPage}/>
                <Route path='/CuoiNgays' exact component={BCCuoiNgayPage}/>
                <Route path='/BCBanHangs' exact component={BCBanHangPage}/>    
                <Route path='/BCHangHoas' exact component={BCHangHoaPage}/>

              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
