import {
  Layout,
  Button,
  PageHeader,
  Input,
  Drawer,
  Collapse,
  Select,
  Col,
  Row,
  Divider,
  Popover,
  InputNumber,
  Cascader,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import "./styles.css";
const { Search } = Input;
const { Option } = Select;

const { Header, Content, Footer, Sider } = Layout;

export default function SalePage() {
  const [collapsed, setcollapsed] = useState(false);

  const onCollapse = () => {
    setcollapsed(true);
  };

  const PopoverKM = (
    <>
      <Row>
        <Col>
          <label>Mã khuyến mãi:</label>
        </Col>
        <Col>
          <Search placeholder="Mã KM" enterButton />
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Giảm giá</label>
        </Col>
        <Col>
          <label>0</label>
        </Col>
      </Row>
    </>
  );
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
    },
  ];
  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };
  return (
    <Layout className="layout">
      <PageHeader className="site-page-header">
        <Search placeholder="input search text" enterButton width={400} />
      </PageHeader>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
          <Collapse>
            <Collapse.Panel header="Danh sách sản phẩm">
              ádkahsdkashd
            </Collapse.Panel>
          </Collapse>
        </Layout>
        <Sider
          width={400}
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            marginRight: 24,
            minHeight: 450,
          }}
        >
          <Col>
            <Row>
              <Col flex="250px">
                <Button
                  icon={<UserOutlined />}
                  shape="circle"
                  size="small"
                  style={{ float: "left", marginRight: "2px" }}
                />
                <Cascader
                  options={options}
                  size="small"
                  style={{ width: "150px" }}
                  suffixIcon={<SearchOutlined />}
                  placeholder="Chọn nhân viên"
                  showSearch={{ filter }}
                />
              </Col>
              <Col flex="90px">
                <h5
                  style={{
                    borderBottomStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "lightgray",
                    fontWeight: "lighter",
                  }}
                >
                  19/02/2001 19:02
                </h5>
              </Col>
            </Row>
            <Row style={{ marginTop: "5px" }}>
              <Input
                suffix={
                  <Button size="small" icon={<PlusOutlined />} type="link" />
                }
                prefix={
                  <Button size="small" icon={<SearchOutlined />} type="link" />
                }
                bordered={false}
                style={{
                  borderWidth: "1px",
                  borderColor: "lightgrey",
                  borderBottomStyle: "solid",
                }}
                placeholder="Tìm khách hàng"
              />
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col flex="200px">
                <label>Tổng tiền hàng (0)</label>
              </Col>
              <Col flex="140px">
                <label style={{ float: "right" }}>0</label>
              </Col>
            </Row>
            <Row style={{ marginTop: "7px" }}>
              <Col flex="200px">
                <label>Giảm giá</label>
              </Col>
              <Col flex="140px">
                <Popover content={PopoverKM} trigger="click">
                  <label
                    style={{
                      float: "right",
                      width: "100px",
                      borderBottomStyle: "solid",
                      borderColor: "lightgray",
                      borderWidth: "1px",
                      textAlign: "right",
                    }}
                  >
                    0
                  </label>
                </Popover>
              </Col>
            </Row>
            <Row style={{ marginTop: "7px" }}>
              <Col flex="200px">
                <h4>Tổng tiền hàng</h4>
              </Col>
              <Col flex="140px">
                <h3 style={{ float: "right", color: "darkgreen" }}>0</h3>
              </Col>
            </Row>
            <Row style={{ marginTop: "7px" }}>
              <Col flex="200px">
                <label>Tiền khách trả</label>
              </Col>
              <Col flex="140px">
                <InputNumber
                  placeholder="Tiền khách trả"
                  min={0}
                  bordered={false}
                  size="small"
                  style={{ float: "right", width: "120px", textAlign: "right" }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "30px", height: '150px' }}>
              <Input.TextArea
                prefix={<EditOutlined/>}
                bordered={false}
                autoSize={true}
                placeholder="Ghi chú"
                style={{
                  borderBottomStyle: "solid",
                  borderColor: "lightgrey",
                  borderWidth: "2px",
                }}
              />
            </Row>
            <Row >
              <Button type = 'primary' style = {{background: '#00CC66'}} block size = 'large'>
                <p> Thanh toán </p>
              </Button>
            </Row>
          </Col>
        </Sider>
      </Layout>
    </Layout>
  );
}
