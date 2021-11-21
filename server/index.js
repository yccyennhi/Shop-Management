import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import posts from "./routers/posts.js";
import KhachHangs from "./routers/KhachHangs.js";
import NhanViens from "./routers/NhanViens.js";
import SanPhams from "./routers/SanPhams.js";
import PhieuBaoHanhs from "./routers/PhieuBaoHanhs.js";
import PhieuHens from "./routers/PhieuHens.js";
import TaiKhoans from "./routers/TaiKhoans.js";
import HoaDons from "./routers/HoaDons.js"
import CTHDs from "./routers/CTHDs.js"
import PhieuDoiTras from "./routers/PhieuDoiTras.js";
import CTPDTs from "./routers/CTPDTs.js";
import KhuyenMais from "./routers/KhuyenMais.js";
import QLSanPhams from "./routers/QLSanPhams.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;
const URI =
  "mongodb+srv://admin:I1D8obNF5Fr4cw46@cluster0.mbt6i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use("/posts", posts);
app.use("/KhachHangs", KhachHangs);
app.use("/NhanViens", NhanViens);
app.use("/SanPhams", SanPhams);
app.use("/TaiKhoans", TaiKhoans);
app.use("/KhuyenMais", KhuyenMais);
app.use("/PhieuHens", PhieuHens);
app.use("/PhieuBaoHanhs", PhieuBaoHanhs);
app.use("/HoaDons", HoaDons);
app.use("/PhieuDoiTras", PhieuDoiTras);
app.use("/QLSanPhams", QLSanPhams);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
