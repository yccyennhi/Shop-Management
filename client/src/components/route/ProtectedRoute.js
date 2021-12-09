import { Spin } from "antd";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div style={{ margin: "0 auto" , padding: "50px 0px 0px 0px"}}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...rest} /> : <Redirect to="/Auth" />
      }
    />
  );
}
