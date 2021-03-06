export const BACKEND_URL = "https://nlmt-shop-management.herokuapp.com";
export const FRONTEND_URL = "https://nlmt-shop-management.netlify.app";

export const INIT_STATE = {
  //#region KhachHang
  KhachHangs: {
    isLoading: false,
    data: [],
  },
  KhachHangModal: {
    isShow: false,
  },
  //#endregion

  //#region NhanVien
  NhanViens: {
    isLoading: false,
    data: [],
  },
  NhanVienModal: {
    isShow: false,
  },
  //#endregion

  //#region TaiKhoan
  TaiKhoans: {
    isLoading: false,
    data: [],
  },
  TaiKhoanModal: {
    isShow: false,
  },
  //#endregion

  SanPhams: {
    isLoading: false,
    data: [],
  },
  KhuyenMais: {
    isLoading: false,
    data: [],
  },
  PhieuBaoHanhs: {
    isLoading: false,
    data: [],
  },
  PhieuHens: {
    isLoading: false,
    data: [],
  },
  Modal: {
    isShow: false,
  },
  TaoSanPhamModal: {
    isShow: false,
  },
  HoaDons: {
    isLoading: false,
    data: [],
  },
  data: null,
  PhieuDoiTras: {
    isLoading: false,
    data: [],
  },
  ThanhToanTichDiemModal: {
    isShow: false,
  },
  TaoPhieuTraHangModal: {
    isShow: false,
  },
  TaoPhieuBaoHanhModal: {
    isShow: false,
  },
  TaoPhieuHenModal: {
    isShow: false,
  },
  TaoPhieuBaoHanhModal: {
    isShow: false,
  },
  TaoPhieuHenModal: {
    isShow: false,
  },
  TongQuans: {
    isLoading: false,
    statistics: {
      hoaDonTodayCount: 0,
      doanhThuToday: 0,
      doiTraCount: 0,
      soLuongDT: 0,
      percent: 0,
    },
    rankingByDoanhThu: [],
    highestSanPhamList: [],
  },
  /* #region  BaoCao */

  CuoiNgays: {
    isLoading: false,
    data: null,
  },

  BCBanHangs: {
    isLoading: false,
    data: [],
  },

  BCHangHoas: {
    isLoading: false,
    data: [],
  },

  /* #endregion */

  PhieuNhaps: {
    isLoading: false,
    data: [],
  },

  TaoPhieuNhapModal: {
    isShow: false,
  },

  ThemPhieuNhapPage: {
    ID: "",
  },

  TaoPhieuNhapModal: {
    isShow: false,
  },

  PhieuBaoHanhBanHangModal: {
    isShow: false,
  },

  PhieuHenBanHangModal: {
    isShow: false,
  },

  ArrHangHoaNhap: {
    arr: null,
  },
};
