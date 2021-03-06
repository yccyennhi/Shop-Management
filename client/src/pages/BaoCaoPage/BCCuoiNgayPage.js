import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import moment from "moment";
import {
  PageHeader,
  Space,
  Card,
  DatePicker,
  Layout,
  Radio,
  Result,
} from "antd";
import CuoiNgaytable from "../../components/table/BaoCaoTable/CuoiNgaytable";
import { AuthContext } from "../../contexts/AuthContext";
import { CuoiNgaysState$ } from "../../redux/selectors";
import COLOR from "../../color.js";
import Menubar from "../../components/header/Menubar/Menubar";

const { Content, Sider, Header } = Layout;

export default function BCCuoiNgayPage() {
  const today = moment().startOf("day");
  /* #region  lấy data từ server */
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getCuoiNgays.getCuoiNgaysRequest());
  }, [dispatch]);

  const CuoiNgays = useSelector(CuoiNgaysState$);

  /* #endregion */

  const [currentDate, setCurrentDate] = useState(moment().startOf("day"));
  const [currentDataSource, setCurrentDataSource] = useState({
    HoaDons: [],
    DoiTras: [],
    NhapHangs: [],
  });

  /* #region  set data theo ngày */
  React.useEffect(() => {
    console.log("CuoiNgays", CuoiNgays);
    if (CuoiNgays) {
      const { HoaDons, DoiTras, NhapHangs } = CuoiNgays;
      const newHoaDons = HoaDons.filter((e) =>
        moment(e.ThoiGian).isSame(currentDate, "day")
      );
      const newDoiTras = DoiTras.filter((e) =>
        moment(e.ThoiGian).isSame(currentDate, "day")
      );
      const newNhapHangs = NhapHangs.filter((e) =>
        moment(e.NgayCapNhat).isSame(currentDate, "day")
      );

      setCurrentDataSource({
        HoaDons: newHoaDons,
        DoiTras: newDoiTras,
        NhapHangs: newNhapHangs,
      });
    }
  }, [CuoiNgays, currentDate]);
  /* #endregion */

  const [activeType, setActiveType] = useState("hoaDon");

  const typeShow = {
    hoaDon: CuoiNgaytable(currentDataSource["HoaDons"], 1),
    doiTra: CuoiNgaytable(currentDataSource["DoiTras"], 2),
    nhapHang: CuoiNgaytable(currentDataSource["NhapHangs"], 3),
  };
  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);
  if (TaiKhoan.TenTK != "ADMIN") {
    return (
      <Result
        className="error-page"
        status="error"
        title="Hạn chế quyền truy cập"
        subTitle="Vui lòng kiểm tra lại đường link hoặc tài khoản đăng nhập!"
      />
    );
  }
  return (
    <Layout>
      <Header>
        <Menubar />
      </Header>
      <Layout>
        <Content>
          <PageHeader
            onBack={() => window.history.back()}
            className="site-page-header"
            title="Báo cáo cuối ngày"
          />
        </Content>
      </Layout>
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 24px", background: "#F0F2F5" }}
          className="site-layout-sider"
        >
          <div className="siste-card-border-less-wrapper">
            <Space direction="vertical">
              <Card
                title="Thống kê theo"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group defaultValue={1}>
                  <Space direction="vertical">
                    <Radio value={1} onClick={() => setActiveType("hoaDon")}>
                      Hóa đơn
                    </Radio>
                    <Radio value={2} onClick={() => setActiveType("doiTra")}>
                      Đổi trả
                    </Radio>
                    <Radio value={3} onClick={() => setActiveType("nhapHang")}>
                      Nhập hàng
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>

              <Card
                title="Thời gian áp dụng"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <DatePicker
                  defaultValue={today}
                  format="DD/MM/YYYY"
                  onChange={(e) =>
                    e ? setCurrentDate(e) : setCurrentDate(today)
                  }
                />
              </Card>
            </Space>
          </div>
        </Sider>
        <Content style={{ padding: "17px 24px 24px" }}>
          <div className="site-layout-content">{typeShow[activeType]}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
