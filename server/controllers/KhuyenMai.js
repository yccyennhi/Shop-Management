import { KhuyenMaiModel } from "../models/KhuyenMaiModel";

export const getKhuyenMai = async (req, res) => {
    try {
      const KhuyenMais = await KhuyenMaiModel.find();
      console.log("KhuyenMais", KhuyenMais);
      res.status(200).json(KhuyenMais);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  
  export const createKhuyenMai= async (req, res) => {
    try {
      const newKhuyenMai = req.body;
  
      const KhuyenMai = new SanPhamModel(newKhuyenMai);
      await KhuyenMai.save();
  
      res.status(200).json(KhuyenMai);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  
  export const updateKhuyenMai = async (req, res) => {
    try {
      const updateKhuyenMai = req.body;
      const KhuyenMai = await SanPhamModel.findOneAndUpdate(
        { _id: updateKhuyenMai._id },
        updateKhuyenMai,
        { new: true }
      );
      res.status(200).json(KhuyenMai);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  