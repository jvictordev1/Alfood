import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";

interface ITags {
  value: string;
  id: number;
}

export default function NewPratoForm() {
  const [pratoNameField, setPratoNameField] = useState("");
  const [pratoDescription, setPratoDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState<ITags[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | Blob>(
    ""
  );
  const [pratoImagem, setPratoImagem] = useState<File | null>(null);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      http.get<IPrato>(`pratos/${params.id}/`).then((res) => {
        setPratoNameField(res.data.nome);
        setPratoDescription(res.data.descricao);
        setSelectedTag(res.data.tag);
        setSelectedRestaurant(res.data.restaurante.toString());
      });
    }
  }, [params]);
  useEffect(() => {
    http
      .get<{ tags: ITags[] }>("/tags/")
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.log(err);
      });
    http
      .get<IRestaurante[]>(`restaurantes/`)
      .then((res) => {
        setRestaurantes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onPratoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", pratoNameField);
    formData.append("tag", selectedTag);
    if (pratoImagem) {
      formData.append("imagem", pratoImagem);
    }
    formData.append("descricao", pratoDescription);
    formData.append("restaurante", selectedRestaurant);

    http
      .request({
        url: "pratos/",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Prato cadastrado com sucesso!");
        window.location.href = "/admin/pratos";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setPratoImagem(e.target.files[0]);
    } else {
      setPratoImagem(null);
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
          onSubmit={onPratoSubmit}
        >
          <Box sx={{ textAlign: "center" }}>
            {params.id != null ? (
              <Typography variant="h5" component="h1">
                Editar Prato
              </Typography>
            ) : (
              <Typography variant="h5" component="h1">
                Novo Prato
              </Typography>
            )}
          </Box>
          <TextField
            value={pratoNameField}
            onChange={(e) => setPratoNameField(e.target.value)}
            id="prato-name"
            label="Nome do Prato"
            variant="outlined"
            required
          />
          <TextField
            value={pratoDescription}
            onChange={(e) => setPratoDescription(e.target.value)}
            id="prato-description"
            multiline
            label="Descrição do Prato"
            variant="outlined"
            required
          />
          <FormControl fullWidth>
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select
              labelId="select-tag"
              id="tags"
              label="tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              required
            >
              {tags.map((tag) => (
                <MenuItem value={tag.value} key={tag.id}>
                  {tag.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="select-restaurante">Restaurante</InputLabel>
            <Select
              labelId="select-restaurante"
              id="restaurante"
              label="restaurante"
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              required
            >
              {restaurantes.map((r) => (
                <MenuItem value={r.id} key={r.id}>
                  {r.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <label htmlFor="image">Imagem</label>
          <input id="image" type="file" onChange={onImageChange} />
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
