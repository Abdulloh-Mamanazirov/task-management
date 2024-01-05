import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const CreateModal = ({ getData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { name } = e.target;
    await axios
      .post(`/bolim/`, { name: name.value })
      .then((res) => {
        if (res.status === 201) {
          getData();
          toast.success("Bo'lim yaratildi");
          e.target.reset();
          setIsOpen(false);
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Button
        size="small"
        startIcon={<span className="fa-solid fa-plus" />}
        variant="outlined"
        fullWidth
        onClick={() => setIsOpen(true)}
      >
        Bo'lim qo'shish
      </Button>
      <Dialog open={isOpen} keepMounted fullWidth>
        <DialogTitle>Bo'lim qo'shish</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="name"
              label="Nomi"
              name="name"
              className="col-span-3"
            />
            <div className="flex items-center gap-3">
              <Button
                type="reset"
                onClick={() => setIsOpen(false)}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Bekor qilish
              </Button>
              <Button
                disabled={loading}
                fullWidth
                startIcon={
                  <span
                    hidden={!loading}
                    className="fa-solid fa-spinner fa-spin"
                  />
                }
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Yuborish
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateModal;
