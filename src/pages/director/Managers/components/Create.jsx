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
  Dialog,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSectors as setReduxSectors } from "../../../../redux";

const Create = ({ getData }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      sector: sector.value,
      status: "manager",
    };

    await axios
      .post(`/signup/`, data)
      .then((res) => {
        if (res.status === 201) {
          getData();
          setModal(false);
          toast.success("Menejer yaratildi");
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
      <button
        onClick={() => setModal(true)}
        className="bg-secondary px-8 py-3 text-white border rounded-lg"
      >
        Yangi menejer
      </button>

      {/* audio modal */}
      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        fullWidth
        keepMounted
        aria-describedby="edit-audioModal"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          className="grid grid-cols-1 items-center gap-3 p-3"
        >
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
          {/* menga kerak  */}
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
              <span hidden={!loading} className="fa-solid fa-spinner fa-spin" />
            }
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Yuborish
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default Create;
