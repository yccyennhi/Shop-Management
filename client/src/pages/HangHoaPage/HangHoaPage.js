import React from "react";
import { Menu, Layout, Breadcrumb, Col, Row, Button } from "antd";
import "./styles.css";
import Logo from "../../assets/Logo.png";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Menubar from "../../components/header/Menubar/Menubar";
import Headerbar from "../../components/header/Headerbar/Headerbar";
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default function HangHoaPage() {
  return (
    <>
      <div className="site-layout-content">HangHoaPage</div>
    </>
  );
}
