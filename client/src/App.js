import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"; 
import { Menu, Layout, Breadcrumb, Col, Row, Button } from "antd";
import Menubar from "./components/header/Menubar/Menubar";
import Headerbar from "./components/header/Headerbar/Headerbar";
import HangHoaPage from "./pages/HangHoaPage/HangHoaPage";
import KhuyenMaiPage from "./pages/KhuyenMaiPage/KhuyenMaiPage";

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
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <Switch>
                <Route path ='/' exact component={HangHoaPage}/>
                <Route path='/KhuyenMais' exact component={KhuyenMaiPage}/>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
