import { Route, createRoutesFromElements } from "react-router-dom";

export const routes = createRoutesFromElements(
  <>
    <Route lazy={() => import("./dashboard/Dashboard")} path="/dashboard" />
    <Route
      lazy={() => import("./products/ProductsPage")}
      path="/product-catalog/products"
    />

    <Route
      lazy={() => import("./purchase/CreatePurchasePage")}
      path="/product-catalog/orders/purchase"
    />

    <Route
      lazy={() => import("./orders/OrdersPage")}
      path="/product-catalog/orders"
    />
  </>
);
