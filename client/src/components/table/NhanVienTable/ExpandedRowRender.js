import { Button, Modal, PageHeader, Tabs, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
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

  const status = record.TrangThai ? "Đang làm việc" : "Đã nghỉ việc";
  const changedStatus = record.TrangThai ? "Đã nghỉ việc" : "Đang làm việc";

  useEffect(() => {
    dispatch(getTaiKhoans.getTaiKhoansRequest());
  }, [dispatch]);

  const TaiKhoans = useSelector(TaiKhoansState$);

  const openNhanVienModal = useCallback(() => {
    setCurrentId(record._id);
    dispatch(showNhanVienModal());
  }, [dispatch]);

  //#region Modal confirm
  const [isShow, setIsShow] = useState(false);

  function confirmChangeStatus() {
    setIsShow(true);
    Modal.confirm({
      visible: isShow,
      title: "Cảnh báo",
      content: `Xác nhận chuyển trạng thái hoạt động của khách hàng về "${changedStatus}"?`,
      onOk() {
        changeStatus();
      },
    });
  }

  function confirmResetPassword() {
    setIsShow(true);
    Modal.confirm({
      visible: isShow,
      title: "Cảnh báo",
      content: "Xác nhận cài đặt mật khẩu về lại mặc định?",
      onOk() {
        resetPassword();
      },
    });
  }
  //#endregion

  const changeStatus = useCallback(() => {
    const newStatus = !record.TrangThai;
    const data = { ...record, TrangThai: newStatus };
    dispatch(updateNhanVien.updateNhanVienRequest(data));
    setIsShow(false);
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
      setIsShow(false);
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
            <Tag color="green">{status}</Tag>
          ) : (
            <Tag color="red">{status}</Tag>
          )
        }
        extra={[
          <Button key="1" type="primary" onClick={openNhanVienModal}>
            Sửa
          </Button>,
          record.TrangThai == true ? (
            <Button key="2" type="default" danger onClick={confirmChangeStatus}>
              Nghỉ việc
            </Button>
          ) : (
            <Button key="3" type="default" onClick={confirmChangeStatus}>
              Làm lại
            </Button>
          ),
          <Button key="4" type="default" onClick={confirmResetPassword}>
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
