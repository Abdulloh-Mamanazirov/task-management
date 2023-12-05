import * as React from "react";
import axios from "axios";
import {
  Box,
  Slide,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({ open, data, handleClose }) {
  const [sectors, setSectors] = React.useState([]);

  React.useEffect(() => {
    axios.get("/bolim/").then((res) => setSectors(res?.data));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password, sector } = e.target;
    const data = {
      username: username.value,
      password: password?.value,
      sector: sector.value,
    };
    if (!sector.value) delete data.sector;
    if (!password.value) delete data.password;
    console.log(data);
    return alert("no API");
    await axios
      .put(`/signup/edit/${data?.id}/`, data)
      .then((res) => {
        if (res.status === 200) handleClose();
      })
      .catch((err) => toast.error("Nimadadir xatolik ketdi!"));
  }

  return (
    <React.Fragment>
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
            <div>
              <label htmlFor="sector">Bo'lim:</label>
              <select
                defaultValue={data?.sector}
                required
                name="sector"
                id="sector"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              >
                {sectors?.map?.((option, ind) => (
                  <option key={ind} value={option?.id}>
                    {option?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-5">
              <label htmlFor="username">Username:</label>
              <input
                defaultValue={data?.username}
                required
                name="username"
                id="username"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="password">Yangi parol:</label>
              <input
                name="password"
                id="password"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="reset"
                onClick={handleClose}
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
