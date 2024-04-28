import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";

export default function AdminBanner() {
  return (
    <>
      <AppBar sx={{ display: "flex", mb: "20px" }} position="static">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10" }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ color: "white" }}>Novo Restaurante</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/">
                <Button sx={{ color: "white" }}>Pratos</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ color: "white" }}>Novo prato</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
