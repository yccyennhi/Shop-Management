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
import HangHoatable from "../../components/table/BaoCaoTable/HangHoatable";
import HangHoaBarReport from "../../components/chart/HangHoaBarReport";
import { AuthContext } from "../../contexts/AuthContext";
import { BCHangHoasState$ } from "../../redux/selectors";

import COLOR from "../../color.js";
import Menubar from "../../components/header/Menubar/Menubar";
const { RangePicker } = DatePicker;

const { Content, Sider, Header } = Layout;

export default function BCHangHoaPage() {
  const today = [moment().subtract(7, "day").startOf("day"), moment()];
  const [currentDate, setCurrentDate] = useState(today);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getBCHangHoas.getBCHangHoasRequest());
  }, [dispatch]);

  const HangHoas = useSelector(BCHangHoasState$);
  const [currentDataSource, setCurrentDataSource] = useState([]);

  React.useEffect(() => {
    if (HangHoas) {
      const data = thongKeHangHoa(HangHoas, currentDate);
      setCurrentDataSource(data);
    }
  }, [HangHoas, currentDate]);

  /* #region  set kiểu hiển thị */
  const [activeType, setActiveType] = useState("baoCao");

  const typeShow = {
    baoCao: <HangHoatable currentDataSource={currentDataSource} />,
    bieuDo: (
      <HangHoaBarReport
        highestSanPhamObj={getHighestSanPhamObj(currentDataSource)}
      />
    ),
  };

  /* #endregion */

  const dateFormat = "DD/MM/YYYY";
  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);
  if (TaiKhoan.TenTK != "ADMIN") {
    return (
      <Result
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
            title="Báo cáo hàng hóa"
          />
        </Content>
      </Layout>
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 24px", background: "#F0F2F5" }}
          className="site-layout-sider"
        >
          <div className="site-card-border-less-wrapper">
            <Space direction="vertical">
              <Card
                title="Kiểu hiển thị"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group defaultValue={1}>
                  <Space direction="vertical">
                    <Radio value={1} onClick={() => setActiveType("baoCao")}>
                      Báo cáo
                    </Radio>
                    <Radio value={2} onClick={() => setActiveType("bieuDo")}>
                      Biểu đồ
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>

              <Card
                title="Thời gian áp dụng"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <RangePicker
                  defaultValue={today}
                  onChange={(e) =>
                    e ? setCurrentDate(e) : setCurrentDate(today)
                  }
                  format={dateFormat}
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

export const thongKeHangHoa = (HangHoas, currentDate) => {
  //  sample: HangHoas
  // { MA002: {
  //   TenSP: 'Boots cổ cao da lộn (đỏ) - 39',
  //   Nhap: [ {"Ngay":"2021-11-26T07:24:13.025Z","SoLuong":2,"ThanhTien":36667}, {"Ngay":"2021-11-26T16:16:30.515Z","SoLuong":2,"ThanhTien":36000} ],
  //   Xuat: [ {"Ngay":"2021-11-26T15:45:21.645Z","SoLuong":1,"ThanhTien":400000} ]
  // }, }
  const thongKe = {};

  Object.entries(HangHoas).forEach(([key, value]) =>
    //  moment(key).isBetween(currentDate[0], currentDate[1].endOf('day'))
    {
      if (!thongKe[key]) {
        thongKe[key] = {
          TenSP: value.TenSP,
          //Tồn đầu = Nhập - Xuất (ngày < "Ngày từ")
          SLDau: 0,
          GTDau: 0,
          //Nhập
          SLNhap: 0,
          GTNhap: 0,
          //Xuất
          SLXuat: 0,
          GTXuat: 0,
          //Tồn cuối
          SLCuoi: 0,
          GTCuoi: 0,
        };
      }

      //Tính Nhập và Nhập của Tồn đầu
      value["Nhap"].forEach((Nhap) => {
        //Tính Nhập
        if (
          moment(Nhap.Ngay).isBetween(
            currentDate[0],
            currentDate[1].endOf("day")
          )
        ) {
          thongKe[key]["SLNhap"] += Nhap.SoLuong;
          thongKe[key]["GTNhap"] += Nhap.ThanhTien;
        } else {
          //Tính Nhập của Tồn đầu
          if (moment(Nhap.Ngay).isBefore(currentDate[0])) {
            thongKe[key]["SLDau"] += Nhap.SoLuong;
            thongKe[key]["GTDau"] += Nhap.ThanhTien;
          }
        }
      });

      //Tính Xuất và Xuất của Tồn đầu
      value["Xuat"].forEach((Xuat) => {
        //Tính Xuất
        if (
          moment(Xuat.Ngay).isBetween(
            currentDate[0],
            currentDate[1].endOf("day")
          )
        ) {
          thongKe[key]["SLXuat"] += Xuat.SoLuong;
          thongKe[key]["GTXuat"] += Xuat.ThanhTien;
        } else {
          //Tính Xuất của Tồn đầu
          //Tồn đầu hiện tại = Nhập (đã tính ở trên)
          if (moment(Xuat.Ngay).isBefore(currentDate[0])) {
            //Kết quả của Tồn đầu = Nhập - Xuất
            thongKe[key]["SLDau"] -= Xuat.SoLuong;
            thongKe[key]["GTDau"] -= Xuat.ThanhTien;
          }
        }
      });

      thongKe[key]["SLCuoi"] =
        thongKe[key]["SLDau"] + thongKe[key]["SLNhap"] - thongKe[key]["SLXuat"];
      thongKe[key]["GTCuoi"] =
        thongKe[key]["GTDau"] + thongKe[key]["GTNhap"] - thongKe[key]["GTXuat"];
    }
  );
  console.log(thongKe);
  return thongKe;
};

export const getHighestSanPhamObj = (currentDataSource) => {
  const highestSanPhamObj = {};

  Object.values(currentDataSource).forEach((SanPhamValue) => {
    console.log("SanPhamValue", SanPhamValue);
    const TenSP = SanPhamValue.TenSP;
    highestSanPhamObj[TenSP] = {
      SoLuong: SanPhamValue.SLXuat,
      ThanhTien: SanPhamValue.GTXuat,
    };
  });
  console.log(highestSanPhamObj);
  return highestSanPhamObj;
};
