import { Route, Routes } from "react-router-dom";
import AdminRestaurantesPage from "./componentes/AdminRestaurantes/AdminRestaurantesPage";
import NewRestauranteForm from "./componentes/AdminRestaurantes/NewRestauranteForm";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminRestaurantesPage />} />
      <Route path="/admin/restaurantes/novo" element={<NewRestauranteForm />} />
      <Route path="/admin/restaurantes/:id" element={<NewRestauranteForm />} />
    </Routes>
  );
}

export default App;
