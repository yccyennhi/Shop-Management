import React, { useRef, useEffect, useState } from "react";
import { Button, Layout } from "antd";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { useHistory } from "react-router-dom";
export default function PrintHD({ st }) {
  const componentRef = useRef(null);
  const history = useHistory();
  return (
    <Layout>
      <Layout
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100vh",
          width: "200vh",
          bottom: 0,
        }}
      >
        <Layout.Content>
          <Button
            onClick={() => history.push("/Sales")}
            style={{ float: "right", marginRight: 100 }}
            type="primary" danger
          >
            Hủy
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button style={{ float: "right" }} type="primary">
                Xuất file pdf!{st}
              </Button>
            )}
            onAfterPrint ={() =>  history.push("/Sales")}
            //pageStyle = {'A4'}
            content={() => componentRef.current}
          />
          <ComponentToPrint ref={componentRef} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
