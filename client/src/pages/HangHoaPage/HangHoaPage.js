import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Layout, PageHeader, Col, Row, Button, Space, Modal } from "antd";
import "./styles.css";
import Logo from "../../assets/Logo.png";
import {
  UserOutlined,
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
  RestOutlined,
} from "@ant-design/icons";
import HangHoatable from "../../components/table/HangHoatable/HangHoatable.js";
import Menubar from "../../components/header/Menubar/Menubar";
import Headerbar from "../../components/header/Headerbar/Headerbar";
import * as actions from "../../redux/actions";
import { SanPhamsState$ } from "../../redux/selectors";
import ReactExport from "react-data-export";

import TaoSanPhamModal from "../../components/modal/TaoSanPhamModal/createSanPhamModal";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
      name: "Johson",
      amount: 30000,
      sex: 'M',
      is_married: true
  },
  {
      name: "Monika",
      amount: 355000,
      sex: 'F',
      is_married: false
  },
  {
      name: "John",
      amount: 250000,
      sex: 'M',
      is_married: false
  },
  {
      name: "Josef",
      amount: 450500,
      sex: 'M',
      is_married: true
  }
];

const dataSet2 = [
  {
      name: "Johnson",
      total: 25,
      remainig: 16
  },
  {
      name: "Josef",
      total: 25,
      remainig: 7
  }
];


// class Download extends React.Component {
//   render() {
//       return (
//           <ExcelFile>
//               <ExcelSheet data={dataSet1} name="Employees">
//                   <ExcelColumn label="Name" value="name"/>
//                   <ExcelColumn label="Wallet Money" value="amount"/>
//                   <ExcelColumn label="Gender" value="sex"/>
//                   <ExcelColumn label="Marital Status"
//                                value={(col) => col.is_married ? "Married" : "Single"}/>
//               </ExcelSheet>
//               <ExcelSheet data={dataSet2} name="Leaves">
//                   <ExcelColumn label="Name" value="name"/>
//                   <ExcelColumn label="Total Leaves" value="total"/>
//                   <ExcelColumn label="Remaining Leaves" value="remaining"/>
//               </ExcelSheet>
//           </ExcelFile>
//       );
//   }
// }
export default function HangHoaPage() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const openTaoSanPhamModal = React.useCallback(() => {
    dispatch(actions.showTaoSanPhamModal());
  }, [dispatch]);


//   const onExport = React.useCallback(() => {
//     console.log('export');
//     <ExcelFile>
//     <ExcelSheet data={dataSet1} name="Employees">
//         <ExcelColumn label="Name" value="name"/>
//         <ExcelColumn label="Wallet Money" value="amount"/>
//         <ExcelColumn label="Gender" value="sex"/>
//         <ExcelColumn label="Marital Status"
//                      value={(col) => col.is_married ? "Married" : "Single"}/>
//     </ExcelSheet>
//     <ExcelSheet data={dataSet2} name="Leaves">
//         <ExcelColumn label="Name" value="name"/>
//         <ExcelColumn label="Total Leaves" value="total"/>
//         <ExcelColumn label="Remaining Leaves" value="remaining"/>
//     </ExcelSheet>
// </ExcelFile>
//   }, [dispatch]);

  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Danh mục hàng hóa" />
        <div>
          <Row justify="end">
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openTaoSanPhamModal}
              >
                Thêm hàng hóa
              </Button>
              <TaoSanPhamModal/>
              <Button type="primary" icon={<ImportOutlined />}>
                Import
              </Button>
              <Button type="primary" icon={<DownloadOutlined />} >
                Xuất file
              </Button>
            </Space>
          </Row>
          <TaoSanPhamModal currentId={currentId} setCurrentId={setCurrentId}/>
          <HangHoatable setCurrentId={setCurrentId}/>
        </div>
      </div>
      ,
    </>
  );
}
