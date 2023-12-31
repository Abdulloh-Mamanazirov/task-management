import {
  Box,
  Slide,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, forwardRef, useState } from "react";
import { toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({ data, getData }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const { text } = e.target;
    const editedData = {
      text: text.value,
    };
    if (data?.text?.[0]?.id) {
      setLoading(true);
      await axios
        .patch(`/text/edit/${data?.text?.[0]?.id}/`, editedData)
        .then((res) => {
          if (res.status === 200) {
            getData();
            setOpen(false);
            toast.success("Vazifa matni tahrirladi");
          }
        })
        .catch(() => toast.error("Nimadadir xatolik ketdi!"))
        .finally(() => setLoading(false));
    }
  }

  return (
    <Fragment>
      <span
        role={"button"}
        onClick={() => setOpen(true)}
        className="fa-solid fa-edit text-xl text-blue-500 cursor-pointer"
      />
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
              <label htmlFor="text">Xabarni Tahrirlash:</label>
              <input
                defaultValue={data?.text?.[0]?.text
                  .replaceAll("[", "")
                  .replaceAll("]", "")}
                required
                name="text"
                id="text"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              />
            </div>

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
                Yuborish
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
