import { SanPhamModel } from "../models/SanPhamModel.js";
export const getSanPhams = async (req, res) => {
  try {
    const SanPhams = await SanPhamModel.find();
   // console.log("SanPhams", SanPhams);
    res.status(200).json(SanPhams);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createSanPham = async (req, res) => {
  try {
    const newSanPham = req.body;
    const SanPham = new SanPhamModel(newSanPham);
    await SanPham.save();
    res.status(200).json(SanPham);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const updateSanPham = async (req, res) => {
  try {
    const updateSanPham = req.body;

    const SanPham = await SanPhamModel.findOneAndUpdate(
      { _id: updateSanPham._id },
      updateSanPham,
      { new: true }
    );
    res.status(200).json(SanPham); 
  } catch (err) {
    res.status(404).json({ error: err });
  }
};


export const deleteSanPham = async (req, res, next) => {
  try {
    const {id} = req.params;
    const SanPham = await SanPhamModel.findByIdAndRemove(id);
    res.status(200).json(SanPham);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
