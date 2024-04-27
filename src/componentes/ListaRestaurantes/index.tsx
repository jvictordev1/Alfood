import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [searchedRestaurant, setSearchedRestaurant] = useState("");

  useEffect(() => {
    if (searchedRestaurant) {
      return;
    } else {
      axios
        .get<IPaginacao<IRestaurante>>(
          "http://localhost:8000/api/v1/restaurantes/"
        )
        .then((resposta) => {
          setRestaurantes(resposta.data.results);
          setProximaPagina(resposta.data.next);
          setPaginaAnterior(resposta.data.previous);
        })
        .catch((erro) => {
          console.log(erro);
        });
    }
  }, [searchedRestaurant]);

  const proxPagina = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  const pagAnterior = () => {
    axios
      .get<IPaginacao<IRestaurante>>(paginaAnterior)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  const onRestaurantSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/",
        {
          params: {
            search: searchedRestaurant,
          },
        }
      )
      .then((res) => {
        setRestaurantes(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
        component="form"
        onSubmit={onRestaurantSearch}
      >
        <TextField
          id="restaurant-search"
          label="Busque um restaurante"
          variant="outlined"
          value={searchedRestaurant}
          onChange={(e) => setSearchedRestaurant(e.target.value)}
          fullWidth
        />
        <Button fullWidth type="submit" variant="outlined" color="success">
          Buscar
        </Button>
      </Box>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <Box component="div" sx={{ marginTop: "10px" }}>
        {proximaPagina && (
          <Button variant="outlined" onClick={proxPagina}>
            Próxima página
          </Button>
        )}
        {paginaAnterior && (
          <Button variant="outlined" onClick={pagAnterior}>
            Página anterior
          </Button>
        )}
      </Box>
    </section>
  );
};

export default ListaRestaurantes;
