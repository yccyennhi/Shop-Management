import { Button, Descriptions, PageHeader, Tag } from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNhanVienModal, updateNhanVien } from "../../../redux/actions";
import { NhanViensState$ } from "../../../redux/selectors";

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();

  //#region Data
  const NhanViens = useSelector(NhanViensState$);

  const [data, setData] = useState({
    MaNV: "",
    TenNV: "",
    NgaySinh: new Date(),
    SDT: "",
    Email: "",
    DiaChi: "",
    NgayVaoLam: new Date(),
    TrangThai: true,
  });

  const NhanVienValue = NhanViens.find((NhanVien) =>
    NhanVien._id === record._id ? NhanVien : null
  );

  useEffect(() => {
    if (NhanVienValue) setData(NhanVienValue);
  }, [NhanVienValue]);
  //#endregion

  //#region handle
  const openNhanVienModal = useCallback(() => {
    setCurrentId(record._id);
    dispatch(showNhanVienModal());
  }, [dispatch]);

  const changeStatus = useCallback(() => {
    const newStatus = !data.TrangThai;
    setData({ ...data, TrangThai: newStatus });
    dispatch(updateNhanVien.updateNhanVienRequest(data));
  }, [data, dispatch]);
  //#endregion

  return (
    <>
      <PageHeader
        className="description-header"
        title={record.TenNV}
        subTitle={record.MaNV}
        tags={
          record.TrangThai == true ? (
            <Tag color="blue">Đang làm việc</Tag>
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
        ]}
      >
        <Descriptions size="small" column={3}>
          <DescriptionsItem label="Ngày sinh">
            {moment(record.NgaySinh).format("DD/MM/YYYY")}
          </DescriptionsItem>
          <DescriptionsItem label="Số điện thoại">
            {record.SDT}
          </DescriptionsItem>
          <DescriptionsItem label="Email">{record.Email}</DescriptionsItem>
          <DescriptionsItem label="Địa chỉ">{record.DiaChi}</DescriptionsItem>
          <DescriptionsItem label="Ngày vào làm">
            {moment(record.NgayVaoLam).format("DD/MM/YYYY")}
          </DescriptionsItem>
        </Descriptions>
      </PageHeader>
    </>
  );
}
