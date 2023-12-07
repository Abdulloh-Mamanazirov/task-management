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
  async function handleSubmit(e) {
    e.preventDefault();
    const {
      username,
      first_name,
      brith_date,
      last_name,
      phone_number,
      main_task,
      shior,
    } = e.target;
    const editedData = {
      username: username.value,
      first_name: first_name.value,
      last_name: last_name.value,
      brith_date: brith_date.value,
      phone_number: phone_number.value,
      main_task: main_task.value,
      shior: shior.value,
    };

    await axios
      .put(`/user/edit/${data?.id}/`, editedData)
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
              <label htmlFor="username">Username:</label>
              <input
                defaultValue={data?.username}
                required
                name="username"
                id="username"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              />
            </div>
            <div>
              <label htmlFor="first_name">Ism:</label>
              <input
                defaultValue={data?.first_name}
                required
                name="first_name"
                id="first_name"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              />
            </div>
            <div>
              <label htmlFor="last_name">Familiya:</label>
              <input
                defaultValue={data?.last_name}
                required
                name="last_name"
                id="last_name"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="brith_date">Tug'ilgan sana:</label>
              <input
                defaultValue={data?.brith_date}
                type="date"
                name="brith_date"
                id="brith_date"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="phone_number">Telefon raqam:</label>
              <input
                defaultValue={data?.phone_number}
                name="phone_number"
                id="phone_number"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="main_task">Asosiy vazifa:</label>
              <input
                defaultValue={data?.main_task}
                type="text"
                name="main_task"
                id="main_task"
                className="border border-blue-500 w-full rounded-md p-2 focus:outline-2 focus:outline-blue-700"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="shior">Shior:</label>
              <input
                defaultValue={data?.shior}
                type="text"
                name="shior"
                id="shior"
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
