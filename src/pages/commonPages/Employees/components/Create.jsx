import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

const Create = ({ getData }) => {
  const [sectors, setSectors] = useState([]);
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios.get("/bolim/").then((res) => setSectors(res?.data));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { username, password } = e.target;
    const data = {
      username: username.value,
      password: password.value,
      sector: null,
      status: "xodim",
    };

    await axios
      .post(`/signup/`, data)
      .then((res) => {
        if (res.status === 201) {
          getData();
          e.target.reset();
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => setLoading(false));
  }

  const handleValidation = (e) => {
    const reg = new RegExp("^[a-zA-Z0-9_]+$");
    setIsUsernameValid(reg.test(e .target.value));
    setUsername(e.target.value);
  };

  return (
    <>
      <fieldset className="border border-black/30 bg-white shadow-lg rounded-md p-2 my-5">
        <legend className="text-2xl font-medium ml-2">Yangi xodim:</legend>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          className="grid sm:grid-cols-2 items-center gap-3"
        >
          <FormControl size="small" required sx={{mt:-1}}>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => handleValidation(e)}
              error={!isUsernameValid}
            />
          </FormControl>
          <FormControl size="small" required>
            <InputLabel htmlFor="password-label">Parol</InputLabel>
            <OutlinedInput
              id="password-label"
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    size="small"
                    edge="end"
                  >
                    {showPassword ? (
                      <span className="fa-regular fa-eye-slash" />
                    ) : (
                      <span className="fa-regular fa-eye" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Parol"
            />
          </FormControl>
          <div className="hidden sm:block"/>
          <Button
            disabled={!isUsernameValid}
            startIcon={
              <span hidden={!loading} className="fa-solid fa-spinner fa-spin" />
            }
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Yuborish
          </Button>
        </Box>
      </fieldset>
    </>
  );
};

export default Create;
