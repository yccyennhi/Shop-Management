import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Menu, Layout, Breadcrumb, Col, Row, Button } from "antd";
import Menubar from "./components/header/Menubar/Menubar";
import Headerbar from "./components/header/Headerbar/Headerbar";
import HangHoaPage from "./pages/HangHoaPage/HangHoaPage";
import KhuyenMaiPage from "./pages/KhuyenMaiPage/KhuyenMaiPage";
import HoaDonPage from "./pages/GiaoDichPage/HoaDonPage";
import DoiTraPage from "./pages/GiaoDichPage/DoiTraPage";

function App() {
  const { Header, Content, Footer } = Layout;
  const { SubMenu } = Menu;

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
          <Content style={{ padding: "50px 50px" }}>
            <div className="site-layout-content">
              <Switch>
                <Route path="/HangHoas" exact component={HangHoaPage} />
                <Route path="/HoaDons" exact component={HoaDonPage} />
                <Route path="/KhuyenMais" exact component={KhuyenMaiPage} />
                <Route path="/PhieuDoiTras" exact component={DoiTraPage} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
