import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProductsPage } from "./products/ProductsPage";
import { OrdersPage } from "./orders/OrdersPage";

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
      <Route path="/product-catalog/products" Component={ProductsPage} />
      <Route path="/product-catalog/orders" Component={OrdersPage} />
    </Routes>
  );
};

export default App;
