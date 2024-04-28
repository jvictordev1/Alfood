import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function NewRestauranteForm() {
  const [restaurantNameField, setRestaurantNameField] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      http.get<IRestaurante>(`restaurantes/${params.id}/`).then((res) => {
        setRestaurantNameField(res.data.nome);
      });
    }
  }, [params]);
  const onRestaurantSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params.id) {
      http
        .put(`restaurantes/${params.id}/`, {
          nome: restaurantNameField,
        })
        .then(() => {
          alert("Restaurante editado com sucesso!");
          window.location.href = "/admin/restaurantes";
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      http
        .post("restaurantes/", {
          nome: restaurantNameField,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso!");
          window.location.href = "/admin/restaurantes";
        })
        .catch((err) => {
          alert("Restaurante não cadastrado.");
          console.log(err);
        });
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "30px",
          }}
          component="form"
          onSubmit={onRestaurantSubmit}
        >
          <Box sx={{ textAlign: "center" }}>
            {params.id != null ? (
              <Typography variant="h5" component="h1">
                Editar Restaurante
              </Typography>
            ) : (
              <Typography variant="h5" component="h1">
                Novo Restaurante
              </Typography>
            )}
          </Box>
          <TextField
            value={restaurantNameField}
            onChange={(e) => setRestaurantNameField(e.target.value)}
            id="restaurant-name"
            label="Nome do Restaurante"
            variant="outlined"
            required
          />
          {params.id != null ? (
            <Button type="submit" variant="contained">
              Editar{" "}
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Cadastrar
            </Button>
          )}
        </Paper>
      </Box>
    </>
  );
}
