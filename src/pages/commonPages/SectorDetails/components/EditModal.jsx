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
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTriggerGetSectors } from "../../../../redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({ open, data, handleClose }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const { name } = e.target;
    await axios
      .put(`/bolim/edit/${id}/`, { name: name.value })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setTriggerGetSectors());
          handleClose()
          toast.success("Bo'lim tahrirlandi");
        }
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
            <label htmlFor="name">Nomi:</label>
            <input
              defaultValue={data?.name}
              required
              name="name"
              id="name"
              className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
            />
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
