import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, forwardRef, useState } from "react";
import { toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDeadline({ data, getData }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`audio/delete/${data.id}/`);

      toast.success("Vazifa o'chirildi");
      getData();
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Fragment>
      <IconButton
        disabled={loading}
        onClick={handleDelete}
        variant="contained"
        className="text-xl text-white cursor-pointer"
        color="error"
      >
        <span className="fa-solid fa-trash" />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        keepMounted
        aria-describedby="edit-modal"
      >
        <DialogTitle>{"O'chirish"}</DialogTitle>
        <DialogContent>
          <p>Haqiqatan ham o'chirmoqchimisiz?</p>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setOpen(false)}
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Bekor qilish
            </Button>
            <Button
              disabled={loading}
              onClick={handleDelete}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              O'chirish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
