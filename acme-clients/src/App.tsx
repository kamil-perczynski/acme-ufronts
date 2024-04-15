import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ClientsListPage as ClientsListPage } from "./clients/ClientsListPage";
import { NotFoundPage } from "./NotFoundPage/NotFoundPage";

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
      <Route path="/clients" Component={ClientsListPage} />
      <Route path="/clients/*" Component={NotFoundPage} />
    </Routes>
  );
};

export default App;
