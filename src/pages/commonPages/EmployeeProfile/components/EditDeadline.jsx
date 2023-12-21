import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { deadline } = e.target;
    const editedData = {
      deadline: new Date(deadline.value)
        .toLocaleDateString("ru-Ru")
        .replaceAll(".", "-"),
    };
    await axios
      .patch(`/task/edit/${data?.id}/`, editedData)
      .then((res) => {
        if (res.status === 200) {
          getData();
          setOpen(false);
          toast.success("Vazifa tugash sanasi tahrirladi", { autoClose: 700 });
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => setLoading(false));
  }

  return (
    <Fragment>
      <span
        role={"button"}
        onClick={() => setOpen(true)}
        className="fa-solid fa-edit text-xl text-blue-500 cursor-pointer ml-2"
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
              <label htmlFor="deadline">
                Tugash sanasini tahrirlash:{" "}
                <span className="text-sm text-gray-600">
                  ('format: MM/DD/YYYY')
                </span>
              </label>
              <input
                defaultValue={data?.deadline}
                required
                type="date"
                name="deadline"
                id="deadline"
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
