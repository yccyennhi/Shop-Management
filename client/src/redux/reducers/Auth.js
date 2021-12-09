export default function AuthReducer(state, action) {
  const {
    type,
    payload: { isAuthenticated, TaiKhoan },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        TaiKhoan,
      };
    default:
      return state;
  }
}
