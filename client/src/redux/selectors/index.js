//#region KhachHang
export const isLoadingKhachHangsState$ = (state) => state.KhachHangs.isLoading;
export const KhachHangsState$ = (state) => state.KhachHangs.data;
export const KhachHangModalState$ = (state) => state.KhachHangModal;
//#endregion

//#region TaiKhoan
export const TaiKhoansState$ = (state) => state.TaiKhoans.data;
export const TaiKhoanModalState$ = (state) => state.TaiKhoanModal;
//#endregion

export const KhuyenMaisState$ = (state) => state.KhuyenMais.data;
//export const isloadingKhuyenMaisState$ = (state) => state.KhuyenMais.isLoading;

//#region NhanVien
export const isLoadingNhanViensState$ = (state) => state.NhanViens.isLoading;
export const NhanViensState$ = (state) => state.NhanViens.data;
export const NhanVienModalState$ = (state) => state.NhanVienModal;
//#endregion

export const HoaDonsState$ = (state) => state.HoaDons.data;
export const ThanhToanTichDiemModalState$ = (state) =>
  state.ThanhToanTichDiemModal;
export const isloadingHoaDonsState$ = (state) => state.HoaDons.isLoading;
export const isloadingPhieuDoiTrasState$ = (state) =>
  state.PhieuDoiTras.isLoading;
export const TaoPhieuTraHangState$ = (state) => state.TaoPhieuTraHangModal;
export const modalState$ = (state) => state.Modal;
export const PhieuDoiTrasState$ = (state) => state.PhieuDoiTras.data;

//SanPham
export const SanPhamsState$ = (state) => state.SanPhams.data;
export const isloadingSanPhamsState$ = (state) => state.SanPhams.isLoading;
export const TaoSanPhamModalState$ = (state) => state.TaoSanPhamModal;
export const ArrHangHoaNhapState$ = (state) => state.ArrHangHoaNhap;

//PhieuBaoHanh
export const TaoPhieuBaoHanhModalState$ = (state) => state.TaoPhieuBaoHanhModal;
export const PhieuBaoHanhBanHangModalState$ = (state) =>
  state.PhieuBaoHanhBanHangModal;
export const PhieuBaoHanhsState$ = (state) => state.PhieuBaoHanhs.data;
export const isloadingPhieuBaoHanhsState$ = (state) =>
  state.PhieuBaoHanhs.isLoading;

//PhieuHen
export const PhieuHensState$ = (state) => state.PhieuHens.data;
export const isloadingPhieuHensState$ = (state) => state.PhieuHens.isLoading;
export const TaoPhieuHenModalState$ = (state) => state.TaoPhieuHenModal;
export const PhieuHenBanHangModalState$ = (state) =>
  state.PhieuHenBanHangModal.isShow;

//TongQuan
export const TongQuanStatistics$ = (state) => state.TongQuans.statistics;
export const TongQuanRankingByDoanhThu$ = (state) =>
  state.TongQuans.rankingByDoanhThu;
export const TongQuanHighestSanPhamList$ = (state) =>
  state.TongQuans.highestSanPhamList;
export const isloadingTongQuansState$ = (state) => state.TongQuans.isLoading;

//BaoCao
export const CuoiNgaysState$ = (state) => state.CuoiNgays.data;
export const BCBanHangsState$ = (state) => state.BCBanHangs.data;
export const BCHangHoasState$ = (state) => state.BCHangHoas.data;

//PhieuNhap
export const PhieuNhapsState$ = (state) => state.PhieuNhaps?.data;
export const isloadingPhieuNhapsState$ = (state) => state.PhieuNhaps?.isLoading;
export const TaoPhieuNhapModalState$ = (state) => state.TaoPhieuNhapModal;
export const ThemPhieuNhapPageState$ = (state) => state.ThemPhieuNhapPage.ID;
