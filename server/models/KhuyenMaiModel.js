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
       MaSp: {
           type: mongoose.Schema.Types.ObjectId,
            ref:"sanphams",
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
    }, { timestamps: true });

    export const KhuyenMaiModel = mongoose.model("KhuyenMai", schema);