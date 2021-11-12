import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        MaPDT: {
            type: String,
            required: true,
        },
        MaSP: {
            type: String,
            required: true,
        },
        MaHD: {
            type: String,
            required: true,
        },
        SoLuong: {
            type: Number,
            required: true,
        },
        ThanhTien: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);
export const CTPDTModel = mongoose.model("CTPDT", schema);