import React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const ProductsPage = React.lazy(() =>
  import("./products/ProductsPage").then((it) => ({ default: it.ProductsPage }))
);
const OrdersPage = React.lazy(() =>
  import("./orders/OrdersPage").then((it) => ({ default: it.OrdersPage }))
);
const Dashboard = React.lazy(() =>
  import("./dashboard/Dashboard").then((it) => ({ default: it.Dashboard }))
);

type AppProps = {
  subscribe(callback: (next: string) => void): () => void;
};

const App: React.FC<AppProps> = (props) => {
  const { subscribe } = props;

  const navigate = useNavigate();

  useEffect(() => {
    return subscribe((nextPath: string) => {
      navigate({ pathname: nextPath }, { replace: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="/product-catalog/products" Component={ProductsPage} />
      <Route path="/product-catalog/orders" Component={OrdersPage} />
    </Routes>
  );
};

export default App;
