import { Descriptions } from "antd";
import moment from "moment";

export default function ThongTinCaNhanTab({ record }) {
  return (
    <div>
      <Descriptions size="small" column={3}>
          <Descriptions.Item label="Ngày sinh">
            {moment(record.NgaySinh).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {record.SDT}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{record.Email}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{record.DiaChi}</Descriptions.Item>
          <Descriptions.Item label="Ngày vào làm">
            {moment(record.NgayVaoLam).format("DD/MM/YYYY")}
          </Descriptions.Item>
        </Descriptions>
    </div>
  );
}
