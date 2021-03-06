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
      console.log("1 l???n");
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
          messageSuccess("Th??m s???n ph???m v??o danh s??ch nh???p th??nh c??ng!");
        } else {
          messageError("S???n ph???m ???? t???n t???i trong danh s??ch nh???p kho!");
        }
      }
    } else {
      if (dataSource.length != 0) {
        messageError("S???n ph???m kh??ng t???n t???i, vui l??ng th??m m???i");
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
      title: "M?? s???n ph???m",
      dataIndex: "MaSP",
    },
    {
      key: "TenSP",
      title: "T??n s???n ph???m",
      dataIndex: "TenSP",
    },
    {
      key: "MauSac",
      title: "M??u s???c",
      dataIndex: "MauSac",
    },
    {
      key: "Size",
      title: "Size",
      dataIndex: "Size",
    },
    {
      key: "LoaiHang",
      title: "Lo???i h??ng",
      dataIndex: "LoaiHang",
    },
    {
      key: "SoLuong",
      title: "S??? l?????ng",
      dataIndex: "SoLuong",
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "GiaNhap",
      title: "Gi?? nh???p",
      dataIndex: "GiaNhap",
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "GiamGia",
      title: "Gi???m gi??",
      dataIndex: "GiamGia",
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "ThanhTien",
      title: "Th??nh ti???n",
      dataIndex: "ThanhTien",
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "Action",
      title: "Ch???nh s???a",
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
                  title: "X??c nh???n x??a s???n ph???m kh???i danh s??ch?",
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
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        searchableProps={{
          inputProps: {
            placeholder: "Nh???p n???i dung c???n t??m",
            prefix: <SearchOutlined />,
            width: 200,
          },
        }}
        // rowKey="MaSP"
      ></Table>
      <Modal
        title="Ch???nh s???a s???n ph???m nh???p kho"
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
            messageError("Vui l??ng nh???p ?????y ????? th??ng tin!");
          } else {
            let list = dataSource.map((data) => {
              if (data.MaSP === Editing.MaSP) {
                messageSuccess("S???a th??ng tin th??nh c??ng!");
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
          <Form.Item label="S??? l?????ng" required>
            <InputNumber
              style={{ width: 270 }}
              placeholder="Nh???p s??? l?????ng s???n ph???m mu???n nh???p"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
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
          <Form.Item label="Gi?? nh???p" required>
            <InputNumber
              style={{ width: 270 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              placeholder="Nh???p gi?? nh???p"
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
          <Form.Item label="Gi???m gi??" required>
            <InputNumber
              style={{ width: 270 }}
              placeholder="Nh???p s??? ti???n ???????c gi???m"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
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
          <Form.Item label="Th??nh ti???n">
            <InputNumber
              style={{ width: 270 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
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
