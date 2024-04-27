import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function AdminRestaurantesPage() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const onRestaurantDeleted = (restaurant: IRestaurante) => {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${restaurant.id}/`)
      .then(() => {
        setRestaurantes(restaurantes.filter((r) => r.id !== restaurant.id));
        alert("Restaurante deletado com sucesso!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
      .then((res) => {
        setRestaurantes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <h1>Administração de restaurantes</h1>
      </div>
      <Link to="/admin/restaurantes/novo">
        Clique para adicionar um novo restaurante
      </Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map((r) => {
              return (
                <TableRow key={r.id}>
                  <TableCell>{r.nome}</TableCell>
                  <TableCell>
                    <Link to={`${r.id}`}>Editar</Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => onRestaurantDeleted(r)}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
