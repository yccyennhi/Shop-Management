import React from "react";
import moment from 'moment';
import {  PageHeader, Row, Space, Typography, DatePicker} from "antd";
import CuoiNgaytable from '../../components/table/BaoCaoTable/CuoiNgaytable';


const {Title } = Typography;


export default function BCCuoiNgayPage() {

  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Báo cáo cuối ngày" /> 
        <div>
          <Row justify="end">
            <Space direction='horizontal' align='baseline' size='large'>
             <Title level={5}>Ngày</Title>

           <DatePicker defaultValue={moment()}  format='DD/MM/YYYY' />
            </Space>
          </Row>
        </div>
        <CuoiNgaytable/>
      </div>
    </>
  );
}
