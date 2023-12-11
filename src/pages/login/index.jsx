import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  async function handleLogIn(e) {
    e.preventDefault();
    setLoading(true);
    const { username, password } = e.target;
    await axios
      .post("/login/", {
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        sessionStorage.setItem("token", res?.data?.access);
        sessionStorage.setItem("status", jwtDecode(res?.data?.access).status);
        sessionStorage.setItem("user_id", jwtDecode(res?.data?.access).user_id);
        sessionStorage.setItem("sector_id", jwtDecode(res?.data?.access).bolim);
        window.location.replace("/");
      })
      .catch((err) => {
        if (err.response.status === 401)
          toast.error("Username yoki parol xato!");
        else toast.error("Nimadadir xatolik ketdi!");
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <span className="fa-solid fa-lock" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hisobga kirish
          </Typography>
          <Box component="form" onSubmit={handleLogIn} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parol"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disabled={loading}
              startIcon={
                <span
                  hidden={!loading}
                  className="fa-solid fa-spinner fa-spin"
                />
              }
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Kirish
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
