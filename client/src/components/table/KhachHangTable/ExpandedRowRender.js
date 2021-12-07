import { Button, Descriptions, PageHeader, Tag } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showKhachHangModal, updateKhachHang } from "../../../redux/actions";
import { KhachHangsState$ } from "../../../redux/selectors";

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();

  // //#region Data
  // const KhachHangs = useSelector(KhachHangsState$);

  // const [data, setData] = useState({
  //   MaKH: "",
  //   TenKH: "",
  //   NgaySinh: "",
  //   SDT: "",
  //   Email: "",
  //   DiaChi: "",
  //   DiemTichLuy: 0,
  //   TrangThai: true,
  // });

  // const KhachHangValue = KhachHangs.find((KhachHang) =>
  //   KhachHang._id === record._id ? KhachHang : null
  // );

  // useEffect(() => {
  //   if (KhachHangValue) setData(KhachHangValue);
  // }, [KhachHangValue]);
  // //#endregion
  const openKhachHangModal = useCallback(() => {
    setCurrentId(record._id);
    dispatch(showKhachHangModal());
  }, [dispatch]);

  const changeStatus = useCallback(() => {
    const newStatus = !record.TrangThai;
    const data = {...record, TrangThai: newStatus}
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
            <Tag color="blue">Còn hoạt động</Tag>
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
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Ngày sinh">
            {moment(record.NgaySinh).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {record.SDT}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{record.Email}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{record.DiaChi}</Descriptions.Item>
          <Descriptions.Item label="Điểm tích lũy">
            {record.DiemTichLuy}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
}
