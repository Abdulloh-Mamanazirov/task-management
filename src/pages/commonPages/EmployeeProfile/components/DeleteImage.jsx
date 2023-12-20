import {
  Button,
  Dialog,
  DialogContent,
  Slide
} from "@mui/material";
import axios from "axios";
import React, { Fragment, forwardRef, useState } from "react";
import { toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteImage({ data, getData }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `photo/delete/${
          `https://xodim.pythonanywhere.com/` + item?.photo?.[0]?.photo
        }/`
      );
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
      <Button
        disabled={loading}
        onClick={handleDelete}
        fullWidth
        variant="contained"
        className="fa-solid fa-trash text-xl text-white cursor-pointer"
        color="error"
        sx={{ mt: 3, mb: 2 }}
      >
        O'chirish
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        keepMounted
        aria-describedby="edit-modal"
      >
        <DialogContent>
          <p className="text-red-500 text-center text-2xl font-semibold">
            Haqiqatan ham o'chirmoqchimisiz?
          </p>
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
              color="error"
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
