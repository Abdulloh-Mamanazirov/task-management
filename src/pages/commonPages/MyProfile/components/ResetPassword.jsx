import * as React from "react";
import axios from "axios";
import {
  Box,
  Slide,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal() {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { oldp, newp } = e.target;
    const data = {
      old_password: oldp.value,
      new_password: newp.value,
    };
    if (!data.old_password || !data.new_password) return;

    await axios
      .post(`/password/change/`, data)
      .then((res) => {
        if (res.data.xabar === "parol yangilandi") {
          toast.success("Parol o'zgardi");
          setOpen(false);
          e.target.reset();
        }
      })
      .catch((err) => toast.error("Nimadadir xatolik ketdi!"));
  }

  return (
    <React.Fragment>
      <Button
        color="inherit"
        variant="outlined"
        endIcon={<span className="fa-solid fa-lock" />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Parol
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        keepMounted
        aria-describedby="edit-modal"
      >
        <DialogTitle>{"Tahrirlash"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <FormControl required fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="oldp">Eski parol</InputLabel>
              <OutlinedInput
                id="oldp"
                name="oldp"
                fullWidth
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <span className="fa-solid fa-eye-slash text-lg" />
                      ) : (
                        <span className="fa-solid fa-eye text-lg" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Eski parol"
              />
            </FormControl>
            <FormControl required fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="newp">Yangi parol</InputLabel>
              <OutlinedInput
                id="newp"
                name="newp"
                fullWidth
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <span className="fa-solid fa-eye-slash text-lg" />
                      ) : (
                        <span className="fa-solid fa-eye text-lg" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Yangi parol"
              />
            </FormControl>

            <div className="flex items-center gap-3">
              <Button
                type="reset"
                onClick={() => setOpen(false)}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Yuborish
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
