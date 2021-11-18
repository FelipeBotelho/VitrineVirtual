import React from "react";
import { Switch, Route, RouteProps } from "react-router-dom";

import ConstantRoutes from "./routes_array";
import Admin from "../pages/Admin";
import ErrorPage from "../pages/Error";
import { useAuth } from "../contexts/auth";
import Favoritos from "../pages/Favoritos";
import Historico from "../pages/Historico";
import Comprar from "../pages/Comprar";

export default function Routes(): React.ReactElement {
  const { signed, user } = useAuth();
  function HandleRoutes(props: RouteProps): React.ReactElement {
    return <Route {...props} />;
  }

  return (
    <Switch>
      {ConstantRoutes.map((route) => (
        <HandleRoutes {...route} key={route.path} />
      ))}
      {signed && user.roles.find((x: any) => x == "Admin") != null ? <Route path="/admin" component={Admin} /> : null}
      {signed ? <Route path="/favoritos" component={Favoritos} /> : null}
      {signed ? <Route path="/historico" component={Historico} /> : null}
      {signed ? <Route path="/comprar" component={Comprar} /> : null}
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
  );
}
