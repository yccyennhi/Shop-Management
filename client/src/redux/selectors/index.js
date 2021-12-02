//#region KhachHang
export const KhachHangsState$ = (state) => state.KhachHangs.data;
export const KhachHangModalState$ = (state) => state.KhachHangModal;
//#endregion

export const KhuyenMaisState$ = (state) => state.KhuyenMais.data;

//#region NhanVien
export const NhanViensState$ = (state) => state.NhanViens.data;
export const NhanVienModalState$ = (state) => state.NhanVienModal;
//#endregion

export const HoaDonsState$ = (state) => state.HoaDons.data;
export const TaoHoaDonModalState$ = (state) => state.TaoHoaDonModal;
export const TaoPhieuTraHangState$ = (state) => state.TaoPhieuTraHangModal;
export const modalState$ = (state) => state.Modal;
export const SanPhamsState$ = (state) => state.SanPhams.data;
export const isloadingSanPhamsState$ = (state) => state.SanPhams.isLoading;
export const isloadingPhieuBaoHanhsState$ = (state) => state.PhieuBaoHanhs.isLoading;
export const TaoSanPhamModalState$ = (state) => state.TaoSanPhamModal;
export const PhieuBaoHanhsState$ = (state) => state.PhieuBaoHanhs.data;
export const PhieuDoiTrasState$ = (state)=>state.PhieuDoiTras.data;

export const CTHDsState$ = (state) => state.CTHDs.data;
export const CTPDTsState$ = (state) => state.CTPDTs.data;
export const TaoPhieuBaoHanhModalState$ = (state) => state.TaoPhieuBaoHanhModal;
export const PhieuHensState$ = (state) => state.PhieuHens.data;
export const isloadingPhieuHensState$ = (state) => state.PhieuHens.isLoading;
export const TaoPhieuHenModalState$ = (state) => state.TaoPhieuHenModal;


//TongQuan
export const TongQuanStatistics$ =(state) => state.TongQuans.statistics;
export const TongQuanRankingByDoanhThu$ = (state) => state.TongQuans.rankingByDoanhThu;
export const TongQuanHighestSanPhamList$ =(state) =>state.TongQuans.highestSanPhamList;

//BaoCao
export const CuoiNgaysState$ = (state) => state.CuoiNgays.data;
export const BCBanHangsState$ = (state) => state.BCBanHangs.data;
export const BCHangHoasState$ = (state) => state.BCHangHoas.data;
export const TaiKhoansState$ = (state)=>state.TaiKhoans.data;

//PhieuNhap
export const PhieuNhapsState$ = (state) => state.PhieuNhaps?.data;
export const isloadingPhieuNhapsState$ = (state) => state.PhieuNhaps?.isLoading;
export const TaoPhieuNhapModalState$ = (state) => state.TaoPhieuNhapModal;
export const ThemPhieuNhapPageState$ = (state) => state.ThemPhieuNhapPage.ID;

