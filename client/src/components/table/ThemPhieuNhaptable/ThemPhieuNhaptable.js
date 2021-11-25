import React, { useContext, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExportTableButton, Table } from "ant-table-extensions";
import {
  Input,
  Row,
  Button,
  Dropdown,
  message,
  Menu,
  Image,
  Space,
  Typography,
  Avatar,
  Popconfirm,
  Form,
  Modal,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  PhieuNhapsState$,
  isloadingPhieuNhapsState$,
  SanPhamsState$,
} from "../../../redux/selectors";
import * as actions from "../../../redux/actions";
import {
  messageError,
  messageSuccess,
  messageLoadingSuccess,
} from "../../message";
const { Search } = Input;

function ThemPhieuNhaptable({ MaSP, data, setData }) {
  const SP = useSelector(SanPhamsState$);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [Editing, setEditing] = useState(false);
  const [dataSource, setDataSource] = useState(data);
  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);

  React.useEffect(() => {
    let SanPham = SP.find(function (e) {
      return e.MaSP == MaSP;
    });
    if (dataSource.length != 0) {
      let IDData = dataSource.find(function (e) {
        return e.MaSP == MaSP;
      });
      if (IDData == undefined) {
        if (SanPham != undefined) {
          const newData = {
            MaSP: SanPham.MaSP,
            TenSP: SanPham.TenSP,
            MauSac: SanPham.MauSac,
            Size: SanPham.Size,
            LoaiHang: SanPham.LoaiHang,
            GiamGia: 0,
            SoLuong: 0,
            GiaNhap: 0,
            ThanhTien: 0,
          };
          setDataSource((pre) => {
            return [...pre, newData];
          });
          messageSuccess("Thêm sản phẩm vào danh sách nhập thành công!");

          setData(dataSource);
          console.log("data", dataSource);
        }
      } else {
        messageError("Sản phẩm đã tồn tại trong danh sách nhập kho!");
      }
    } else {
      if (SanPham != undefined) {
        const newData = {
          MaSP: SanPham.MaSP,
          TenSP: SanPham.TenSP,
          MauSac: SanPham.MauSac,
          Size: SanPham.Size,
          LoaiHang: SanPham.LoaiHang,
          SoLuong: 0,
          GiamGia: 0,
          GiaNhap: 0,
          ThanhTien: 0,
        };
        setDataSource((pre) => {
          return [...pre, newData];
        });
        setData(dataSource);
        console.log("data", dataSource);
        messageSuccess("Thêm sản phẩm vào danh sách nhập thành công!");
      }
    }
  }, [MaSP]);
  const onEdit = (record) => {
    setIsEditing(true);
    setEditing({ ...record });
  };
  const resetEdit = () => {
    setIsEditing(false);
    setEditing(null);
  };
  const columns = [
    {
      key: "MaSP",
      title: "Mã sản phẩm",
      dataIndex: "MaSP",
    },
    {
      key: "TenSP",
      title: "Tên sản phẩm",
      dataIndex: "TenSP",
    },
    {
      key: "MauSac",
      title: "Màu sắc",
      dataIndex: "MauSac",
    },
    {
      key: "Size",
      title: "Size",
      dataIndex: "Size",
    },
    {
      key: "LoaiHang",
      title: "Loại hàng",
      dataIndex: "LoaiHang",
    },
    {
      key: "SoLuong",
      title: "Số lượng",
      dataIndex: "SoLuong",
    },
    {
      key: "GiaNhap",
      title: "Giá nhập",
      dataIndex: "GiaNhap",
    },
    {
      key: "GiamGia",
      title: "Giảm giá",
      dataIndex: "GiamGia",
    },
    {
      key: "ThanhTien",
      title: "Thành tiền",
      dataIndex: "ThanhTien",
    },
    {
      key: "Action",
      title: "Chỉnh sửa",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEdit(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                Modal.confirm({
                  okType: "danger",
                  title: "Xác nhận xóa sản phẩm khỏi danh sách?",
                  onOk: () => {
                    let listSP = dataSource.filter(
                      (e) => e.MaSP != record.MaSP
                    );
                    setDataSource(listSP);
                    setData(dataSource);
                  },
                });
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        scroll={{ x: 1000, y: 500 }}
        columns={columns}
        dataSource={dataSource}
      ></Table>
      <Modal
        title="Chỉnh sửa sản phẩm nhập kho"
        visible={isEditing}
        onCancel={() => {
          resetEdit();
        }}
        onOk={() => {
          if (
            Editing.SoLuong == "" ||
            Editing.GiaNhap == "" ||
            Editing.GiamGia == ""
          ) {
            messageError("Vui lòng nhập đầy đủ thông tin!");
          } else {
            let list = dataSource.map((data) => {
              if (data.MaSP === Editing.MaSP) {
                messageSuccess("Sửa thông tin thành công!")
                return Editing;
              } else {
                return data;
              }
            });
            setDataSource(list);
            resetEdit();
          }
        }}
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
        >
          <Form.Item label="Số lượng" required>
            <Input
              placeholder="Nhập số lượng sản phẩm muốn nhập"
              value={Editing?.SoLuong}
              onChange={(e) => {
                setEditing((pre) => {
                  return { ...pre, SoLuong: e.target.value };
                });
                if (
                  Editing?.SoLuong != null &&
                  Editing?.GiaNhap != null &&
                  Editing?.GiamGia != null
                ) {
                  const sum = e * (Editing?.GiaNhap - Editing?.GiamGia);

                  setEditing((pre) => {
                    return { ...pre, ThanhTien: sum };
                  });
                }
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Giá nhập" required>
            <Input
              placeholder="Nhập giá nhập"
              value={Editing?.GiaNhap}
              onChange={(e) => {
                setEditing((pre) => {
                  return { ...pre, GiaNhap: e.target.value };
                });
                if (
                  Editing?.SoLuong != null &&
                  Editing?.GiaNhap != null &&
                  Editing?.GiamGia != null
                ) {
                  const sum = Editing?.SoLuong * (e - Editing?.GiamGia);

                  setEditing((pre) => {
                    return { ...pre, ThanhTien: sum };
                  });
                }
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Giảm giá" required>
            <Input
              placeholder="Nhập số tiền được giảm"
              value={Editing?.GiamGia}
              onChange={(e) => {
                setEditing((pre) => {
                  return { ...pre, GiamGia: e.target.value };
                });
                if (
                  Editing?.SoLuong != null &&
                  Editing?.GiaNhap != null &&
                  Editing?.GiamGia != null
                ) {
                  const sum =
                    Editing?.SoLuong * (Editing?.GiaNhap - e.target.value);

                  setEditing((pre) => {
                    return { ...pre, ThanhTien: sum };
                  });
                }
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Thành tiền">
            <Input value={Editing?.ThanhTien} disabled="true"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ThemPhieuNhaptable;
