import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ProductsPage from "./pages/ProductsPage";
import Template from "./components/Template";
import ScenePage from "./pages/ScenePage";
import ShotsPage from "./pages/ShotsPage";
import VersionPage from "./pages/VersionPage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Template key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/project/:projectId" element={<ScenePage />} />
        <Route path="/scene/:sceneId" element={<ShotsPage />} />
        <Route path="/shot/:shotId" element={<VersionPage />} />
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
