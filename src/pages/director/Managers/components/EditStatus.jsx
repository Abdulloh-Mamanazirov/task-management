import axios from "axios";
import { forwardRef, useState } from "react";
import {
  Box,
  Slide,
  Radio,
  Dialog,
  Button,
  RadioGroup,
  DialogTitle,
  DialogContent,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditTaskStatus = ({ data, hidden, getData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { status } = e.target;
    const editData = {
      status: status.value,
    };
    await axios
      .patch(`/status/change/${data?.user?.id}/`, editData)
      .then((res) => {
        if (res.status === 200) {
          setOpen(false);
          getData();
          toast.success("Menejer statusi o'zgartirildi");
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => setLoading(false));
  }

  return (
    <div hidden={hidden}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 whitespace-nowrap"
      >
        <span className="fa-solid fa-edit" />
        <p>Tahrirlash</p>
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        keepMounted
        aria-describedby="edit-status-modal"
      >
        <DialogTitle>{"Menejer statusini o'zgartirish"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <RadioGroup
              row
              defaultValue={data?.user?.status}
              name="status"
              aria-labelledby="edit-status-modal"
            >
              <FormControlLabel
                value="director"
                control={<Radio />}
                label="Direktor"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel
                value="manager"
                control={<Radio />}
                label="Menejer"
              />
              <FormControlLabel
                value="xodim"
                control={<Radio />}
                label="Xodim"
              />
            </RadioGroup>
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
                disabled={loading}
                startIcon={
                  <span
                    hidden={!loading}
                    className="fa-solid fa-spinner fa-spin"
                  />
                }
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Yuborish
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTaskStatus;
