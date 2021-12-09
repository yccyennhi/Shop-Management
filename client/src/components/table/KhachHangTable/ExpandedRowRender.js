import { Button, PageHeader, Tabs, Tag } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showKhachHangModal, updateKhachHang } from "../../../redux/actions";
import HoaDonDaMuaTab from "./Tabs/HoaDonDaMuaTab";
import ThongTinCaNhanTab from "./Tabs/ThongTinCaNhanTab";

const { TabPane } = Tabs;

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();

  const openKhachHangModal = useCallback(() => {
    setCurrentId(record._id);
    dispatch(showKhachHangModal());
  }, [dispatch]);

  const changeStatus = useCallback(() => {
    const newStatus = !record.TrangThai;
    const data = { ...record, TrangThai: newStatus };
    dispatch(updateKhachHang.updateKhachHangRequest(data));
  }, [record, dispatch]);

  return (
    <>
      <PageHeader
        className="description-header"
        title={record.TenKH}
        subTitle={record.MaKH}
        tags={
          record.TrangThai == true ? (
            <Tag color="green">Còn hoạt động</Tag>
          ) : (
            <Tag color="red">Ngừng hoạt động</Tag>
          )
        }
        extra={[
          <Button key="1" type="primary" onClick={openKhachHangModal}>
            Sửa
          </Button>,
          record.TrangThai == true ? (
            <Button key="2" type="default" danger onClick={changeStatus}>
              Ngừng hoạt động
            </Button>
          ) : (
            <Button key="3" type="default" onClick={changeStatus}>
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
