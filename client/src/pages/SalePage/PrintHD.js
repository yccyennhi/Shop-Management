import React, { useRef, useEffect, useState } from "react";
import { Button, Layout } from "antd";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { HoaDonsState$ } from "../../redux/selectors";

export default function PrintHD({st}) {
  const componentRef = useRef(null);
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
          <ReactToPrint
            trigger={() => <Button style = {{float: 'right', marginRight: 100}}>Xuất file pdf!{st}</Button>}
            content={() => componentRef.current}
          />
           <ComponentToPrint ref={componentRef} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
// import render from "react-dom";
// import { useReactToPrint } from "react-to-print";
// import ComponentToPrint from './ComponentToPrint';

// const PrintHD =() => {
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   return (
//     <div>
//       <ComponentToPrint ref={componentRef} />
//       <button onClick={() => handlePrint()}>Print this out!</button>
//     </div>
//   );
// }
// render(<PrintHD/>, document.querySelector('#PrintHD'))
