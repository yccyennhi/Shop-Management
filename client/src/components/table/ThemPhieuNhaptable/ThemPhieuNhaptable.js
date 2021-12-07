import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "ant-table-extensions";
import { Input, Form, Modal, InputNumber } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  PhieuNhapsState$,
  SanPhamsState$,
  ThemPhieuNhapPageState$,
} from "../../../redux/selectors";
import * as actions from "../../../redux/actions";
import { messageError, messageSuccess } from "../../message";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

function ThemPhieuNhaptable({ MaSP, setData }) {
  const SP = useSelector(SanPhamsState$);
  const PN = useSelector(PhieuNhapsState$);
  const testID = useSelector(ThemPhieuNhapPageState$);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [Editing, setEditing] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const id = useSelector(ThemPhieuNhapPageState$);

  React.useEffect(() => {
    dispatch(actions.getPhieuNhaps.getPhieuNhapsRequest());
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);

  const PhieuNhapValue = useSelector((state) =>
    state.PhieuNhaps.data.find((PhieuNhap) =>
      PhieuNhap.MaPN === id.payload ? PhieuNhap : null
    )
  );
  React.useEffect(() => {
    console.log("datasource", dataSource);
    setData(dataSource);
  }, [dataSource]);

  React.useEffect(() => {
    if (PhieuNhapValue != undefined) {
      let arr = [];
      for (let i = 0; i < PhieuNhapValue.MaSP.length; i++) {
        let newData = {
          MaSP: PhieuNhapValue?.MaSP[i],
          TenSP: PhieuNhapValue?.TenSP[i],
          MauSac: PhieuNhapValue?.MauSac[i],
          Size: PhieuNhapValue?.Size[i],
          LoaiHang: PhieuNhapValue?.LoaiHang[i],
          GiamGia: PhieuNhapValue?.GiamGia[i],
          SoLuong: PhieuNhapValue?.SoLuong[i],
          GiaNhap: PhieuNhapValue?.GiaNhap[i],
          ThanhTien: PhieuNhapValue?.ThanhTien[i],
        };
        arr.push(newData);
      }
      console.log("1 lần");
      setDataSource(arr);
    }
  }, [dispatch]);

  React.useEffect(() => {
    let SanPham = SP.find(function (e) {
      return e.MaSP == MaSP;
    });
    if (SanPham != undefined) {
      if (dataSource != null) {
        let IDData = dataSource.find(function (e) {
          return e.MaSP == MaSP;
        });
        console.log(IDData);
        if (IDData == undefined) {
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
          setDataSource([...dataSource, newData]);
          setData(dataSource);
          messageSuccess("Thêm sản phẩm vào danh sách nhập thành công!");
        } else {
          messageError("Sản phẩm đã tồn tại trong danh sách nhập kho!");
        }
      }
    } else {
      if (dataSource.length != 0) {
        messageError("Sản phẩm không tồn tại, vui lòng thêm mới");
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
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "GiaNhap",
      title: "Giá nhập",
      dataIndex: "GiaNhap",
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "GiamGia",
      title: "Giảm giá",
      dataIndex: "GiamGia",
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "ThanhTien",
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
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
        scroll={{ x: 1200, y: 500 }}
        columns={columns}
        dataSource={dataSource}
        searchableProps={{
          inputProps: {
            placeholder: "Nhập nội dung cần tìm",
            prefix: <SearchOutlined />,
            width: 200,
          },
        }}
        // rowKey="MaSP"
      ></Table>
      <Modal
        title="Chỉnh sửa sản phẩm nhập kho"
        visible={isEditing}
        onCancel={() => {
          resetEdit();
        }}
        onOk={() => {
          if (
            Editing.SoLuong <= 0 ||
            Editing.GiaNhap < 0 ||
            Editing.GiamGia < 0
          ) {
            messageError("Vui lòng nhập đầy đủ thông tin!");
          } else {
            let list = dataSource.map((data) => {
              if (data.MaSP === Editing.MaSP) {
                messageSuccess("Sửa thông tin thành công!");
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
            span: 7,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
        >
          <Form.Item label="Số lượng" required>
            <InputNumber
              style={{ width: 270 }}
              placeholder="Nhập số lượng sản phẩm muốn nhập"
              value={Editing?.SoLuong}
              onChange={(e) => {
                setEditing((pre) => {
                  return { ...pre, SoLuong: e };
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
            ></InputNumber>
          </Form.Item>
          <Form.Item label="Giá nhập" required>
            <InputNumber
              style={{ width: 270 }}
              placeholder="Nhập giá nhập"
              value={Editing?.GiaNhap}
              onChange={(e) => {
                setEditing((pre) => {
                  return { ...pre, GiaNhap: e };
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
            ></InputNumber>
          </Form.Item>
          <Form.Item label="Giảm giá" required>
            <InputNumber
              style={{ width: 270 }}
              placeholder="Nhập số tiền được giảm"
              value={Editing?.GiamGia}
              onChange={(e) => {
                setEditing((pre) => {
                  return { ...pre, GiamGia: e };
                });
                if (
                  Editing?.SoLuong != null &&
                  Editing?.GiaNhap != null &&
                  Editing?.GiamGia != null
                ) {
                  const sum = Editing?.SoLuong * (Editing?.GiaNhap - e);

                  setEditing((pre) => {
                    return { ...pre, ThanhTien: sum };
                  });
                }
              }}
            ></InputNumber>
          </Form.Item>
          <Form.Item label="Thành tiền">
            <InputNumber
              style={{ width: 270 }}
              value={Editing?.ThanhTien}
              disabled="true"
            ></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ThemPhieuNhaptable;
