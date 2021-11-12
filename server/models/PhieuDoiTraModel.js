import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        MaPDT: {
            type: String,
            required: true,
        },
        MaHD: {
            type: String,
            required: true,
        },
        MaNV: {
            type: String,
            required: true,
        },
        ThoiGian: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);
export const PhieuDoiTraModel = mongoose.model("PhieuDoiTra", schema);
