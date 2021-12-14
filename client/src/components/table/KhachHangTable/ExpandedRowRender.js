import { Button, Modal, PageHeader, Tabs, Tag } from "antd";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { showKhachHangModal, updateKhachHang } from "../../../redux/actions";
import HoaDonDaMuaTab from "./Tabs/HoaDonDaMuaTab";
import ThongTinCaNhanTab from "./Tabs/ThongTinCaNhanTab";

const { TabPane } = Tabs;

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();

  const status = record.TrangThai ? "Còn hoạt động" : "Ngừng hoạt động";
  const changedStatus = record.TrangThai ? "Ngừng hoạt động" : "Còn hoạt động";

  //#region Modal create/update
  const openKhachHangModal = useCallback(() => {
    setCurrentId(record._id);
    dispatch(showKhachHangModal());
  }, [dispatch]);
  //#endregion

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
  //#endregion

  //#region handle function
  const changeStatus = useCallback(() => {
    const newStatus = !record.TrangThai;
    const data = { ...record, TrangThai: newStatus };
    dispatch(updateKhachHang.updateKhachHangRequest(data));
    setIsShow(false);
  }, [record, dispatch]);
  //#endregion

  return (
    <>
      <PageHeader
        className="description-header"
        title={record.TenKH}
        subTitle={record.MaKH}
        tags={
          record.TrangThai == true ? (
            <Tag color="green">{status}</Tag>
          ) : (
            <Tag color="red">{status}</Tag>
          )
        }
        extra={[
          <Button key="1" type="primary" onClick={openKhachHangModal}>
            Sửa
          </Button>,
          record.TrangThai == true ? (
            <Button key="2" type="default" danger onClick={confirmChangeStatus}>
              Ngừng hoạt động
            </Button>
          ) : (
            <Button key="3" type="default" onClick={confirmChangeStatus}>
              Hoạt động lại
            </Button>
          ),
        ]}
      >
        <Tabs type="card" defaultActiveKey="1">
          <TabPane tab="Thông tin cá nhân" key="1">
            <ThongTinCaNhanTab record={record} />
          </TabPane>
          <TabPane tab="Hóa đơn đã mua" key="2">
            <HoaDonDaMuaTab idKH={record._id} />
          </TabPane>
        </Tabs>
      </PageHeader>
    </>
  );
}
