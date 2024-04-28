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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export default function AdminPratosPage() {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  const onPratoDeleted = (prato: IPrato) => {
    http
      .delete(`pratos/${prato.id}/`)
      .then(() => {
        setPratos(pratos.filter((p) => p.id !== prato.id));
        alert("Prato deletado com sucesso!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    http
      .get<IPrato[]>("pratos/")
      .then((res) => {
        setPratos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map((p) => {
              return (
                <TableRow key={p.id}>
                  <TableCell>{p.nome}</TableCell>
                  <TableCell>{p.tag}</TableCell>
                  <TableCell>
                    <a href={p.imagem} target="blank" rel="noreferrer">
                      Ver imagem
                    </a>
                  </TableCell>
                  <TableCell>
                    <Link to={`${p.id}`}>Editar</Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => onPratoDeleted(p)}
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
