import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";

const Create = ({ getData }) => {
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
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <fieldset className="border border-black/30 bg-white shadow-lg rounded-md p-2 my-5">
        <legend className="text-3xl font-medium ml-2">Yangi Bo'lim:</legend>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          className="grid grid-cols-4 items-center gap-3"
        >
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
          <Button
            disabled={loading}
            startIcon={
              <span hidden={!loading} className="fa-solid fa-spinner fa-spin" />
            }
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Yuborish
          </Button>
        </Box>
      </fieldset>
    </>
  );
};

export default Create;
