import React from "react";
import { Menu, Dropdown, message, Space } from "antd";
import {
  GoldenFilled,
  EyeFilled,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
const { SubMenu } = Menu;

function Menubar() {
  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1000"]}>
        
          <SubMenu key="sub1" icon={<EyeFilled />} title="Tổng quan">
            <Menu.Item key="subitem1">option1</Menu.Item>
            <Menu.Item key="subitem2">option2</Menu.Item>
            <Menu.Item key="subitem3">option3</Menu.Item>
            <Menu.Item key="subitem4">option4</Menu.Item>
          </SubMenu>
        
          <SubMenu key="sub2" icon={<GoldenFilled />} title="Hàng hóa">
            <Menu.Item key="subitem5">Danh mục</Menu.Item>
            <Menu.Item key="subitem6">Thiết lập giá</Menu.Item>
            <Menu.Item key="subitem7">Phiếu bảo hành</Menu.Item>
            <Menu.Item key="subitem8">Kiểm kho</Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" icon={<SwapOutlined />} title="Giao dịch">
            <Menu.Item key="subitem9">option5</Menu.Item>
            <Menu.Item key="subitem10">option6</Menu.Item>
            <Menu.Item key="subitem11">option7</Menu.Item>
            <Menu.Item key="subitem12">option8</Menu.Item>
          </SubMenu>

          <SubMenu key="sub4" icon={<UserOutlined />} title="Đối tác">
            <Menu.Item key="subitem13">option5</Menu.Item>
            <Menu.Item key="subitem14">option6</Menu.Item>
            <Menu.Item key="subitem15">option7</Menu.Item>
            <Menu.Item key="subitem16">option8</Menu.Item>
          </SubMenu>

          <SubMenu key="sub5" icon={<UserOutlined />} title="Nhân viên">
            <Menu.Item key="subitem17">option5</Menu.Item>
            <Menu.Item key="subitem18">option6</Menu.Item>
            <Menu.Item key="subitem19">option7</Menu.Item>
            <Menu.Item key="subitem20">option8</Menu.Item>
          </SubMenu>

       
          <SubMenu key="sub6" icon={<UserOutlined />} title="Sổ quỹ">
            <Menu.Item key="subitem21">option5</Menu.Item>
            <Menu.Item key="subitem22">option6</Menu.Item>
            <Menu.Item key="subitem23">option7</Menu.Item>
            <Menu.Item key="subitem24">option8</Menu.Item>
          </SubMenu>


      </Menu>
    </div>
  );
}

export default Menubar;
