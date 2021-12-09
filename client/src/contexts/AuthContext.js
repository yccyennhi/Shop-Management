import { createContext, useEffect, useReducer } from "react";
import * as api from "../api";
import { messageSuccess } from "../components/message";
import AuthReducer from "../redux/reducers/Auth";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    TaiKhoan: null,
  });

  //Authicate
  const loadTaiKhoan = async () => {
    if (localStorage["Auth_Token"]) {
      console.log(`${localStorage["Auth_Token"]}`);
      api.setAuthToken(localStorage["Auth_Token"]);
    }

    try {
      const response = await api.verifyAuthToken();
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, TaiKhoan: response.data.TaiKhoan },
        });
      }
    } catch (error) {
      localStorage.removeItem("Auth_Token");
      api.setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, TaiKhoan: null },
      });
    }
  };

  //login
  const loginTaiKhoan = async (userForm) => {
    try {
      const response = await api.loginTaiKhoan(userForm);
      if (response.data.success) {
        localStorage.setItem("Auth_Token", response.data.accessToken);
      }

      loadTaiKhoan();
      messageSuccess("Đăng nhập thành công");

      return response.data;
    } catch (error) {
      if (error.data) {
        return error.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  const logoutTaiKhoan = () => {
    localStorage.removeItem("Auth_Token");
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, TaiKhoan: null },
    });
  };

  //context data
  const authContextData = { loginTaiKhoan, logoutTaiKhoan, authState };

  useEffect(() => loadTaiKhoan(), []);

  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
