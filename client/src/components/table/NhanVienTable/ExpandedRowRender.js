import { Button, PageHeader, Tabs, Tag } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showNhanVienModal,
  getTaiKhoans,
  updateNhanVien,
  updateTaiKhoan,
} from "../../../redux/actions";
import { TaiKhoansState$ } from "../../../redux/selectors";
import HoaDonDaBanTab from "./Tabs/HoaDonDaBanTab";
import ThongTinCaNhanTab from "./Tabs/ThongTinCaNhanTab";

const { TabPane } = Tabs;

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaiKhoans.getTaiKhoansRequest());
  }, [dispatch]);

  const TaiKhoans = useSelector(TaiKhoansState$);

  const openNhanVienModal = useCallback(() => {
    setCurrentId(record._id);
    dispatch(showNhanVienModal());
  }, [dispatch]);

  const changeStatus = useCallback(() => {
    const newStatus = !record.TrangThai;
    const data = { ...record, TrangThai: newStatus };
    dispatch(updateNhanVien.updateNhanVienRequest(data));
  }, [record, dispatch]);

  const TaiKhoanValue = TaiKhoans.find((TaiKhoan) =>
    TaiKhoan.MaNV === record._id ? TaiKhoan : null
  );

  const resetPassword = useCallback(() => {
    if (TaiKhoanValue) {
      const data = {
        TenTK: TaiKhoanValue.TenTK,
        MatKhau: TaiKhoanValue.MatKhau,
        newMatKhau: record.MaNV,
        confirmedMatKhau: record.MaNV,
      };

      console.log(data.TenTK);

      dispatch(updateTaiKhoan.updateTaiKhoanRequest(data));
    }
  }, [record, TaiKhoanValue, dispatch]);

  return (
    <>
      <PageHeader
        className="description-header"
        title={record.TenNV}
        subTitle={record.MaNV}
        tags={
          record.TrangThai == true ? (
            <Tag color="green">Đang làm việc</Tag>
          ) : (
            <Tag color="red">Đã nghỉ việc</Tag>
          )
        }
        extra={[
          <Button key="1" type="primary" onClick={openNhanVienModal}>
            Sửa
          </Button>,
          record.TrangThai == true ? (
            <Button key="2" type="default" danger onClick={changeStatus}>
              Nghỉ việc
            </Button>
          ) : (
            <Button key="3" type="default" onClick={changeStatus}>
              Làm lại
            </Button>
          ),
          <Button key="4" type="default" onClick={resetPassword}>
            Đặt lại mật khẩu
          </Button>,
        ]}
      >
        <Tabs type="card" defaultActiveKey="1">
          <TabPane tab="Thông tin cá nhân" key="1">
            <ThongTinCaNhanTab record={record} />
          </TabPane>
          <TabPane tab="Hóa đơn đã bán" key="2">
            <HoaDonDaBanTab idNV={record._id} />
          </TabPane>
        </Tabs>
      </PageHeader>
    </>
  );
}
