import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function NewRestauranteForm() {
  const [restaurantNameField, setRestaurantNameField] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${params.id}/`
        )
        .then((res) => {
          setRestaurantNameField(res.data.nome);
        });
    }
  }, [params]);
  const onRestaurantSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (restaurantNameField === "") {
      alert("Nome do restaurante não pode ser vazio!");
      return;
    } else {
      if (params.id) {
        axios
          .put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
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
        axios
          .post("http://localhost:8000/api/v2/restaurantes/", {
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
    }
  };
  return (
    <div>
      {params.id != null ? (
        <h1>Editar Restaurante</h1>
      ) : (
        <h1>Novo Restaurante</h1>
      )}
      <form onSubmit={onRestaurantSubmit}>
        <TextField
          value={restaurantNameField}
          onChange={(e) => setRestaurantNameField(e.target.value)}
          id="restaurant-name"
          label="Nome do Restaurante"
          variant="outlined"
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
      </form>
    </div>
  );
}
