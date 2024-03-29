import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSectors as setReduxSectors } from "../../../../redux";

const Create = ({ getData }) => {
  const dispatch = useDispatch();
  const [sectors, setSectors] = useState([]);
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const status = sessionStorage.getItem("status");

  useEffect(() => {
    axios.get("/bolim/").then((res) => {
      dispatch(setReduxSectors(res?.data));
      setSectors(res?.data);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { username, password, sector } = e.target;
    const data = {
      username: username.value,
      password: password.value,
      sector: +sector.value,
      status: "xodim",
    };

    await axios
      .post(`/signup/`, data)
      .then((res) => {
        if (res.status === 201) {
          getData();
          toast.success("Xodim yaratildi");
          e.target.reset();
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          toast.error("Bu username mavjud!");
        } else {
          toast.error("Nimadadir xatolik ketdi!");
        }
      })
      .finally(() => setLoading(false));
  }

  const handleValidation = (e) => {
    const reg = new RegExp("^[a-zA-Z0-9_]+$");
    setIsUsernameValid(reg.test(e.target.value));
    setUsername(e.target.value);
  };

  return (
    <>
      <details hidden={status == "manager"}>
        <summary className="text-2xl font-medium ml-2 py-3">
          Yangi xodim:
        </summary>
        <fieldset className="border border-black/30 bg-white shadow-lg rounded-md p-2 my-5">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            className="grid sm:grid-cols-2 items-center gap-3"
          >
            <FormControl size="small" required sx={{ mt: -1 }}>
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
            <FormControl size="small" required>
              <InputLabel htmlFor="sector-label">Bo'lim</InputLabel>
              <Select
                labelId="sector-label"
                size="small"
                id="sector"
                label="Bo'lim"
                name="sector"
              >
                {sectors?.map?.((option, ind) => (
                  <MenuItem key={ind} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              disabled={!isUsernameValid}
              startIcon={
                <span
                  hidden={!loading}
                  className="fa-solid fa-spinner fa-spin"
                />
              }
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Yuborish
            </Button>
          </Box>
        </fieldset>
      </details>
    </>
  );
};

export default Create;
