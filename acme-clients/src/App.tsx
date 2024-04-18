import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage/NotFoundPage";

const ClientsListPage = React.lazy(() =>
  import("./clients/ClientsListPage").then((it) => ({
    default: it.ClientsListPage,
  }))
);
const ClientPage = React.lazy(() =>
  import("./client/ClientPage").then((it) => ({ default: it.ClientPage }))
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
      <Route path="/clients/:clientId" Component={ClientPage} />
      <Route path="/clients" Component={ClientsListPage} />
      <Route path="/clients/*" Component={NotFoundPage} />
    </Routes>
  );
};

export default App;
