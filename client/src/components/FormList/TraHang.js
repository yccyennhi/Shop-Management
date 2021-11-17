import { Button } from "antd";
import React from "react";
export default function TraHang({trahang}){
    return <Button block style = {{textAlign : "left"}}>{trahang.name}</Button>
}