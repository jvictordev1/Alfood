import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../http";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

interface IParams {
  search?: string;
  ordering?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [searchedRestaurant, setSearchedRestaurant] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  const [params, setParams] = useState<IParams>({});

  useEffect(() => {
    http
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((resposta) => {
        console.log(resposta.data);
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const proxPagina = () => {
    http
      .get<IPaginacao<IRestaurante>>(proximaPagina, {
        params: params,
      })
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
    http
      .get<IPaginacao<IRestaurante>>(paginaAnterior, {
        params: params,
      })
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
    const params: IParams = {
      search: searchedRestaurant,
      ordering: ordenacao,
    };
    http
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/",
        {
          params: params,
        }
      )
      .then((res) => {
        setRestaurantes(res.data.results);
        setProximaPagina(res.data.next);
        setPaginaAnterior(res.data.previous);
      })
      .catch((err) => {
        console.log(err);
      });
    setParams(params);
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
        <FormControl fullWidth>
          <InputLabel id="ordenacao">Ordenar por</InputLabel>
          <Select
            labelId="ordenacao-select"
            id="ordenacao"
            label="ordenacao"
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
          >
            <MenuItem value="">Padrão</MenuItem>
            <MenuItem value="nome">Nome</MenuItem>
            <MenuItem value="id">Id</MenuItem>
          </Select>
        </FormControl>
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
