import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ProductsPage from "./pages/ProductsPage";
import Template from "./components/Template";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Template key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Template>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/*" element={<AnimatedRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
