import { Route, Routes } from "react-router-dom";
import AdminPratosPage from "./componentes/AdminPratos/AdminPratosPage";
import NewPratoForm from "./componentes/AdminPratos/NewPratoForm";
import AdminBanner from "./componentes/AdminRestaurantes/AdminBanner";
import AdminRestaurantesPage from "./componentes/AdminRestaurantes/AdminRestaurantesPage";
import NewRestauranteForm from "./componentes/AdminRestaurantes/NewRestauranteForm";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="admin/" element={<AdminBanner />}>
        <Route path="restaurantes" element={<AdminRestaurantesPage />} />
        <Route path="restaurantes/novo" element={<NewRestauranteForm />} />
        <Route path="restaurantes/:id" element={<NewRestauranteForm />} />
        <Route path="pratos" element={<AdminPratosPage />} />
        <Route path="pratos/novo" element={<NewPratoForm />} />
        <Route path="pratos/:id" element={<NewPratoForm />} />
      </Route>
    </Routes>
  );
}

export default App;
