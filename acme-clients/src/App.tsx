import { Route, createRoutesFromElements } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage/NotFoundPage";

export const routes = createRoutesFromElements(
  <>
    <Route lazy={() => import("./dashboard/Dashboard")} path="/dashboard" />
    <Route lazy={() => import("./clients/ClientsListPage")} path="/clients" />
    <Route
      lazy={() => import("./client/ClientPage")}
      path="/clients/:clientId"
    />
    <Route path="*" Component={NotFoundPage} />
  </>
);
