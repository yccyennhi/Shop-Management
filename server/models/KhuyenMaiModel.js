import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        MaKM: {
            type: String,
            required: true,
            unique: true,
            
        },
        TenKM: {
            type: String,
            required: true,
        },
        NgayBD: {
            type: Date,
            required: true,
        },
        NgayKT: {
            type: Date,
            required: true
        },
        //Gia tri hoa don toi thieu
        GiaTri: {
            type: Number,
            required: true
        },
        PhanTram: {
            type: Number,
            required: true
        },

        TrangThai: {
            type: Boolean,
            default: false,
        },

        SoLuong: {
            type: Number,
            required:false,
        }
    }, { timestamps: true });

    export const KhuyenMaiModel = mongoose.model("KhuyenMai", schema);